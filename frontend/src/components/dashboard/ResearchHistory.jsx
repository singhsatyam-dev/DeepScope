import { Link } from "react-router-dom";
import {
  Clock3,
  LoaderCircle,
  FileText,
  AlertCircle,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

import SectionHeading from "./SectionHeading";

function ResearchHistory({
  researches,
  loading,
  error,
  deleting,
  deleteError,
  onDelete,
}) {
  return (
    <section id="research-history" className="scroll-mt-24">
      <SectionHeading
        title="Continue Researching"
        subtitle="Your previously generated research reports"
      />

      {deleteError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-300">
          <AlertCircle size={18} className="shrink-0" />
          {deleteError}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-12 text-sm text-neutral-400">
          <LoaderCircle size={19} className="animate-spin" />
          Loading your research history...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-5 text-sm text-red-300">
          Unable to load research history: {error}
        </div>
      ) : researches.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-12 text-center">
          <FileText size={30} className="mx-auto mb-3 text-neutral-600" />

          <p className="text-sm font-semibold text-white">No research yet</p>

          <p className="mt-2 text-xs text-neutral-500">
            Your generated research reports will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {researches.map((item, index) => (
            <div
              key={item.id}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#181818] p-4 transition hover:border-white/15 hover:bg-[#202020] sm:p-5"
            >
              <Link
                to={`/research/${item.id}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sm font-bold text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white transition group-hover:text-[#E50914]">
                    {item.question}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span className="capitalize">{item.status}</span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={12} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <span>•</span>

                    <span>{item.sources?.length || 0} sources</span>
                  </div>
                </div>
              </Link>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={`/research/${item.id}`}
                  aria-label="Open research report"
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-white/[0.06] hover:text-[#E50914]"
                >
                  <ArrowUpRight size={19} />
                </Link>

                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  disabled={deleting}
                  aria-label={`Delete research: ${item.question}`}
                  title="Delete research"
                  className="rounded-lg p-2 text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deleting ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Trash2 size={17} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ResearchHistory;
