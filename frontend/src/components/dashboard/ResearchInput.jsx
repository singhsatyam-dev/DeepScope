import {
  ArrowUpRight,
  Sparkles,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

function ResearchInput({
  question,
  setQuestion,
  creating,
  createError,
  onSubmit,
}) {
  return (
    <section id="research-input" className="mb-14 scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-[#E50914]" />

        <h2 className="text-lg font-bold text-white">
          What are you curious about?
        </h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-white/10 bg-[#1A1A1A] p-3 transition focus-within:border-[#E50914]/60"
      >
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask DeepScope anything..."
          rows={3}
          maxLength={1000}
          disabled={creating}
          className="w-full resize-none bg-transparent p-2 text-sm leading-6 text-white outline-none placeholder:text-neutral-600 disabled:opacity-50"
        />

        <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
          <span className="text-xs text-neutral-500">
            {question.length}/1000 characters
          </span>

          <button
            type="submit"
            disabled={!question.trim() || creating}
            className="flex items-center gap-2 rounded-lg bg-[#E50914] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c90812] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Researching...
              </>
            ) : (
              <>
                Research <ArrowUpRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>

      {creating && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#E50914]/20 bg-[#E50914]/[0.06] p-4">
          <LoaderCircle
            size={20}
            className="shrink-0 animate-spin text-[#E50914]"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              DeepScope is researching your question
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Searching the web, analyzing information, and preparing your
              report. This may take a little while.
            </p>
          </div>
        </div>
      )}

      {createError && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4">
          <AlertCircle size={19} className="mt-0.5 text-red-400" />

          <div>
            <p className="text-sm font-semibold text-red-300">
              Research generation failed
            </p>

            <p className="mt-1 text-sm text-neutral-400">{createError}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ResearchInput;
