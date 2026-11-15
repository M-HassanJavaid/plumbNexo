"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * Shared Button Component
 * Primary, secondary, textLink, and onDarkPrimary variants.
 * Primary buttons always scroll to #demo and focus the first form input.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  location = "unknown",
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const isPrimary = variant === "primary" || variant === "onDarkPrimary";

  const handleClick = (e) => {
    if (isPrimary && (!href || href === "#demo")) {
      e.preventDefault();
      trackEvent("cta_click", { location });

      const target = document.getElementById("demo");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const firstInput = document.querySelector("#demo input, #demo form input:not([type='hidden'])");
          if (firstInput) {
            firstInput.focus({ preventScroll: true });
          }
        }, 500);
      }
    } else if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-200 select-none group text-center cursor-pointer";

  let variantStyles = "";
  if (variant === "primary" || variant === "onDarkPrimary") {
    variantStyles =
      "bg-mint text-ink rounded-full h-[56px] sm:h-[52px] px-7 text-[16px] shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2";
  } else if (variant === "secondary") {
    variantStyles =
      "bg-transparent text-ink border-[1.5px] border-ink rounded-full h-[52px] px-6 text-[16px] hover:bg-ink hover:text-white active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";
  } else if (variant === "textLink") {
    variantStyles =
      "p-0 h-auto bg-transparent text-ink underline underline-offset-4 decoration-line hover:decoration-mint font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint";
  }

  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  const content = (
    <>
      <span>{children}</span>
      {isPrimary && (
        <span
          className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
          aria-hidden="true"
        >
          →
        </span>
      )}
    </>
  );

  if (href && !disabled && !isPrimary) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles} ${widthStyle} ${className}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${widthStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
