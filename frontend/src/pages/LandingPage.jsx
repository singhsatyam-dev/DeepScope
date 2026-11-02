import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  TrendingUp,
  Zap,
  Layers3,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const trendingTopics = [
  "The impact of AI agents on future work",
  "Latest breakthroughs in space exploration",
  "How is quantum computing evolving?",
  "Trends in the global startup ecosystem",
];

const features = [
  {
    icon: Zap,
    title: "In-depth Research",
    description: "Multi-source analysis with credible information.",
  },
  {
    icon: Layers3,
    title: "Structured Reports",
    description: "Clear, comprehensive and easy to read.",
  },
  {
    icon: Clock3,
    title: "Save Your Research",
    description: "Access and manage your research history anytime.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Transparent",
    description: "Cited sources so you can explore deeper.",
  },
];

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#101010] text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-52 h-[550px] w-[550px] rounded-full bg-[#E50914]/15 blur-[150px]" />
        <div className="absolute -right-40 top-0 h-[650px] w-[650px] rounded-full bg-red-950/40 blur-[130px]" />
        <div className="absolute bottom-[-350px] right-[-100px] h-[650px] w-[650px] rounded-full bg-[#E50914]/10 blur-[150px]" />

        <div className="absolute -bottom-80 -left-40 h-[600px] w-[600px] rounded-full border border-[#E50914]/30 shadow-[0_0_100px_rgba(229,9,20,0.12)]" />
        <div className="absolute -bottom-72 -left-32 h-[570px] w-[570px] rounded-full border border-red-500/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col px-6 py-7 sm:px-10 lg:px-16">
        {/* Logo */}
        <header>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_30px_rgba(229,9,20,0.3)]">
              <Search size={29} strokeWidth={2.8} />
            </div>

            <span className="text-3xl font-bold tracking-tight">
              Deep<span className="text-[#E50914]">Scope</span>
            </span>
          </Link>
        </header>

        {/* Hero */}
        <section className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-12">
          {/* Left content */}
          <div className="relative z-10 max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/[0.06] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E50914] shadow-[0_0_12px_#E50914]" />
              <span className="text-xs font-semibold tracking-wide text-neutral-200 sm:text-sm">
                AI RESEARCH PLATFORM
              </span>
            </div>

            <h1 className="text-5xl leading-[1.08] font-bold tracking-tight sm:text-6xl xl:text-7xl">
              Turn Questions into
              <span className="mt-1 block bg-gradient-to-r from-[#ff303b] to-[#d90012] bg-clip-text text-transparent">
                Deep Research
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              AI-powered research that goes beyond simple answers. Get
              comprehensive, structured, and well-sourced reports on any topic.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-[#ed101c] to-[#c9000d] px-9 py-4 text-base font-semibold shadow-[0_8px_35px_rgba(229,9,20,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_rgba(229,9,20,0.4)]"
              >
                Get Started
                <ArrowRight
                  size={21}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.025] px-10 py-4 font-semibold transition hover:border-red-500/60 hover:bg-red-500/10"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Right research preview */}
          <div className="relative flex items-center justify-center lg:min-h-[460px]">
            {/* Globe-inspired visual made with CSS */}
            <div className="pointer-events-none absolute right-[-8%] top-1/2 aspect-square w-[90%] -translate-y-1/2 rounded-full border border-red-500/20 bg-[radial-gradient(circle_at_35%_30%,rgba(239,68,68,0.3),rgba(100,0,0,0.13)_38%,rgba(10,10,10,0.8)_72%)] shadow-[0_0_100px_rgba(229,9,20,0.2)]">
              <div className="absolute inset-3 rounded-full border border-red-500/15" />
              <div className="absolute inset-[12%] rounded-full border border-red-500/10" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_25%_20%,rgba(255,70,70,0.28),transparent_42%)]" />
            </div>

            <div className="relative z-10 w-full max-w-[650px] rounded-2xl border border-red-400/30 bg-[#171010]/85 p-6 shadow-[0_25px_100px_rgba(229,9,20,0.16)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3">
                <Search className="shrink-0 text-neutral-400" size={23} />

                <span className="flex-1 text-sm text-neutral-300 sm:text-base">
                  What do you want to research today?
                </span>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                  <ArrowRight size={23} />
                </div>
              </div>

              <div className="mt-7 space-y-0">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-4 border-b border-white/[0.07] py-4 last:border-0"
                  >
                    <TrendingUp
                      size={20}
                      className="shrink-0 text-neutral-400"
                    />
                    <span className="text-sm text-neutral-200 sm:text-base">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Explore ideas worth researching
              </div>
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="grid grid-cols-1 gap-8 border-t border-white/[0.08] py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 lg:block">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/[0.09] text-[#ff343f] shadow-[0_0_25px_rgba(229,9,20,0.1)] lg:mb-4">
                <Icon size={29} strokeWidth={2.2} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <p className="mt-2 max-w-[260px] text-sm leading-6 text-neutral-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
