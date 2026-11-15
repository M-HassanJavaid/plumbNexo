import Section from "../Section";
import Eyebrow from "../Eyebrow";

export default function Included() {
  const items = [
    {
      title: "Service pages:",
      desc: "for the jobs you want more of",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Service-area coverage:",
      desc: "towns and ZIPs, plus a map",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Mobile tap-to-call:",
      desc: "a sticky call bar and click-to-call everywhere",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "Smart estimate forms:",
      desc: "short, routed to the right person, tested",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Trust proof:",
      desc: "your real reviews, license, and project stories",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Speed & SEO basics:",
      desc: "fast loading, clean structure, local schema",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Tracking:",
      desc: "calls and form requests measured",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "You own it:",
      desc: "your domain, your accounts, a clear handover",
      icon: (
        <svg className="w-5 h-5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
  ];

  return (
    <Section id="included" labelledBy="included-heading" className="bg-[#F2F4EB]/40">
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <Eyebrow className="mb-4">THE FULL WEBSITE</Eyebrow>
        <h2 id="included-heading" className="h2-headline text-[#122B2A]">
          Everything a homeowner needs to choose you.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#122B2A]/8 shadow-sm flex flex-col"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#B8F36B]/25 flex items-center justify-center mb-4 shrink-0">
              {item.icon}
            </div>
            <h3 className="text-[17px] font-bold text-[#122B2A] mb-1.5 leading-snug">
              {item.title}
            </h3>
            <p className="text-[14px] text-[#52635F] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[14px] text-[#52635F] italic">
        Advanced integrations (CRM, booking tools) and ongoing SEO or ads are scoped and quoted separately.
      </p>
    </Section>
  );
}
