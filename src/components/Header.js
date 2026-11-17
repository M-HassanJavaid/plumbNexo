"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { siteConfig } from "@/lib/site.config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section highlight
    const sectionIds = ["work", "process", "faq", "about"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "How it works", href: "#process", id: "process" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "About", href: "#about", id: "about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-[#F7F8F2]/85 backdrop-blur-md ${
        scrolled ? "border-b border-[#122B2A]/10 shadow-[0_4px_20px_-10px_rgba(18,43,42,0.05)]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 h-[64px] lg:h-[72px] flex items-center justify-between">
        {/* Left: Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-lg p-1 -ml-1 select-none"
          aria-label="PlumbNexo Home"
        >
          {/* TODO: If custom SVG logo file is updated, swap /public/brand/logo-full.svg */}
          <div className="flex items-center gap-2.5">
            <div className="w-[28px] h-[28px] rounded-[7px] bg-[#122B2A] flex items-center justify-center font-extrabold text-[#B8F36B] text-[15px] select-none shrink-0 shadow-sm">
              N
            </div>
            <span className="font-extrabold text-[#122B2A] text-[19px] tracking-[-0.02em] leading-none">
              PlumbNexo
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav (≥1024px only) */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 text-[15px] font-semibold transition-colors duration-150 ${
                  isActive ? "text-[#122B2A]" : "text-[#52635F] hover:text-[#122B2A]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#B8F36B]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: CTA Button & Direct Email */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${siteConfig.demoInboxEmail}`}
            className="hidden xl:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#52635F] hover:text-[#122B2A] transition-colors py-1.5 px-3 rounded-full hover:bg-[#122B2A]/5"
            title="Direct email contact"
          >
            <svg className="w-3.5 h-3.5 text-[#122B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{siteConfig.demoInboxEmail}</span>
          </a>

          {/* Desktop button */}
          <div className="hidden sm:block">
            <Button variant="primary" location="header">
              Get free demo page
            </Button>
          </div>

          {/* Mobile button (no hamburger menu, strictly per README 4.0) */}
          <div className="sm:hidden">
            <Button
              variant="primary"
              location="header_mobile"
              className="h-[42px] px-4 text-[14px]"
            >
              Free demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
