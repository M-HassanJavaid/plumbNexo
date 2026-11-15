import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1F1E] text-white/70 py-10 lg:py-12 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left shrink-0">
            <a
              href="#top"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
              aria-label="PlumbNexo Home"
            >
              <div className="w-[28px] h-[28px] rounded-[7px] bg-[#122B2A] border border-[#B8F36B]/30 flex items-center justify-center font-extrabold text-[#B8F36B] text-[15px] select-none shrink-0 shadow-sm">
                N
              </div>
              <span className="font-extrabold text-white text-[19px] tracking-[-0.02em] leading-none">
                PlumbNexo
              </span>
            </a>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="text-[14px] text-white/60 italic whitespace-nowrap">
              Websites built for plumbers.
            </span>
          </div>

          {/* Center: Navigation Links */}
          <nav
            className="flex items-center justify-center gap-6 sm:gap-8 text-[14px] font-medium whitespace-nowrap shrink-0"
            aria-label="Footer navigation"
          >
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
          </nav>

          {/* Right: Direct Email Contact CTA */}
          <div className="shrink-0">
            <a
              href={`mailto:${siteConfig.demoInboxEmail}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B8F36B] text-[#122B2A] font-extrabold text-[13px] sm:text-[14px] shadow-sm hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <svg className="w-4 h-4 text-[#122B2A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Us Directly</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Agency Social Media & Copyright */}
        <div className="border-t border-white/8 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/50">
          {/* Agency Social Media */}
          <div className="flex items-center gap-3.5 flex-wrap justify-center sm:justify-start">
            <span className="text-white/40 font-medium">Follow PlumbNexo:</span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Instagram</span>
              <span className="text-[11px]" aria-hidden="true">↗</span>
            </a>
            <span className="text-white/20">·</span>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Facebook</span>
              <span className="text-[11px]" aria-hidden="true">↗</span>
            </a>
            <span className="text-white/20">·</span>
            <a
              href={siteConfig.quoraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Quora</span>
              <span className="text-[11px]" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="whitespace-nowrap text-white/50 text-[12px] sm:text-[13px] text-center sm:text-right">
            © {currentYear} PlumbNexo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
