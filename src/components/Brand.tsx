/* The wordmark, rendered as text (Barek bold, Labs regular) wherever the
 * actual logo image isn't used — must always match logo.svg's treatment. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold">Barek</span> <span className="font-normal">/ Labs</span>
    </span>
  )
}

/* Splits a string on the literal "BAREK LABS" and replaces each occurrence
 * with <BrandMark />, for prose paragraphs stored as plain dict strings. */
export function withBrandMark(text: string): React.ReactNode[] {
  const parts = text.split('BAREK LABS')
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<BrandMark key={i} />, part]))
}
