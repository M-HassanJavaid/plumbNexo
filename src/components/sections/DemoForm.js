"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "../Eyebrow";
import Button from "../Button";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site.config";

export default function DemoForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    serviceArea: "",
    currentWebsite: "",
    workType: "Residential", // Residential | Commercial | Both
    contactName: "",
    contactMethod: "Phone", // Phone | Email | Text
    contactValue: "",
    notes: "",
    // Bot prevention
    company_website: "", // Honeypot
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const mountTimeRef = useRef(null);
  const formStartedRef = useRef(false);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleFieldFocus = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent("form_start");
    }
  };

  const validateField = (name, value) => {
    if (name === "businessName") {
      if (!value.trim()) return "Business name is required";
    }
    if (name === "serviceArea") {
      if (!value.trim()) return "Service area is required";
    }
    if (name === "currentWebsite") {
      if (value.trim()) {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
        if (!urlPattern.test(value.trim())) {
          return "Please enter a valid website address (e.g. domain.com)";
        }
      }
    }
    if (name === "contactName") {
      if (!value.trim()) return "Your name is required";
    }
    if (name === "contactValue") {
      if (!value.trim()) {
        return formData.contactMethod === "Email"
          ? "Email address is required"
          : "Phone number is required";
      }
      if (formData.contactMethod === "Email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim())) {
          return "Please enter a valid email address";
        }
      } else {
        const phonePattern = /^[\d\s()+-]{7,}$/;
        if (!phonePattern.test(value.trim())) {
          return "Please enter a valid phone number";
        }
      }
    }
    return "";
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const newErrors = {
      businessName: validateField("businessName", formData.businessName),
      serviceArea: validateField("serviceArea", formData.serviceArea),
      currentWebsite: validateField("currentWebsite", formData.currentWebsite),
    };

    setErrors(newErrors);
    setTouched({
      businessName: true,
      serviceArea: true,
      currentWebsite: true,
    });

    const hasError = Object.values(newErrors).some((msg) => !!msg);
    if (hasError) {
      // Focus first invalid field
      const firstInvalid = document.querySelector("#demo-step-1 [aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    trackEvent("form_step_2", { work_type: formData.workType });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const newErrors = {
      contactName: validateField("contactName", formData.contactName),
      contactValue: validateField("contactValue", formData.contactValue),
    };

    setErrors(newErrors);
    setTouched((prev) => ({ ...prev, contactName: true, contactValue: true }));

    const hasError = Object.values(newErrors).some((msg) => !!msg);
    if (hasError) {
      const firstInvalid = document.querySelector("#demo-step-2 [aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 3-second minimum time-to-submit check for spam
    const startTime = mountTimeRef.current || Date.now();
    const timeTakenSeconds = (Date.now() - startTime) / 1000;
    if (timeTakenSeconds < 3) {
      // Fake delay and silent drop for spam bots
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
      return;
    }

    // Honeypot check
    if (formData.company_website) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timeToSubmit: timeTakenSeconds,
        }),
      });

      if (!res.ok) {
        throw new Error("Server rejected request");
      }

      trackEvent("generate_lead", {
        work_type: formData.workType,
        contact_method: formData.contactMethod,
      });

      setIsSuccess(true);
    } catch (err) {
      trackEvent("form_error");
      setSubmitError(
        `Something went wrong sending your request. Please try again, or email ${siteConfig.demoInboxEmail}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = formData.contactName.trim().split(" ")[0] || "there";

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative bg-[#122B2A] text-white py-[72px] lg:py-[120px] overflow-hidden"
    >
      {/* Outlined "N" Motif background (4-6% opacity) per README 2.3 & 4.9 */}
      <div
        className="n-motif-bg left-[-100px] bottom-[-50px] w-[600px] h-[700px] text-white select-none opacity-[0.04]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 480" fill="none" stroke="currentColor" strokeWidth="16" className="w-full h-full">
          <path d="M50 430V50H110L290 430H350V50" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Copy Column (40% desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Eyebrow onDark className="mb-4">
              FREE DEMO PAGE
            </Eyebrow>

            <h2 id="demo-heading" className="h2-headline text-white mb-5">
              See your new website before you commit.
            </h2>

            <p className="text-[17px] sm:text-[18px] text-white/80 leading-relaxed mb-8">
              Tell me about your business. I&apos;ll reply within 1 business day to confirm the details, then build your demo page.
            </p>

            <div className="space-y-3.5 text-[15px] sm:text-[16px] text-white">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#B8F36B] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#122B2A]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>No payment for the demo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#B8F36B] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#122B2A]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>No obligation to continue</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#B8F36B] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#122B2A]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Written scope &amp; price if you do</span>
              </div>
            </div>
          </div>

          {/* Right Form Card (60% desktop, white, radius 20px, shadow) */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#122B2A] rounded-[20px] p-6 sm:p-10 shadow-soft">
              {/* Screen reader live announcement */}
              <div className="sr-only" aria-live="polite">
                {isSuccess
                  ? "Your request has been submitted successfully."
                  : `Currently on Step ${step} of 2`}
              </div>

              {/* SUCCESS STATE */}
              {isSuccess ? (
                <div className="text-center py-8 px-4 animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-[#B8F36B]/30 text-[#122B2A] flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <svg className="w-8 h-8 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] font-extrabold text-[#122B2A] mb-3">
                    Thanks, {firstName}! Your request is in.
                  </h3>

                  <p className="text-[16px] text-[#52635F] max-w-[480px] mx-auto mb-8 leading-relaxed">
                    I&apos;ll reply within 1 business day to confirm a few details. Meanwhile, you can watch the case studies again.
                  </p>

                  <a
                    href="#work"
                    className="inline-flex items-center text-[15px] font-bold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/30 hover:decoration-[#B8F36B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
                  >
                    <span>← Watch the case studies</span>
                  </a>
                </div>
              ) : (
                /* FORM FLOW */
                <div>
                  {/* Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-[13px] font-bold text-[#52635F] mb-2 uppercase tracking-wider">
                      <span>Step {step} of 2</span>
                      <span>{step === 1 ? "About your business" : "How to reach you"}</span>
                    </div>
                    {/* 2-segment progress bar with mint fill */}
                    <div className="grid grid-cols-2 gap-2 h-1.5 w-full">
                      <div className="h-full rounded-full bg-[#B8F36B]" />
                      <div
                        className={`h-full rounded-full transition-colors duration-200 ${
                          step === 2 ? "bg-[#B8F36B]" : "bg-[#122B2A]/10"
                        }`}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mb-6 p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-800 text-[14px] flex items-center gap-2.5">
                      <svg className="w-5 h-5 shrink-0 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* STEP 1: ABOUT YOUR BUSINESS */}
                  {step === 1 && (
                    <form id="demo-step-1" onSubmit={handleContinue} noValidate className="space-y-5">
                      {/* Honeypot field (hidden from real users) */}
                      <input
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.company_website}
                        onChange={(e) => handleChange("company_website", e.target.value)}
                        style={{ display: "none" }}
                        aria-hidden="true"
                      />

                      {/* Business Name */}
                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          Business name <span className="text-[#122B2A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          autoComplete="organization"
                          required
                          value={formData.businessName}
                          onChange={(e) => handleChange("businessName", e.target.value)}
                          onFocus={handleFieldFocus}
                          onBlur={() => handleBlur("businessName")}
                          aria-invalid={!!errors.businessName}
                          aria-describedby={errors.businessName ? "err-businessName" : undefined}
                          className={`w-full h-[50px] px-4 rounded-[12px] border text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] ${
                            errors.businessName ? "border-red-500 bg-red-50/20" : "border-[#122B2A]/15 bg-white"
                          }`}
                        />
                        {errors.businessName && (
                          <p id="err-businessName" className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1">
                            <span aria-hidden="true">⚠</span> {errors.businessName}
                          </p>
                        )}
                      </div>

                      {/* Main Service Area */}
                      <div>
                        <label
                          htmlFor="serviceArea"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          Main service area <span className="text-[#122B2A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="serviceArea"
                          name="serviceArea"
                          required
                          placeholder="e.g. Charlotte, Concord, Matthews"
                          value={formData.serviceArea}
                          onChange={(e) => handleChange("serviceArea", e.target.value)}
                          onFocus={handleFieldFocus}
                          onBlur={() => handleBlur("serviceArea")}
                          aria-invalid={!!errors.serviceArea}
                          aria-describedby={errors.serviceArea ? "err-serviceArea" : undefined}
                          className={`w-full h-[50px] px-4 rounded-[12px] border text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] ${
                            errors.serviceArea ? "border-red-500 bg-red-50/20" : "border-[#122B2A]/15 bg-white"
                          }`}
                        />
                        {errors.serviceArea && (
                          <p id="err-serviceArea" className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1">
                            <span aria-hidden="true">⚠</span> {errors.serviceArea}
                          </p>
                        )}
                      </div>

                      {/* Current Website */}
                      <div>
                        <label
                          htmlFor="currentWebsite"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          Current website <span className="text-[#52635F] font-normal">(optional)</span>
                        </label>
                        <input
                          type="url"
                          id="currentWebsite"
                          name="currentWebsite"
                          placeholder="Leave blank if you don't have one"
                          value={formData.currentWebsite}
                          onChange={(e) => handleChange("currentWebsite", e.target.value)}
                          onFocus={handleFieldFocus}
                          onBlur={() => handleBlur("currentWebsite")}
                          aria-invalid={!!errors.currentWebsite}
                          aria-describedby={errors.currentWebsite ? "err-currentWebsite" : undefined}
                          className={`w-full h-[50px] px-4 rounded-[12px] border text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] ${
                            errors.currentWebsite ? "border-red-500 bg-red-50/20" : "border-[#122B2A]/15 bg-white"
                          }`}
                        />
                        {errors.currentWebsite && (
                          <p id="err-currentWebsite" className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1">
                            <span aria-hidden="true">⚠</span> {errors.currentWebsite}
                          </p>
                        )}
                      </div>

                      {/* Type of Work (Segmented buttons) */}
                      <div>
                        <span className="block text-[14px] font-bold text-[#122B2A] mb-2">
                          Type of work <span className="text-[#122B2A]">*</span>
                        </span>
                        <div
                          role="radiogroup"
                          aria-label="Type of work"
                          className="grid grid-cols-3 gap-2 p-1 bg-[#F7F8F2] rounded-[12px] border border-[#122B2A]/10"
                        >
                          {["Residential", "Commercial", "Both"].map((type) => {
                            const isSelected = formData.workType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => handleChange("workType", type)}
                                className={`py-2.5 rounded-[9px] text-[14px] sm:text-[15px] font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F36B] ${
                                  isSelected
                                    ? "bg-white text-[#122B2A] shadow-sm"
                                    : "text-[#52635F] hover:text-[#122B2A]"
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Continue Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full h-[54px] rounded-full bg-[#B8F36B] text-[#122B2A] font-extrabold text-[16px] flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
                        >
                          <span>Continue</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 2: HOW TO REACH YOU */}
                  {step === 2 && (
                    <form id="demo-step-2" onSubmit={handleSubmit} noValidate className="space-y-5 animate-fade-up">
                      <div className="flex items-center justify-between pb-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-[14px] font-bold text-[#52635F] hover:text-[#122B2A] flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
                        >
                          <span>← Back</span>
                        </button>
                        <span className="text-[13px] text-[#52635F]">All fields kept</span>
                      </div>

                      {/* Your Name */}
                      <div>
                        <label
                          htmlFor="contactName"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          Your name <span className="text-[#122B2A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          name="contactName"
                          autoComplete="name"
                          required
                          value={formData.contactName}
                          onChange={(e) => handleChange("contactName", e.target.value)}
                          onBlur={() => handleBlur("contactName")}
                          aria-invalid={!!errors.contactName}
                          aria-describedby={errors.contactName ? "err-contactName" : undefined}
                          className={`w-full h-[50px] px-4 rounded-[12px] border text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] ${
                            errors.contactName ? "border-red-500 bg-red-50/20" : "border-[#122B2A]/15 bg-white"
                          }`}
                        />
                        {errors.contactName && (
                          <p id="err-contactName" className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1">
                            <span aria-hidden="true">⚠</span> {errors.contactName}
                          </p>
                        )}
                      </div>

                      {/* Best Way to Reach You (Segmented) */}
                      <div>
                        <span className="block text-[14px] font-bold text-[#122B2A] mb-2">
                          Best way to reach you <span className="text-[#122B2A]">*</span>
                        </span>
                        <div
                          role="radiogroup"
                          aria-label="Best way to reach you"
                          className="grid grid-cols-3 gap-2 p-1 bg-[#F7F8F2] rounded-[12px] border border-[#122B2A]/10"
                        >
                          {["Phone", "Email", "Text"].map((method) => {
                            const isSelected = formData.contactMethod === method;
                            return (
                              <button
                                key={method}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => {
                                  handleChange("contactMethod", method);
                                  // Re-validate contact value if switched
                                  if (touched.contactValue) {
                                    setErrors((prev) => ({ ...prev, contactValue: "" }));
                                  }
                                }}
                                className={`py-2.5 rounded-[9px] text-[14px] sm:text-[15px] font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F36B] ${
                                  isSelected
                                    ? "bg-white text-[#122B2A] shadow-sm"
                                    : "text-[#52635F] hover:text-[#122B2A]"
                                }`}
                              >
                                {method}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Phone or Email based on selection */}
                      <div>
                        <label
                          htmlFor="contactValue"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          {formData.contactMethod === "Email" ? "Your email" : "Your phone number"}{" "}
                          <span className="text-[#122B2A]">*</span>
                        </label>
                        <input
                          type={formData.contactMethod === "Email" ? "email" : "tel"}
                          id="contactValue"
                          name="contactValue"
                          required
                          autoComplete={formData.contactMethod === "Email" ? "email" : "tel"}
                          placeholder={
                            formData.contactMethod === "Email" ? "you@yourcompany.com" : "(704) 555-0199"
                          }
                          value={formData.contactValue}
                          onChange={(e) => handleChange("contactValue", e.target.value)}
                          onBlur={() => handleBlur("contactValue")}
                          aria-invalid={!!errors.contactValue}
                          aria-describedby={errors.contactValue ? "err-contactValue" : undefined}
                          className={`w-full h-[50px] px-4 rounded-[12px] border text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] ${
                            errors.contactValue ? "border-red-500 bg-red-50/20" : "border-[#122B2A]/15 bg-white"
                          }`}
                        />
                        {errors.contactValue && (
                          <p id="err-contactValue" className="mt-1.5 text-[13px] text-red-600 flex items-center gap-1">
                            <span aria-hidden="true">⚠</span> {errors.contactValue}
                          </p>
                        )}
                      </div>

                      {/* Anything I should know? */}
                      <div>
                        <label
                          htmlFor="notes"
                          className="block text-[14px] font-bold text-[#122B2A] mb-1.5"
                        >
                          Anything I should know? <span className="text-[#52635F] font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          placeholder="e.g. I want more water heater jobs"
                          value={formData.notes}
                          onChange={(e) => handleChange("notes", e.target.value)}
                          className="w-full p-4 rounded-[12px] border border-[#122B2A]/15 text-[16px] text-[#122B2A] placeholder-[#52635F]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8F36B] bg-white resize-none"
                        />
                      </div>

                      {/* Primary Full Width Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-[56px] rounded-full bg-[#B8F36B] text-[#122B2A] font-extrabold text-[16px] flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Sending…</span>
                            </>
                          ) : (
                            <>
                              <span>Send my demo request</span>
                              <span aria-hidden="true">→</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Under button privacy notice */}
                      <p className="text-[13px] text-[#52635F] text-center pt-1">
                        No spam. I&apos;ll only use this to reply about your demo.{" "}
                        <a
                          href="/privacy"
                          className="underline underline-offset-2 hover:text-[#122B2A] transition-colors"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
