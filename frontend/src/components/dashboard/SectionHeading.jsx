import { ArrowRight } from "lucide-react";

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default SectionHeading;
