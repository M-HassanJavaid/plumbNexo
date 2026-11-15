import Section from "../Section";
import Eyebrow from "../Eyebrow";
import Button from "../Button";

export default function Process() {
  const steps = [
    {
      num: "1",
      title: "Share the basics (2 minutes).",
      description: "Your business name, main service, and the areas you cover.",
    },
    {
      num: "2",
      title: "We build your free demo page.",
      description: "One page, designed for your business, working on mobile.",
    },
    {
      num: "3",
      title: "Review it together, then decide.",
      description:
        "If you want the full website, we agree scope, price, and timeline in writing. If not, no hard feelings.",
    },
  ];

  return (
    <Section id="process" labelledBy="process-heading">
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <Eyebrow className="mb-4">HOW IT WORKS</Eyebrow>
        <h2 id="process-heading" className="h2-headline text-[#122B2A]">
          See your website before you pay for it.
        </h2>
      </div>

      {/* 3 Steps in a line on desktop connected by thin line */}
      <div className="relative mb-14">
        {/* Connection line for desktop */}
        <div
          className="hidden md:block absolute top-[28px] left-[60px] right-[60px] h-[1px] bg-[#122B2A]/14 z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start bg-white p-6 sm:p-7 rounded-[20px] border border-[#122B2A]/8 shadow-sm">
              <div className="w-[56px] h-[56px] rounded-full bg-[#122B2A] text-[#B8F36B] font-extrabold text-[22px] flex items-center justify-center mb-6 shrink-0 shadow-md">
                {step.num}
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#122B2A] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#52635F] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note card on ink background with mint text accent */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-[#122B2A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#B8F36B]/20 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#B8F36B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[18px] font-bold text-[#B8F36B] mb-1">
              6 months of support after your full website launches.
            </h4>
            <p className="text-[14px] sm:text-[15px] text-white/80">
              Fixes and small edits, as agreed in the project.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" location="process" className="w-full sm:w-auto">
            Get free demo page
          </Button>
        </div>
      </div>
    </Section>
  );
}
