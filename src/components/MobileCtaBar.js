"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let heroCtaVisible = true;
    let demoVisible = false;

    const updateVisibility = () => {
      // Visible if hero CTA has scrolled out of view AND demo form is NOT in view
      setVisible(!heroCtaVisible && !demoVisible);
    };

    // Observer for Hero CTA
    const heroCtaEl = document.getElementById("hero-primary-cta");
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          heroCtaVisible = entry.isIntersecting;
          updateVisibility();
        });
      },
      { threshold: 0.1 }
    );

    if (heroCtaEl) heroObserver.observe(heroCtaEl);

    // Observer for Demo section
    const demoEl = document.getElementById("demo");
    const demoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          demoVisible = entry.isIntersecting;
          updateVisibility();
        });
      },
      { threshold: 0.05 }
    );

    if (demoEl) demoObserver.observe(demoEl);

    return () => {
      heroObserver.disconnect();
      demoObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#122B2A]/10 shadow-[0_-4px_20px_rgba(18,43,42,0.08)] px-4 py-2.5 transition-transform duration-200 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{
        paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))",
      }}
      aria-hidden={!visible}
    >
      <Button
        variant="primary"
        fullWidth
        location="sticky_mobile"
        tabIndex={visible ? 0 : -1}
      >
        Get free demo page
      </Button>
    </div>
  );
}
