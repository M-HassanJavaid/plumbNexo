"use client";

import Section from "../Section";
import Eyebrow from "../Eyebrow";
import Button from "../Button";
import CaseStudyVideo from "../video/CaseStudyVideo";
import { caseStudies } from "@/content/caseStudies";
import { trackEvent } from "@/lib/analytics";

export default function Work() {
  const handleLiveSiteClick = (projectId) => {
    trackEvent("portfolio_outbound", { project: projectId });
  };

  return (
    <Section id="work" labelledBy="work-heading">
      {/* Header */}
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <Eyebrow className="mb-4">RECENT WORK</Eyebrow>
        <h2 id="work-heading" className="h2-headline text-[#122B2A] mb-4">
          Websites we designed and built for plumbing businesses.
        </h2>
        <p className="body-text text-[#52635F]">
          Each 45-second walkthrough shows the problem the site solves, the features we built, and why each one matters to the homeowner or property manager on the other end.
        </p>
      </div>

      {/* Case Studies List */}
      <div className="space-y-16 lg:space-y-24">
        {caseStudies.map((project, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Video Column (58% on desktop) */}
              <div
                className={`lg:col-span-7 ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <CaseStudyVideo project={project} />
              </div>

              {/* Text Column (42% on desktop) */}
              <div
                className={`lg:col-span-5 flex flex-col justify-center ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {/* Tag Line */}
                <div className="text-[12px] sm:text-[13px] font-bold text-[#52635F] tracking-[0.1em] uppercase mb-2">
                  {project.tag}
                </div>

                {/* Title */}
                <h3 className="text-[26px] sm:text-[32px] font-extrabold text-[#122B2A] tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-[16px] text-[#52635F] italic mb-6 leading-relaxed">
                  {project.summary}
                </p>

                {/* Challenge */}
                <div className="mb-6 bg-white p-5 rounded-[16px] border border-[#122B2A]/8 shadow-sm">
                  <div className="text-[12px] font-bold uppercase tracking-wider text-[#122B2A] mb-2">
                    The Challenge
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-[#52635F] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* What We Built -> Why It Helps */}
                <div className="mb-6">
                  <div className="text-[12px] font-bold uppercase tracking-wider text-[#122B2A] mb-3 flex items-center gap-1.5">
                    <span>What We Built</span>
                    <span className="text-[#52635F]">→</span>
                    <span className="text-[#122B2A]">Why It Helps</span>
                  </div>
                  <ul className="space-y-2.5 text-[14px] sm:text-[15px]">
                    {project.features.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8F36B] mt-2 shrink-0" aria-hidden="true" />
                        <span className="leading-snug">
                          <strong className="font-bold text-[#122B2A]">{item.feature}</strong>
                          {" → "}
                          <span className="text-[#52635F] italic">{item.outcome}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[12px] font-medium bg-[#122B2A]/5 text-[#122B2A] px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Outbound live site link */}
                <div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLiveSiteClick(project.id)}
                    className="inline-flex items-center text-[15px] font-bold text-[#122B2A] underline underline-offset-4 decoration-[#122B2A]/30 hover:decoration-[#B8F36B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
                  >
                    <span>Visit live site</span>
                    <span className="ml-1 text-[13px]" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline CTA Band after both case studies (per README 4.3) */}
      <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-[20px] bg-white border border-[#122B2A]/8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="text-left">
          <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#122B2A] mb-1">
            Want to see what this looks like for your business?
          </h3>
          <p className="text-[15px] text-[#52635F]">
            We build one personalized demo page free, so you can judge the work before paying anything.
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" location="work" className="w-full sm:w-auto">
            Get free demo page
          </Button>
        </div>
      </div>
    </Section>
  );
}
