/**
 * Semantic Section wrapper
 * Applies standard 72px mobile / 120px desktop padding and 1200px max container.
 */
export default function Section({
  id,
  labelledBy,
  children,
  className = "",
  containerClassName = "",
  hasContainer = true,
  ...props
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-[72px] lg:py-[120px] ${className}`}
      {...props}
    >
      {hasContainer ? (
        <div className={`max-w-[1200px] mx-auto px-5 w-full ${containerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
