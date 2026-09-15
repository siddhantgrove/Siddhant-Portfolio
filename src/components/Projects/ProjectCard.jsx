import { motion } from "motion/react";

export default function ProjectCard({
  project,
  index = 0,
  progress = 0,
}) {
  // Skip rendering until project data is available.
  if (!project) return null;

  const {
    number = String(index + 1).padStart(2, "0"),
    image,
    title = "Untitled Project",
    category = "",
    description = "",
  } = project;

  const technologies = Array.isArray(project.tech) ? project.tech : [];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 10 - index }}
    >
      <motion.div
        className="relative w-full max-w-5xl"
        style={{ y: progress, scale: 1 }}
      >
        {/* BIG NUMBER */}
        <div className="pointer-events-none absolute -left-4 -top-32 select-none text-[10rem] font-black leading-none text-slate-100 md:text-[14rem]">
          {number}
        </div>

        {/* IMAGE */}
        <motion.div
          className="relative mx-auto aspect-video w-full overflow-hidden rounded-4xl bg-slate-900 shadow-2xl"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.5 }}
        >
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-amber-950">
              {/* Tech grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[100px]" />

              <div className="relative text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-amber-400">
                  Project Preview
                </p>

                <h3 className="text-4xl font-black text-white md:text-6xl">
                  {title}
                </h3>
              </div>
            </div>
          )}

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

          {/* Project number */}
          <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-md">
            {number}
          </div>
        </motion.div>

        {/* INFORMATION */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-amber-500">
              {category}
            </p>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              {title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
              {description}
            </p>
          </div>

          {/* TECH */}
          <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
            {technologies.map((tech, techIndex) => (
              <span
                key={`${tech}-${techIndex}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}