/* The wordmark, rendered as text wherever the actual logo image isn't used.
 * Must always match logo.svg's treatment exactly: BAREK bold + caps,
 * space, slash, space, LABS regular weight + caps. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold">BAREK</span> <span className="font-normal">/ LABS</span>
    </span>
  )
}

/* Splits a string on the literal "BAREK LABS" and replaces each occurrence
 * with <BrandMark />, for prose paragraphs stored as plain dict strings. */
export function withBrandMark(text: string): React.ReactNode[] {
  const parts = text.split('BAREK LABS')
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<BrandMark key={i} />, part]))
}
