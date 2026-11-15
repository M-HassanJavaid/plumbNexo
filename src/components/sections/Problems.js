import Section from "../Section";
import Eyebrow from "../Eyebrow";

export default function Problems() {
  const problems = [
    {
      problem: "Homeowners can't tell if you handle their job",
      fix: "Clear service sections for the work you want more of",
      why: "Visitors recognize a fit before they call",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      problem: '"Do you come out to my area?"',
      fix: "Service areas named next to services and contact",
      why: "Fewer out-of-area calls and wasted replies",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      problem: "Calling you takes too many taps on a phone",
      fix: "Sticky tap-to-call and short forms on every screen",
      why: "Less friction for people with an urgent problem",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      problem: "Requests arrive with no useful detail",
      fix: "Forms that ask for ZIP, service, and the issue",
      why: "Your team can respond faster and quote better",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <Section id="problems" labelledBy="problems-heading" className="bg-[#F2F4EB]/50">
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <Eyebrow className="mb-4">WHAT GETS IN THE WAY</Eyebrow>
        <h2 id="problems-heading" className="h2-headline text-[#122B2A]">
          Good plumbers lose jobs to unclear websites.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problems.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-[20px] bg-white border border-[#122B2A]/8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-[10px] bg-[#B8F36B]/25 flex items-center justify-center mb-5 shrink-0">
                {item.icon}
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#122B2A] mb-2 leading-snug">
                {item.problem}
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#52635F] leading-relaxed mb-6">
                {item.fix}
              </p>
            </div>

            <div className="pt-4 border-t border-[#122B2A]/8 flex items-center gap-2 text-[13px] sm:text-[14px] text-[#122B2A] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#B8F36B] shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-[#122B2A]">Why it matters:</strong> {item.why}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
