export default function TrustStrip() {
  const items = [
    {
      label: "Tap-to-call on mobile",
      icon: (
        <svg className="w-4 h-4 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "Clear service areas",
      icon: (
        <svg className="w-4 h-4 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Short, smart estimate forms",
      icon: (
        <svg className="w-4 h-4 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Real reviews & licenses shown",
      icon: (
        <svg className="w-4 h-4 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: "Fast, modern builds (Next.js)",
      icon: (
        <svg className="w-4 h-4 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white border-y border-[#122B2A]/8 py-4 sm:py-5 relative z-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <p className="sr-only">Features every PlumbNexo website includes</p>
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 shrink-0 snap-start text-[14px] font-semibold text-[#122B2A] bg-[#F7F8F2] sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none"
            >
              <div className="w-7 h-7 rounded-full bg-[#B8F36B]/25 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
