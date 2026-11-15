import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1F1E] text-white/70 py-10 lg:py-12 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
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

          {/* Right: Contact & Copyright */}
          <div className="flex flex-col items-center lg:items-end gap-1.5 text-[13px] text-white/60 text-center lg:text-right shrink-0">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <a
                href={`mailto:${siteConfig.demoInboxEmail}`}
                className="hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors"
              >
                {siteConfig.demoInboxEmail}
              </a>
              <span className="text-white/30">·</span>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Instagram</span>
                <span className="text-[11px]" aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="whitespace-nowrap text-white/50 text-[12px] sm:text-[13px]">
              © {currentYear} PlumbNexo. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
