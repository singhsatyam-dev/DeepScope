import SectionHeading from "./SectionHeading";

function TrendingResearch({ topics, onTopicClick }) {
  return (
    <section className="mb-14">
      <SectionHeading
        title="Trending Research"
        subtitle="Explore topics worth investigating"
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {topics.map((topic) => (
          <button
            key={topic.number}
            onClick={() => onTopicClick(topic.title)}
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
  );
}

export default TrendingResearch;
