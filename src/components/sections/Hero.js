"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Eyebrow from "../Eyebrow";
import Button from "../Button";

export default function Hero() {
  const [labelsVisible, setLabelsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLabelsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative pt-[90px] sm:pt-[110px] lg:pt-[130px] pb-[60px] lg:pb-[100px] overflow-hidden"
    >
      {/* Outlined "N" Motif background (4-6% opacity) per README 2.3 */}
      <div
        className="n-motif-bg right-[-80px] top-[40px] w-[500px] h-[600px] text-[#122B2A] select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 480" fill="none" stroke="currentColor" strokeWidth="18" className="w-full h-full">
          <path d="M50 430V50H110L290 430H350V50" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[auto] lg:min-h-[75vh]">
          {/* Left Column (55% desktop): Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Eyebrow className="mb-4 sm:mb-5">WEBSITES BUILT FOR PLUMBERS</Eyebrow>

            <h1
              id="hero-heading"
              className="h1-headline text-[#122B2A] mb-5 sm:mb-6"
            >
              Your work earns trust. Your website{" "}
              <span className="mint-highlight">should too.</span>
            </h1>

            <p className="body-text mb-8 text-[#52635F]">
              We design and build clear, mobile-friendly websites that help homeowners understand your services, check you cover their area, and get in touch.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <div id="hero-primary-cta" className="inline-block">
                <Button variant="primary" location="hero" className="w-full sm:w-auto">
                  Get free demo page
                </Button>
              </div>

              <Button
                variant="secondary"
                href="#work"
                className="w-full sm:w-auto"
              >
                Watch the work
              </Button>
            </div>

            {/* Micro-trust row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] sm:text-[14px] text-[#52635F] pt-2 border-t border-[#122B2A]/8">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#122B2A] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free demo page, no payment</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#122B2A] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Scope &amp; price agreed in writing</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#122B2A] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>You own your domain &amp; site</span>
              </span>
            </div>
          </div>

          {/* Right Column (45% desktop): Visual with Ink Panel & Floating Labels */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-[24px] bg-[#122B2A] p-2 sm:p-3 overflow-hidden shadow-soft border border-[#122B2A]/20">
              <div className="relative aspect-[1000/960] w-full rounded-[18px] overflow-hidden">
                <Image
                  src="/images/hero-devices.webp"
                  alt="Pathmaker Plumbing website preview on desktop browser and smartphone"
                  width={1000}
                  height={960}
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating label 1 (Top left) */}
              <div
                className={`absolute top-6 left-6 z-20 bg-white text-[#122B2A] text-[12px] sm:text-[13px] font-bold px-3 py-2 rounded-[8px] shadow-lg border-l-[3px] border-[#B8F36B] transition-opacity duration-500 ease-out ${
                  labelsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Tap-to-call on every screen
              </div>

              {/* Floating label 2 (Bottom right) */}
              <div
                className={`absolute bottom-6 right-6 z-20 bg-white text-[#122B2A] text-[12px] sm:text-[13px] font-bold px-3 py-2 rounded-[8px] shadow-lg border-l-[3px] border-[#B8F36B] transition-opacity duration-500 ease-out ${
                  labelsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Service area answered upfront
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
