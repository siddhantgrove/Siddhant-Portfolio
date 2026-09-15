import ExperienceCard from "./ExperienceCard";
import { experience, education } from "../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-x-clip bg-[#f3f4ec] px-5 py-20 text-[#172017] sm:px-8 md:py-28 lg:px-12"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#c6ff6b]/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-between gap-5 border-b border-black/15 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5e9d26]" />

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#66705f]">
              03 — My journey
            </p>
          </div>

          <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-[#66705f] sm:block">
            Experience & education
          </span>
        </div>

        {/* Main heading */}
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <h2 className="text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
            The work.
            <br />

            <span className="font-serif font-normal italic text-[#5e9d26]">
              The learning.
            </span>
          </h2>

          <div className="max-w-md lg:ml-auto lg:pb-2">
            <p className="text-base leading-8 text-[#66705f]">
              A closer look at my professional experience and
              education—the places where I’ve learned, contributed,
              and developed my approach to building for the web.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#5e9d26]" />

              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#526648]">
                Still learning. Still building.
              </span>
            </div>
          </div>
        </div>

        {/* Parallel timelines */}
        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-10">
          <JourneyColumn
            title="Work experience"
            subtitle="Where I’ve contributed"
            number="01"
            items={experience}
            variant="work"
          />

          <JourneyColumn
            title="Education"
            subtitle="The foundation behind the work"
            number="02"
            items={education}
            variant="education"
          />
        </div>

        {/* Closing note */}
        <div className="mt-16 flex items-center gap-4 border-t border-black/15 pt-7">
          <span
            aria-hidden="true"
            className="font-serif text-3xl italic text-[#5e9d26]"
          >
            ↳
          </span>

          <p className="text-sm leading-7 text-[#66705f]">
            Bringing what I learn into every project I build.
          </p>
        </div>
      </div>
    </section>
  );
}

function JourneyColumn({
  title,
  subtitle,
  number,
  items = [],
  variant,
}) {
  const isWork = variant === "work";

  return (
    <div className="min-w-0">
      {/* Column heading */}
      <div
        className={`relative mb-8 overflow-hidden rounded-2xl p-6 sm:p-7 ${
          isWork
            ? "bg-[#172017] text-white"
            : "border border-[#cbd4bf] bg-[#e4ebd9] text-[#172017]"
        }`}
      >
        {/* Decorative number */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-5 right-3 select-none font-serif text-[7rem] italic leading-none ${
            isWork ? "text-white/6" : "text-black/5"
          }`}
        >
          {number}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p
              className={`mb-3 font-mono text-xs uppercase tracking-[0.15em] ${
                isWork ? "text-[#c6ff6b]" : "text-[#526648]"
              }`}
            >
              {subtitle}
            </p>

            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              {title}
            </h3>
          </div>

          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm ${
              isWork
                ? "border-white/20 text-[#c6ff6b]"
                : "border-[#a9ba98] text-[#526648]"
            }`}
          >
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-3.75 top-4 w-px bg-[#c5ceba]"
        />

        <ol role="list" className="relative m-0 list-none space-y-6 p-0">
          {items.map((item, index) => (
            <li
              key={item.id ?? `${variant}-${index}`}
              className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3 sm:gap-5"
            >
              {/* Timeline marker */}
              <span
                aria-hidden="true"
                className={`relative mt-6 grid h-8 w-8 place-items-center rounded-full border-4 border-[#f3f4ec] ${
                  isWork ? "bg-[#5e9d26]" : "bg-[#80936d]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>

              {/* Your existing card */}
              <div className="min-w-0 transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
                <ExperienceCard {...item} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}