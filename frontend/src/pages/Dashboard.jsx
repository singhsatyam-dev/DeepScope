import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Play,
  Sparkles,
  LoaderCircle,
  ExternalLink,
  FileText,
  AlertCircle,
  Trash2,
} from "lucide-react";

import {
  createResearch,
  fetchResearches,
  deleteResearch,
} from "../features/research/researchSlice";

const topics = [
  {
    category: "ARTIFICIAL INTELLIGENCE",
    title: "The Rise of AI Agents",
    description: "How autonomous AI systems are changing the way we work.",
    gradient: "from-red-950 via-[#4a1017] to-[#171717]",
    number: "01",
  },
  {
    category: "TECHNOLOGY",
    title: "The Future of Computing",
    description: "Exploring the next generation of computing technology.",
    gradient: "from-blue-950 via-[#132c48] to-[#171717]",
    number: "02",
  },
  {
    category: "SCIENCE",
    title: "The Universe Explained",
    description: "New discoveries that are reshaping our understanding.",
    gradient: "from-purple-950 via-[#34204c] to-[#171717]",
    number: "03",
  },
  {
    category: "BUSINESS",
    title: "The Future of Startups",
    description: "Emerging trends shaping the global startup ecosystem.",
    gradient: "from-amber-950 via-[#493019] to-[#171717]",
    number: "04",
  },
];

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>

      <button className="hidden items-center gap-1 text-sm text-neutral-400 transition hover:text-white sm:flex">
        Explore all <ArrowRight size={15} />
      </button>
    </div>
  );
}

function Dashboard() {
  const dispatch = useDispatch();

  const {
    researches,
    currentResearch,
    loading,
    creating,
    deleting,
    error,
    createError,
  } = useSelector((state) => state.research);

  const [question, setQuestion] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // Load previous research when dashboard opens.
  useEffect(() => {
    dispatch(fetchResearches());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || creating) return;

    try {
      await dispatch(createResearch(trimmedQuestion)).unwrap();
      setQuestion("");
    } catch (error) {
      console.error("Research generation failed:", error);
    }
  };

  const handleDeleteResearch = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this research? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeleteError("");

    try {
      await dispatch(deleteResearch(id)).unwrap();
    } catch (error) {
      setDeleteError(
        typeof error === "string"
          ? error
          : "Unable to delete research. Please try again.",
      );
    }
  };

  const handleTopicClick = (title) => {
    setQuestion(`Research this topic in detail: ${title}`);

    document.getElementById("research-input")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-[#101010] px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Welcome */}
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E50914]">
            YOUR RESEARCH SPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover something
            <span className="text-neutral-500"> extraordinary.</span>
          </h1>

          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Explore ideas, investigate questions, and uncover insights.
          </p>
        </div>

        {/* Featured Hero */}
        <section className="relative mb-12 min-h-[330px] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-[#390a10] via-[#241013] to-[#171717] sm:min-h-[370px]">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-[#E50914]/20 blur-[100px]" />

          <div className="relative z-10 flex min-h-[330px] max-w-2xl flex-col justify-center p-7 sm:min-h-[370px] sm:p-12">
            <div className="mb-5 flex items-center gap-2">
              <span className="rounded bg-[#E50914] px-2 py-1 text-[10px] font-bold tracking-widest text-white">
                FEATURED
              </span>

              <span className="text-xs font-medium tracking-widest text-neutral-400">
                DEEPSCOPE ORIGINAL
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Knowledge
              <br />
              has no limits.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-neutral-300">
              From emerging technologies to scientific breakthroughs, explore
              the questions that shape our world.
            </p>

            <button
              onClick={() =>
                document.getElementById("research-input")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="mt-7 flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-neutral-200"
            >
              <Play size={16} fill="currentColor" />
              Start Exploring
            </button>
          </div>

          <div className="absolute bottom-7 right-8 hidden text-[150px] font-black leading-none text-white/[0.035] md:block">
            DS
          </div>
        </section>

        {/* Research Input */}
        <section id="research-input" className="mb-14 scroll-mt-24">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#E50914]" />

            <h2 className="text-lg font-bold text-white">
              What are you curious about?
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
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

          {/* Generation Progress */}
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

          {/* Creation Error */}
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

        {/* Latest Research Report */}
        {currentResearch && (
          <section className="mb-14 rounded-2xl border border-white/10 bg-[#181818] p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText size={19} className="text-[#E50914]" />

                <span className="text-sm font-semibold text-white">
                  Latest Research Report
                </span>
              </div>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium capitalize text-green-400">
                {currentResearch.status}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white">
              {currentResearch.question}
            </h2>

            {/* Full Markdown Report */}
            {currentResearch.report ? (
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
                      <p className="mb-4 leading-7 text-neutral-300">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-2 pl-6">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="mb-4 list-decimal space-y-2 pl-6">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="pl-1 text-neutral-300">{children}</li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">
                        {children}
                      </strong>
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
                  {currentResearch.report}
                </ReactMarkdown>
              </article>
            ) : (
              <p className="mt-5 text-sm text-neutral-500">
                Report content is not available in this research record.
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
              <span className="text-xs text-neutral-500">
                {currentResearch.sources?.length || 0} research sources
              </span>

              <Link
                to={`/research/${currentResearch.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Open Full Report
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Sources */}
            {currentResearch.sources?.length > 0 && (
              <div className="mt-7 border-t border-white/[0.08] pt-5">
                <h3 className="mb-4 text-sm font-bold text-white">
                  Sources ({currentResearch.sources.length})
                </h3>

                <div className="space-y-3">
                  {currentResearch.sources.map((source) => (
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

                      <ExternalLink
                        size={15}
                        className="shrink-0 text-neutral-500"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Trending Research */}
        <section className="mb-14">
          <SectionHeading
            title="Trending Research"
            subtitle="Explore topics worth investigating"
          />

          <div className="flex gap-4 overflow-x-auto pb-4">
            {topics.map((topic) => (
              <button
                key={topic.number}
                onClick={() => handleTopicClick(topic.title)}
                className="group min-w-[245px] flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-[#191919] text-left transition hover:-translate-y-1 hover:border-white/20 sm:min-w-[270px]"
              >
                <div
                  className={`relative flex h-36 items-end overflow-hidden bg-gradient-to-br ${topic.gradient} p-5`}
                >
                  <span className="absolute right-3 top-0 text-8xl font-black text-white/[0.07]">
                    {topic.number}
                  </span>

                  <span className="relative rounded bg-black/30 px-2 py-1 text-[9px] font-bold tracking-widest text-white/80">
                    {topic.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-white transition group-hover:text-[#E50914]">
                    {topic.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
                    {topic.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Research History */}
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

              <p className="text-sm font-semibold text-white">
                No research yet
              </p>

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
                  {/* Research information */}
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

                  {/* Actions */}
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
                      onClick={() => handleDeleteResearch(item.id)}
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

        <footer className="mt-16 border-t border-white/[0.07] pt-6 text-center text-xs text-neutral-600">
          DeepScope · Go beyond the surface.
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
