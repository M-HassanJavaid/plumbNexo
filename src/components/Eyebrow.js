/**
 * Eyebrow Component
 * 13px, weight 700, uppercase, letter-spacing 0.12em
 * With a small mint dot before it. Supports dark mode variant (mint text).
 */
export default function Eyebrow({ children, onDark = false, className = "" }) {
  return (
    <div
      className={`inline-flex items-center text-[13px] font-bold uppercase tracking-[0.12em] ${
        onDark ? "text-mint" : "text-ink"
      } ${className}`}
    >
      <span
        className="w-[7px] h-[7px] rounded-full bg-mint mr-2.5 inline-block shrink-0 shadow-[0_0_8px_rgba(184,243,107,0.6)]"
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}
