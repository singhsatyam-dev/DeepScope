import { Play } from "lucide-react";

function FeaturedHero() {
  const handleExplore = () => {
    document.getElementById("research-input")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
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
          From emerging technologies to scientific breakthroughs, explore the
          questions that shape our world.
        </p>

        <button
          onClick={handleExplore}
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
  );
}

export default FeaturedHero;
