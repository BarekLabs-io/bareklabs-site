import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SUPERSCRIPT = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
function toSuperscript(n: string): string {
  return n.split('').map((d) => SUPERSCRIPT[Number(d)] ?? d).join('')
}

/* Converts "[^17]: https://…" definition lines into a bullet list, then
 * turns remaining inline "[^17]" citation markers into unicode superscript
 * so the report reads as footnoted prose without a markdown footnote plugin. */
export function prepareReportMarkdown(md: string): string {
  const withSourceList = md.replace(/^\[\^(\d+)\]:\s*(\S+)\s*$/gm, '- **[$1]** $2')
  const withSeparators = withSourceList.replace(/(\[\^\d+\])(?=\[\^\d+\])/g, '$1,')
  return withSeparators.replace(/\[\^(\d+)\]/g, (_, n) => toSuperscript(n))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/* Pulls the "## …" headings out of a report's markdown so a page can build a
 * table of contents without re-parsing the rendered tree. */
export function extractHeadings(md: string): { id: string; label: string }[] {
  const matches = [...md.matchAll(/^##\s+(.+)$/gm)]
  return matches.map((m) => ({ id: slugify(m[1]), label: m[1] }))
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (node && typeof node === 'object' && 'props' in node) return textOf((node as { props: { children?: ReactNode } }).props.children)
  return ''
}

export default function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 id={slugify(textOf(children))} className="mt-16 scroll-mt-40 border-t border-line pt-10 text-2xl font-medium tracking-tight first:mt-0 first:border-t-0 first:pt-0 md:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 scroll-mt-40 text-lg font-medium tracking-tight text-foreground md:text-xl">{children}</h3>
        ),
        p: ({ children }) => <p className="prose-lab mt-6 max-w-none first:mt-0">{children}</p>,
        strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic text-dim">{children}</em>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="border-b border-signal/40 text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            {children}
          </a>
        ),
        hr: () => <div className="my-14 h-px w-full bg-line" />,
        blockquote: ({ children }) => (
          <blockquote className="my-8 border-s-2 border-signal bg-secondary p-6 font-mono-lab text-[13px] leading-6 tracking-wide text-dim [&_p]:mt-0 [&_p]:max-w-none [&_p]:font-mono-lab [&_p]:text-[13px] [&_p]:leading-6 [&_p]:tracking-wide [&_p+p]:mt-3 [&_strong]:text-signal">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => <ul className="prose-lab mt-6 max-w-none list-disc space-y-2 ps-5 marker:text-signal">{children}</ul>,
        ol: ({ children }) => <ol className="prose-lab mt-6 max-w-none list-decimal space-y-2 ps-5 marker:text-signal">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto border border-line bg-panel p-1">
            <table className="w-full min-w-[640px] border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-line bg-ticker font-mono-lab text-[10px] tracking-[0.15em] text-faint">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-line/50 even:bg-secondary/50">{children}</tr>,
        th: ({ children }) => <th className="px-4 py-3 text-start align-top">{children}</th>,
        td: ({ children }) => (
          <td className="px-4 py-3 text-start align-top font-mono-lab text-[13px] leading-5 tracking-wide text-dim">{children}</td>
        ),
        code: ({ children }) => (
          <code className="border border-line bg-secondary px-1.5 py-0.5 font-mono-lab text-[0.9em]">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
