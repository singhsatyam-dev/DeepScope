import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  LoaderCircle,
  AlertCircle,
  Clock3,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

import {
  fetchResearchById,
  deleteResearch,
} from "../features/research/researchSlice";

import ConfirmDialog from "../components/dashboard/ConfirmDIalog";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-10 border-b border-white/10 pb-4 text-3xl font-bold leading-tight tracking-tight text-white first:mt-0 sm:text-4xl">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mb-4 mt-9 text-2xl font-bold leading-snug text-white">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mb-3 mt-7 text-xl font-semibold text-white">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="mb-5 text-[15px] leading-8 text-neutral-300">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="mb-6 ml-2 list-disc space-y-3 pl-5 marker:text-[#E50914]">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="mb-6 ml-2 list-decimal space-y-4 pl-5 marker:font-bold marker:text-[#E50914]">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="pl-2 text-[15px] leading-8 text-neutral-300">{children}</li>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="text-neutral-200">{children}</em>,

  blockquote: ({ children }) => (
    <blockquote className="my-7 rounded-r-lg border-l-4 border-[#E50914] bg-white/[0.04] px-5 py-4 text-neutral-300">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#ff555d] underline decoration-[#E50914]/40 underline-offset-4 transition hover:text-white"
    >
      {children}
    </a>
  ),

  hr: () => <hr className="my-9 border-white/10" />,

  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#111111] p-5 text-sm leading-7 text-neutral-200">
      {children}
    </pre>
  ),

  code: ({ className, children, ...props }) => (
    <code
      className={
        className
          ? `${className} font-mono`
          : "rounded-md bg-white/10 px-1.5 py-1 font-mono text-sm text-[#ff777d]"
      }
      {...props}
    >
      {children}
    </code>
  ),
};

function ReportPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentResearch, loading, error, deleting } = useSelector(
    (state) => state.research,
  );

  const [deleteError, setDeleteError] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const research = currentResearch?.id === Number(id) ? currentResearch : null;

  useEffect(() => {
    dispatch(fetchResearchById(id));
  }, [dispatch, id]);

  const handleCopyReport = async () => {
    try {
      const reportContent = `# ${research.question}\n\n${research.report || ""}`;

      await navigator.clipboard.writeText(reportContent);

      setCopyStatus("copied");
    } catch (error) {
      setCopyStatus("error");
    }
  };

  const handleDelete = async () => {
    setDeleteError("");

    try {
      await dispatch(deleteResearch(id)).unwrap();

      setShowDeleteDialog(false);

      navigate("/dashboard", {
        state: { scrollTo: "research-history" },
      });
    } catch (error) {
      setDeleteError(
        typeof error === "string"
          ? error
          : "Unable to delete this research. Please try again.",
      );
    }
  };

  if (loading && !research) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center gap-3 text-neutral-400">
        <LoaderCircle className="animate-spin text-[#E50914]" size={22} />
        Loading research report...
      </main>
    );
  }

  if (error && !research) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 text-center">
        <AlertCircle className="mx-auto mb-4 text-red-400" size={30} />
        <h2 className="text-xl font-bold text-white">Unable to load report</h2>
        <p className="mt-2 text-sm text-neutral-400">{error}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-[#E50914]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </main>
    );
  }

  if (!research) return null;

  return (
    <main className="min-h-screen bg-[#101010] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {deleting ? "Deleting..." : "Delete Research"}
          </button>
        </div>

        {deleteError && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={17} className="shrink-0" />
            {deleteError}
          </div>
        )}

        <div className="mb-10 border-b border-white/[0.08] pb-8">
          {/* Publication Label */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#E50914]">
              <FileText size={16} />
              DeepScope Research
            </div>

            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              {copyStatus === "copied" ? (
                <>
                  <Check size={15} className="text-green-400" />
                  Copied!
                </>
              ) : copyStatus === "error" ? (
                <>
                  <AlertCircle size={15} className="text-red-400" />
                  Copy failed
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy Report
                </>
              )}
            </button>
          </div>

          {/* Research Title */}
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {research.question}
          </h1>

          {/* Metadata */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Clock3 size={15} className="text-neutral-500" />
              <span>
                {new Date(research.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileText size={15} className="text-neutral-500" />
              <span>{research.sources?.length || 0} Sources</span>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                research.status === "completed"
                  ? "bg-green-500/10 text-green-400"
                  : research.status === "failed"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {research.status}
            </span>
          </div>
        </div>

        <article className="rounded-2xl border border-white/[0.07] bg-[#181818] p-6 font-sans sm:p-10 lg:p-12">
          <div className="mx-auto max-w-4xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {research.report || "No report content available."}
            </ReactMarkdown>
          </div>
        </article>

        {research.sources?.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-white">
              Sources ({research.sources.length})
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {research.sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#181818] p-4 transition hover:border-white/20"
                >
                  <span className="min-w-0 truncate text-sm text-neutral-300">
                    {source.title}
                  </span>
                  <ExternalLink
                    size={16}
                    className="shrink-0 text-neutral-500"
                  />
                </a>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 border-t border-white/[0.07] pt-6 text-center text-xs text-neutral-600">
          DeepScope · Go beyond the surface.
        </footer>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete this research?"
        message="This research report and its associated sources will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete Research"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={deleting}
      />
    </main>
  );
}

export default ReportPage;
