import { useId, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaRobot,
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiAppwrite,
  SiVercel,
  SiRedux,
  SiHtml5 
} from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB",
    category: "Frontend",
    description:
      "Turning interface ideas into reusable components and responsive, interactive experiences.",
    uses: ["Component architecture", "State & hooks", "Interactive interfaces"],
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#8CC84B",
    category: "Backend",
    description:
      "Building server-side functionality that connects the interface to the logic behind it.",
    uses: ["Server-side JavaScript", "API development", "Backend services"],
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "#E8EDE4",
    category: "Backend",
    description:
      "Organizing routes, middleware, and request handling for web applications.",
    uses: ["REST endpoints", "Middleware", "Request handling"],
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#70D15B",
    category: "Database",
    description:
      "Working with document-based data to support the content and features an application needs.",
    uses: ["Document data", "CRUD operations", "Application storage"],
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#38BDF8",
    category: "Styling",
    description:
      "Building consistent layouts with careful spacing, responsive behavior, and reusable visual patterns.",
    uses: ["Responsive layouts", "Design consistency", "UI styling"],
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "Language",
    description:
      "The logic behind the experience—from small interactions to asynchronous data flows.",
    uses: ["Browser interactions", "Async operations", "Application logic"],
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "#F0F3EA",
    category: "Workflow",
    description:
      "Keeping projects organized through repositories, version history, and collaboration.",
    uses: ["Source control", "Project repositories", "Collaboration"],
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "#B59AF4",
    category: "State management",
    description:
      "Managing shared application state when several parts of an interface need to stay in sync.",
    uses: ["Shared state", "Predictable updates", "Data flow"],
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#FFD467",
    category: "Language",
    description:
      "Using readable scripts to explore ideas, process data, and automate repetitive tasks.",
    uses: ["Scripting", "Automation", "Data handling"],
  },
  {
    name: "OpenAI",
    icon: FaRobot,
    color: "#91E6C0",
    category: "AI integration",
    description:
      "Exploring AI-powered features that make web experiences more useful and interactive.",
    uses: ["AI-assisted features", "API integration", "Conversational interfaces"],
  },
  {
    name: "Appwrite",
    icon: SiAppwrite,
    color: "#FD668D",
    category: "Backend platform",
    description:
      "Connecting applications to authentication, databases, and file storage.",
    uses: ["Authentication", "Database services", "File storage"],
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#F0F3EA",
    category: "Deployment",
    description:
      "Taking frontend projects from a local development environment to an accessible web deployment.",
    uses: ["Frontend hosting", "Preview deployments", "Production releases"],
  },
  {
    name: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
    category: "Language",
    description:
      "The structure and semantics of the content of a web page.",
    uses: ["HTML structure", "Semantic tags", "Accessibility"],
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const buttonRefs = useRef([]);
  const detailId = useId();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  const reducedMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    amount: 0.15,
  });

  const rotation = useMotionValue(0);

  // Keep the icons upright while their positions rotate.
  const counterRotation = useTransform(
    rotation,
    (value) => -value
  );

  const selected = skills[selectedIndex];
  const SelectedIcon = selected.icon;

  const canRotate =
    inView &&
    !paused &&
    !hovered &&
    !focusWithin &&
    reducedMotion === false;

  useAnimationFrame((_, delta) => {
    if (!canRotate) return;

    // Clamp the frame delta to prevent jumps after switching tabs.
    rotation.set(
      (rotation.get() + Math.min(delta, 40) * 0.009) % 360
    );
  });

  const selectSkill = (index) => {
    const next = (index + skills.length) % skills.length;

    setSelectedIndex(next);
    setPaused(true);
  };

  const handleKeyDown = (event, index) => {
    let next;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % skills.length;
    } else if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp"
    ) {
      next = (index - 1 + skills.length) % skills.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = skills.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectSkill(next);
    buttonRefs.current[next]?.focus();
  };

  const notes = JSON.stringify(
    {
      technology: selected.name,
      focus: selected.category,
      useCases: selected.uses,
    },
    null,
    2
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-x-clip bg-[#101510] px-5 py-20 text-[#edf2e9] sm:px-8 md:py-28 lg:px-12"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-[#c6ff6b]/5 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-between gap-5 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#c6ff6b]" />

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a6b5a0]">
              My developer toolkit
            </p>
          </div>

          <span className="hidden font-mono text-xs text-[#a6b5a0] sm:block">
            {skills.length} TOOLS / ONE BUILDER
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h2 className="text-[clamp(3rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em]">
            Different tools.
            <br />

            <span className="font-serif italic text-[#c6ff6b]">
              Connected thinking.
            </span>
          </h2>

          <p className="max-w-sm text-base leading-8 text-[#a6b5a0]">
            Explore the technologies behind my work. Select a tool
            to see where it fits into the things I build.
          </p>
        </div>

        {/* Interactive workspace */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ORBIT */}
          <div className="min-w-0">
            <div
              className="relative mx-auto aspect-square w-full max-w-155"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  setHovered(true);
                }
              }}
              onPointerLeave={() => setHovered(false)}
              onFocusCapture={() => setFocusWithin(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setFocusWithin(false);
                }
              }}
            >
              {/* Orbit tracks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[12%] rounded-full border border-white/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[25%] rounded-full border border-dashed border-white/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[35%] rounded-full bg-[#c6ff6b]/5 blur-xl"
              />

              {/* Rotating skill positions */}
              <motion.div
                style={{ rotate: rotation }}
                className="absolute inset-0"
              >
                {/* Connection from selected tool to the hub */}
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <line
                    x1="50"
                    y1="50"
                    x2={
                      50 +
                      Math.cos(
                        (selectedIndex / skills.length) * Math.PI * 2 -
                          Math.PI / 2
                      ) *
                        38
                    }
                    y2={
                      50 +
                      Math.sin(
                        (selectedIndex / skills.length) * Math.PI * 2 -
                          Math.PI / 2
                      ) *
                        38
                    }
                    stroke={selected.color}
                    strokeWidth="0.25"
                    strokeDasharray="1 1.5"
                    opacity="0.65"
                  />
                </svg>

                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  const isSelected = selectedIndex === index;

                  const angle =
                    (index / skills.length) * Math.PI * 2 -
                    Math.PI / 2;

                  const left = 50 + Math.cos(angle) * 38;
                  const top = 50 + Math.sin(angle) * 38;

                  return (
                    <div
                      key={skill.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                      }}
                    >
                      <motion.button
                        ref={(element) => {
                          buttonRefs.current[index] = element;
                        }}
                        type="button"
                        title={skill.name}
                        aria-label={`Explore ${skill.name}`}
                        aria-pressed={isSelected}
                        aria-controls={detailId}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => selectSkill(index)}
                        onKeyDown={(event) =>
                          handleKeyDown(event, index)
                        }
                        style={{
                          rotate: counterRotation,
                          color: skill.color,
                        }}
                        whileHover={
                          reducedMotion ? undefined : { scale: 1.12 }
                        }
                        whileTap={
                          reducedMotion ? undefined : { scale: 0.95 }
                        }
                        className={`relative grid h-12 w-12 place-items-center rounded-2xl border text-2xl shadow-lg outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-[#c6ff6b] sm:h-16 sm:w-16 sm:text-3xl ${
                          isSelected
                            ? "border-[#c6ff6b] bg-[#25311f] shadow-[#c6ff6b]/10"
                            : "border-[#374330] bg-[#1a2318] hover:border-[#768969]"
                        }`}
                      >
                        <Icon aria-hidden="true" />

                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#101510] bg-[#c6ff6b]"
                          />
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>

              {/* Stationary center */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#46583c] bg-[#172015] shadow-2xl sm:h-40 sm:w-40"
              >
                <SelectedIcon
                  className="text-3xl sm:text-5xl"
                  style={{ color: selected.color }}
                />

                <span className="mt-3 text-sm font-medium sm:text-lg">
                  {selected.name}
                </span>

                <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-widest text-[#91a485] sm:block">
                  In my toolkit
                </span>
              </div>
            </div>

            {/* Orbit controls */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <p className="text-xs leading-5 text-[#a6b5a0]">
                Select a tool.
                <br />
                Arrow keys work here too.
              </p>

              <button
                type="button"
                disabled={Boolean(reducedMotion)}
                onClick={() => setPaused((value) => !value)}
                className="rounded-full border border-white/20 px-4 py-2 text-xs text-[#d7e2cf] transition-colors hover:border-[#c6ff6b] hover:text-[#c6ff6b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff6b] disabled:cursor-default disabled:opacity-50"
              >
                {reducedMotion
                  ? "Reduced motion enabled"
                  : paused
                    ? "Resume orbit ↻"
                    : "Pause orbit Ⅱ"}
              </button>
            </div>
          </div>

          {/* DETAIL PANEL */}
          <div
            id={detailId}
            className="min-w-0 overflow-hidden rounded-3xl border border-[#35422e] bg-[#172015]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div
                className="flex items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-[#c6ff6b]" />
                <span className="h-2 w-2 rounded-full bg-[#586b4c]" />
                <span className="h-2 w-2 rounded-full bg-[#35452d]" />
              </div>

              <span className="font-mono text-xs text-[#a6b5a0]">
                toolkit / inspect
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.name}
                initial={{
                  opacity: 0,
                  y: reducedMotion ? 0 : 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reducedMotion ? 0 : -8,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.18,
                }}
                className="p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-[#10180e] text-3xl"
                    style={{ color: selected.color }}
                  >
                    <SelectedIcon aria-hidden="true" />
                  </div>

                  <span className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-[#a6b5a0]">
                    {selected.category}
                  </span>
                </div>

                <h3 className="mt-6 text-4xl font-medium tracking-tighter">
                  {selected.name}
                </h3>

                <p className="mt-4 min-h-28 text-base leading-7 text-[#a6b5a0]">
                  {selected.description}
                </p>

                {/* Code-style notes */}
                <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#0c120b]">
                  <div className="border-b border-white/10 px-4 py-3 font-mono text-xs text-[#91a485]">
                    tool-notes.json
                  </div>

                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-7 text-[#c6ff6b]">
                    <code>{notes}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Manual navigation */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
              <span className="font-mono text-xs tabular-nums text-[#a6b5a0]">
                {String(selectedIndex + 1).padStart(2, "0")}
                {" / "}
                {String(skills.length).padStart(2, "0")}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous technology"
                  onClick={() => selectSkill(selectedIndex - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-lg transition-colors hover:bg-[#c6ff6b] hover:text-[#101510] focus-visible:outline focus-visible:outline-[#c6ff6b]"
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Next technology"
                  onClick={() => selectSkill(selectedIndex + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-lg transition-colors hover:bg-[#c6ff6b] hover:text-[#101510] focus-visible:outline focus-visible:outline-[#c6ff6b]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accessible selection announcement */}
        <p className="sr-only" role="status">
          Selected technology: {selected.name}. {selected.category}.
        </p>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm leading-7 text-[#a6b5a0]">
          The tools are different. The goal stays the same:
          <span className="ml-1 text-[#edf2e9]">
            build something useful, reliable, and enjoyable to use.
          </span>
        </p>
      </div>
    </section>
  );
}