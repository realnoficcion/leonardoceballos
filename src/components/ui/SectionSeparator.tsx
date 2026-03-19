export function SectionSeparator({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`border-none h-px bg-accent/20 mx-4 md:mx-10 ${className}`}
    />
  );
}
