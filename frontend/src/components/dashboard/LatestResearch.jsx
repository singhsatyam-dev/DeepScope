import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FileText, ArrowUpRight, ExternalLink } from "lucide-react";

function LatestResearch({ research }) {
  if (!research) return null;

  return (
    <section className="mb-14 rounded-2xl border border-white/10 bg-[#181818] p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText size={19} className="text-[#E50914]" />

          <span className="text-sm font-semibold text-white">
            Latest Research Report
          </span>
        </div>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium capitalize text-green-400">
          {research.status}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white">{research.question}</h2>

      {research.report ? (
        <article className="mt-6 space-y-4 text-sm leading-7 text-neutral-300">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mb-4 mt-7 text-2xl font-bold text-white">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="mb-3 mt-6 text-xl font-bold text-white">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-2 mt-5 text-lg font-semibold text-white">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-4 leading-7 text-neutral-300">{children}</p>
              ),

              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
              ),

              li: ({ children }) => (
                <li className="pl-1 text-neutral-300">{children}</li>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),

              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#E50914] pl-4 italic text-neutral-400">
                  {children}
                </blockquote>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E50914] underline underline-offset-4 hover:text-red-400"
                >
                  {children}
                </a>
              ),

              hr: () => <hr className="my-6 border-white/10" />,

              code: ({ children }) => (
                <code className="rounded bg-white/10 px-1.5 py-1 text-[#ff777d]">
                  {children}
                </code>
              ),
            }}
          >
            {research.report}
          </ReactMarkdown>
        </article>
      ) : (
        <p className="mt-5 text-sm text-neutral-500">
          Report content is not available in this research record.
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <span className="text-xs text-neutral-500">
          {research.sources?.length || 0} research sources
        </span>

        <Link
          to={`/research/${research.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
        >
          Open Full Report
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {research.sources?.length > 0 && (
        <div className="mt-7 border-t border-white/[0.08] pt-5">
          <h3 className="mb-4 text-sm font-bold text-white">
            Sources ({research.sources.length})
          </h3>

          <div className="space-y-3">
            {research.sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] p-3 transition hover:bg-white/[0.08]"
              >
                <span className="min-w-0 truncate text-sm text-neutral-300">
                  {source.title}
                </span>

                <ExternalLink size={15} className="shrink-0 text-neutral-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default LatestResearch;
