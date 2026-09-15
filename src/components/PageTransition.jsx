import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const routeDetails = {
  Home: { number: "01", path: "/home", note: "Back where the story begins." },
  About: { number: "02", path: "/about", note: "Loading the human behind the code." },
  Skills: { number: "03", path: "/skills", note: "Opening the developer toolbox." },
  Projects: { number: "04", path: "/projects", note: "Fetching the interesting experiments." },
  Services: { number: "05", path: "/services", note: "Turning ideas into a useful scope." },
  Contact: { number: "06", path: "/contact", note: "Reducing the distance between hello and hired." },
};

export default function PageTransition({ show, title = "Next" }) {
  const reduceMotion = useReducedMotion();
  const page = routeDetails[title] || {
    number: "00",
    path: `/${String(title).toLowerCase().replace(/\s+/g, "-")}`,
    note: "Taking you somewhere interesting.",
  };
  const letters = Array.from(title);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={title}
          role="status"
          aria-live="polite"
          aria-label={`Navigating to ${title}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-9999 isolate overflow-hidden bg-[#172017] text-white"
        >
          {/* Two shutters */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : "-100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[#c6ff6b]"
          />
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[#172017]"
          />

          {/* Technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Oversized background typography */}
          <motion.p
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 0.055, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="absolute left-1/2 top-1/2 w-[140vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-[clamp(8rem,28vw,28rem)] font-black uppercase leading-none tracking-[-0.08em] text-white"
          >
            {title}
          </motion.p>

          {/* Moving scanner */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ left: "-4%" }}
              animate={{ left: "104%" }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute inset-y-0 w-px bg-white/70 shadow-[0_0_35px_8px_rgba(198,255,107,.35)]"
            />
          )}

          <div className="relative flex h-full flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
            {/* Top system bar */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.22, duration: 0.25 }}
              className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px]"
            >
              <span className="flex items-center gap-2 text-[#172017] mix-blend-difference">
                <span className="h-2 w-2 rounded-full bg-white" />
                SG / Route sequence
              </span>
              <span className="text-white/65">Destination {page.number}</span>
            </motion.div>

            {/* Main card */}
            <div className="flex flex-1 items-center justify-center py-10">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -20, scale: reduceMotion ? 1 : 1.03 }}
                transition={{ delay: reduceMotion ? 0 : 0.18, duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#172017]/90 shadow-[0_30px_100px_-35px_rgba(0,0,0,.7)] backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 sm:px-7">
                  <span className="flex items-center gap-2">
                    <i className="h-2 w-2 rounded-full bg-red-400" />
                    <i className="h-2 w-2 rounded-full bg-amber-300" />
                    <i className="h-2 w-2 rounded-full bg-[#c6ff6b]" />
                    <span className="ml-2">portfolio.navigator</span>
                  </span>
                  <span>{page.path}</span>
                </div>

                <div className="px-5 py-9 text-center sm:px-8 sm:py-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c6ff6b]">
                    &gt; opening_next_chapter
                  </p>

                  <h1 className="sr-only">{title}</h1>
                  <div aria-hidden="true" className="mt-5 flex flex-wrap justify-center overflow-hidden">
                    {letters.map((letter, index) => (
                      <motion.span
                        key={`${letter}-${index}`}
                        initial={reduceMotion ? false : { opacity: 0, y: 70, rotate: 5 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -55 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.23 + index * 0.035,
                          duration: reduceMotion ? 0 : 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-[-0.065em]"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </div>

                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.46, duration: 0.25 }}
                    className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/60"
                  >
                    {page.note}
                  </motion.p>
                </div>

                {/* This bar represents the fixed route-transition duration, not page loading. */}
                <div className="h-1 overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ scaleX: reduceMotion ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
                    className="h-full origin-left bg-[#c6ff6b]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom status */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.35 }}
              className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55"
            >
              <span>Build · Debug · Refine</span>
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff6b] opacity-60 motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-[#c6ff6b]" />
                </span>
                Siddhant is navigating
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
