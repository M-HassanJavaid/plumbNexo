"use client";

import { useState } from "react";
import Section from "../Section";
import Eyebrow from "../Eyebrow";
import { faqItems } from "@/content/faq";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site.config";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default per README 4.8

  const toggleItem = (idx) => {
    const isOpening = openIndex !== idx;
    setOpenIndex(isOpening ? idx : null);
    if (isOpening) {
      trackEvent("faq_open", { question: faqItems[idx].question });
    }
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById("demo");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const firstInput = document.querySelector("#demo input:not([type='hidden'])");
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  return (
    <Section id="faq" labelledBy="faq-heading" className="bg-[#F2F4EB]/50">
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <Eyebrow className="mb-4">QUESTIONS</Eyebrow>
        <h2 id="faq-heading" className="h2-headline text-[#122B2A]">
          Before you ask for a demo.
        </h2>
      </div>

      <div className="max-w-[840px] space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-[16px] border border-[#122B2A]/8 overflow-hidden transition-shadow duration-200 shadow-sm"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint select-none"
                >
                  <span className="font-bold text-[17px] sm:text-[18px] text-[#122B2A]">
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-[#122B2A]/5 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#B8F36B]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4 text-[#122B2A]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`px-6 pb-5 pt-1 text-[15px] sm:text-[16px] text-[#52635F] leading-relaxed transition-all duration-200 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      {/* Under FAQ text link */}
      <div className="mt-8 text-[15px] text-[#52635F]">
        Still have a question?{" "}
        <a
          href="#demo"
          onClick={handleScrollToForm}
          className="font-bold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/40 hover:decoration-[#B8F36B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          Ask it in the form below ↓
        </a>{" "}
        or{" "}
        <a
          href={`mailto:${siteConfig.demoInboxEmail}`}
          className="font-bold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/40 hover:decoration-[#B8F36B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          email us directly
        </a>
        .
      </div>
    </Section>
  );
}
