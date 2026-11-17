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
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="text-white/40 font-medium mr-1">Follow PlumbNexo:</span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:bg-white/5 py-1 px-2 rounded-lg"
              aria-label="PlumbNexo on Instagram"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
              <span className="text-[10px]" aria-hidden="true">↗</span>
            </a>
            <span className="text-white/20">·</span>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:bg-white/5 py-1 px-2 rounded-lg"
              aria-label="PlumbNexo on Facebook"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
              <span className="text-[10px]" aria-hidden="true">↗</span>
            </a>
            <span className="text-white/20">·</span>
            <a
              href={siteConfig.quoraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:bg-white/5 py-1 px-2 rounded-lg"
              aria-label="PlumbNexo on Quora"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.074 0C5.352 0 0 5.253 0 11.854c0 6.438 5.163 11.706 11.666 11.848l.067.75c.074.836.326 2.378 1.442 3.167 1.42 1.004 2.894.137 3.655-.589l1.706-1.624c2.89-1.97 4.79-5.187 4.79-8.798-.001-6.601-5.353-11.854-12.075-11.854zm.177 19.34c-1.393 0-2.317-.676-2.583-1.897-.04-.183-.243-.277-.4-.183-.559.336-1.365.679-2.222.679-2.039 0-3.64-1.637-3.64-3.729 0-2.115 1.635-3.774 3.69-3.774 2.054 0 3.666 1.659 3.666 3.774 0 .346-.046.685-.133 1.01-.044.167.098.318.267.288.751-.133 1.439-.499 1.944-1.042.155-.167.433-.098.489.123.111.437.288 1.201.288 1.745 0 1.637-.621 3.006-1.366 3.006z"/>
              </svg>
              <span>Quora</span>
              <span className="text-[10px]" aria-hidden="true">↗</span>
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
