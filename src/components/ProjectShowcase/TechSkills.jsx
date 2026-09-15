import { useEffect, useRef, useState } from "react";
import "./TechSkills.css";

/* Replace these details when you want to feature another project. */
const featuredProject = {
  title: "Interface Lab",
  description:
    "The experience you just explored: a scroll-driven React interface with interactive filters, simulated API states, and responsive previews.",
  tags: ["React", "CSS", "JavaScript", "No animation library"],
  liveUrl: "",
  githubUrl: "",
};

const steps = [
  {
    label: "Structure",
    tool: "HTML",
    title: "Start with the bones.",
    description:
      "Semantic structure gives the interface a clear, accessible foundation.",
    filename: "index.html",
    code: `<main>
  <header>
    <h1>Ideas made interactive.</h1>
  </header>

  <nav aria-label="Project filters">
    <!-- Category controls -->
  </nav>

  <section aria-label="Projects">
    <!-- Project collection -->
  </section>
</main>`,
  },
  {
    label: "Style",
    tool: "CSS / Tailwind",
    title: "Give it a personality.",
    description:
      "Color, typography, spacing, and hierarchy turn a structure into an experience.",
    filename: "interface.css",
    code: `.portfolio {
  background: #f2f4eb;
  color: #172017;
}

.projects {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 16px;
}`,
  },
  {
    label: "React",
    tool: "JavaScript / React",
    title: "Make it respond.",
    description:
      "Try All, Apps, and Websites. These filters use real React state.",
    filename: "Projects.jsx",
    code: `const [filter, setFilter] = useState("All");

const visible = projects.filter((project) =>
  filter === "All" || project.category === filter
);

return visible.map((project) => (
  <ProjectCard
    key={project.id}
    project={project}
  />
));`,
  },
  {
    label: "UI states",
    tool: "Loading / Empty / Error / Success",
    title: "The happy path isn’t enough.",
    description:
      "Keep scrolling through simulated loading, empty, error, and successful results.",
    filename: "RequestState.jsx",
    code: `if (status === "loading") {
  return <ProjectSkeleton />;
}

if (status === "error") {
  return <ErrorMessage onRetry={retry} />;
}

if (projects.length === 0) {
  return <EmptyState />;
}

return <ProjectGrid projects={projects} />;`,
  },
  {
    label: "Debug",
    tool: "Inspect / Understand / Fix",
    title: "Find the real problem.",
    description:
      "The project grid starts wider than its container. Scroll to bring it back into bounds.",
    filename: "layout-fix.css",
    code: `/* Before: wider than the available space */
.projects {
  width: calc(100% + 150px);
}

/* After: respect the container */
.projects {
  width: 100%;
  min-width: 0;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
}`,
  },
  {
    label: "Responsive",
    tool: "Desktop / Mobile",
    title: "One idea. Different screens.",
    description:
      "The same content adapts to a smaller layout without losing its hierarchy.",
    filename: "responsive.css",
    code: `.projects {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
}

@media (max-width: 600px) {
  .projects {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}`,
  },
  {
    label: "The project",
    tool: "From individual skills to a complete experience",
    title: "Now put it all together.",
    description:
      "A working interface says more than a list of technologies. You’re already inside this project.",
    filename: "project-notes.md",
    code: `INTERFACE LAB

• Scroll-driven transformations
• Working React filters
• Simulated request states
• A visible layout-debugging sequence
• Desktop and mobile previews
• Reduced-motion fallback

Built with React, CSS, and JavaScript.`,
  },
];

const projects = [
  {
    id: "weather",
    title: "Weather interface",
    category: "Apps",
    detail: "A clear view of the forecast.",
    symbol: "☀",
    color: "peach",
  },
  {
    id: "studio",
    title: "Studio portfolio",
    category: "Websites",
    detail: "A space for ideas and work.",
    symbol: "↗",
    color: "purple",
  },
  {
    id: "clock",
    title: "World clock",
    category: "Apps",
    detail: "Different places. Shared time.",
    symbol: "◷",
    color: "green",
  },
];

const requestStates = ["loading", "empty", "error", "success"];
const clamp = (value) => Math.min(1, Math.max(0, value));

export default function TechSkills() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(null);
  const distanceRef = useRef(0);

  const [filter, setFilter] = useState("All");
  const [retryComplete, setRetryComplete] = useState(false);

  const [view, setView] = useState({
    phase: 0,
    status: "success",
    staticMode: false,
    fixed: false,
  });

  const { phase, status, staticMode, fixed } = view;

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;

    if (!section || !scene) return;

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-height: 520px)"
    );

    let frame = 0;

    const render = () => {
      frame = 0;

      const progress = media.matches
        ? 1
        : clamp(
            -section.getBoundingClientRect().top /
              Math.max(1, distanceRef.current)
          );

      // Each stage has a full segment, including the final reveal.
      const position = progress * steps.length;
      const nextPhase = Math.min(
        steps.length - 1,
        Math.floor(position)
      );

      const skin = clamp((position - 1) / 0.65);
      const logic = clamp((position - 2) / 0.65);
      const deploy = clamp((position - 5) / 0.75);
      const reveal = clamp((position - 6) / 0.6);

      const fix =
        nextPhase === 4
          ? clamp((position - 4.3) / 0.55)
          : 1;

      const nextStatus =
        nextPhase === 3
          ? requestStates[
              Math.min(3, Math.floor((position - 3) * 4))
            ]
          : "success";

      scene.style.setProperty("--skin", String(skin));
      scene.style.setProperty("--logic", String(logic));
      scene.style.setProperty("--deploy", String(deploy));
      scene.style.setProperty("--reveal", String(reveal));
      scene.style.setProperty("--fix", String(fix));

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const nextView = {
        phase: nextPhase,
        status: nextStatus,
        staticMode: media.matches,
        fixed: fix > 0.98,
      };

      setView((previous) =>
        previous.phase === nextView.phase &&
        previous.status === nextView.status &&
        previous.staticMode === nextView.staticMode &&
        previous.fixed === nextView.fixed
          ? previous
          : nextView
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const measure = () => {
      const perStage = Math.max(440, scene.clientHeight * 0.8);

      distanceRef.current = media.matches
        ? 0
        : steps.length * perStage;

      section.style.setProperty(
        "--scroll-distance",
        `${distanceRef.current}px`
      );

      schedule();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(scene);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);

    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, []);

  // Leaving the error state resets the simulated retry.
  useEffect(() => {
    setRetryComplete(false);
  }, [phase, status]);

  const goToStep = (index) => {
    if (!sectionRef.current || staticMode) return;

    const start =
      sectionRef.current.getBoundingClientRect().top +
      window.scrollY;

    // Land after the stage's visual entrance.
    const position = index === 0 ? 0 : index + 0.7;

    window.scrollTo({
      top:
        start +
        (position / steps.length) * distanceRef.current,
      behavior: "smooth",
    });
  };

  const visibleProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  const displayStatus =
    phase === 3 && !retryComplete ? status : "success";

  const filtersEnabled =
    phase >= 2 && phase < 6 && displayStatus === "success";

  return (
    <div className="build-story">
      <header className="build-intro">
        <div className="build-intro-top">
          <span className="build-brand">
            siddhant<span>.dev</span>
          </span>

          <span className="build-mono">
            FRONTEND / ALWAYS ITERATING
          </span>
        </div>

        <p className="build-eyebrow">
          STRUCTURE. PERSONALITY. A FEW BUGS ALONG THE WAY.
        </p>

        <h1>
          Don’t just read the stack.
          <br />
          <span>Watch it work.</span>
        </h1>

        <div className="build-intro-bottom">
          <p>
            From an empty wireframe to a working experience.
            Scroll through the decisions behind the interface.
          </p>

          <span className="build-scroll-label">
            SEVEN STAGES. ONE BUILD. ↓
          </span>
        </div>
      </header>

      <section
        ref={sectionRef}
        className="build-scroll"
        aria-label="How I build an interface"
      >
        <div
          ref={sceneRef}
            id="tech-skills"
          className="build-scene"
          data-phase={phase}
        >
          <div className="build-scene-header">
            <span>
              <i className="build-status-dot" />
              INTERFACE LAB
            </span>

            <span className="build-mono">
              {String(phase + 1).padStart(2, "0")} / 07
            </span>
          </div>

          <div className="build-stage">
            <aside className="build-sidebar">
              <p className="build-eyebrow">
                FROM IDEA TO EXPERIENCE
              </p>

              <h2>
                Build it.
                <br />
                <span>Think it through.</span>
              </h2>

              <nav
                className="build-steps"
                aria-label="Jump to a build stage"
              >
                {steps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => goToStep(index)}
                    disabled={staticMode}
                    className={phase === index ? "is-active" : ""}
                    aria-current={phase === index ? "step" : undefined}
                    aria-label={`${index + 1}. ${step.label}`}
                  >
                    <span className="build-step-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="build-step-name">
                      {step.label}
                    </span>

                    <span className="build-step-marker" aria-hidden="true">
                      {index < phase ? "✓" : "↗"}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="build-explanation">
                <span className="build-tool">
                  {steps[phase].tool}
                </span>
                <h3>{steps[phase].title}</h3>
                <p>{steps[phase].description}</p>
              </div>
            </aside>

            <div className="build-lab">
              <div className="build-device-stage">
                <div
                  className="build-browser"
                  aria-hidden={phase === 6}
                >
                  <div className="build-browser-bar">
                    <div
                      className="build-window-dots"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                      <i />
                    </div>

                    <span>portfolio.preview</span>
                    <span className="build-preview-tag">DEMO</span>
                  </div>

                  <div className="build-browser-body">
                    <Wireframe />

                    <div className="build-site">
                      <div className="build-site-nav">
                        <span className="build-site-logo">
                          s<span>.</span>
                        </span>
                        <span>DESIGN + DEVELOPMENT</span>
                      </div>

                      <div className="build-site-heading">
                        <span className="build-site-eyebrow">
                          A SMALL COLLECTION OF POSSIBILITIES
                        </span>

                        <h3>
                          Ideas made
                          <br />
                          <em>interactive.</em>
                        </h3>

                        <p>Useful interfaces. A little personality.</p>
                      </div>

                      <div
                        className="build-filters"
                        role="group"
                        aria-label="Filter sample projects"
                      >
                        {["All", "Apps", "Websites"].map((category) => (
                          <button
                            key={category}
                            type="button"
                            disabled={!filtersEnabled}
                            aria-pressed={filter === category}
                            onClick={() => setFilter(category)}
                            className={
                              filter === category ? "selected" : ""
                            }
                          >
                            {category}
                          </button>
                        ))}

                        <span className="build-react-indicator">
                          <i />
                          React state
                        </span>
                      </div>

                      {phase === 3 && (
                        <div className="build-state-label">
                          SIMULATED REQUEST / {displayStatus.toUpperCase()}
                        </div>
                      )}

                      {phase === 4 && (
                        <div
                          className={`build-debug-note ${
                            fixed ? "is-fixed" : ""
                          }`}
                        >
                          <span>{fixed ? "✓" : "!"}</span>
                          {fixed
                            ? "Fixed: grid fits its container."
                            : "Layout bug: the grid is too wide."}
                        </div>
                      )}

                      <RequestPreview
                        status={displayStatus}
                        projects={visibleProjects}
                        onRetry={() => setRetryComplete(true)}
                      />
                    </div>
                  </div>
                </div>

                <MobilePreview projects={visibleProjects} />

                <div
                  className="build-responsive-label"
                  aria-hidden="true"
                >
                  ↔ SAME CONTENT. DIFFERENT SCREEN.
                </div>

                {/* FINAL PROJECT REVEAL */}
                <div
                  className="build-project-reveal"
                  aria-hidden={phase !== 6}
                >
                  <span className="build-reveal-kicker">
                    THE PROJECT BEHIND THE PROCESS
                  </span>

                  <div className="build-reveal-symbol" aria-hidden="true">
                    {"</>"}
                  </div>

                  <h3>{featuredProject.title}</h3>
                  <p>{featuredProject.description}</p>

                  <div className="build-reveal-tags">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="build-reveal-actions">
                    {!staticMode && (
                      <button
                        type="button"
                        onClick={() => goToStep(0)}
                        tabIndex={phase === 6 ? 0 : -1}
                      >
                        Replay the build <span>↺</span>
                      </button>
                    )}

                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={phase === 6 ? 0 : -1}
                      >
                        Live project ↗
                      </a>
                    )}

                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={phase === 6 ? 0 : -1}
                      >
                        Source code ↗
                      </a>
                    )}
                  </div>

                  <span className="build-reveal-footnote">
                    BUILT WITH REACT, CSS & CURIOSITY.
                  </span>
                </div>
              </div>

              <div className="build-code-window">
                <div className="build-code-bar">
                  <span>{steps[phase].filename}</span>
                  <span>ILLUSTRATIVE SOURCE</span>
                </div>

                <pre>
                  <code>{steps[phase].code}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="build-scene-footer">
            <span>SCROLL TO TRANSFORM ↓</span>

            <div className="build-progress-track">
              <div
                ref={progressRef}
                className="build-progress-fill"
              />
            </div>

            <span>
              {phase === 2
                ? "TRY THE FILTERS ↑"
                : phase === 4
                  ? "BREAK → INSPECT → FIX"
                  : "BUILD. DEBUG. REFINE."}
            </span>
          </div>
        </div>
      </section>

      <footer className="build-outro">
        <p className="build-eyebrow">
          THE TOOLS ARE ONLY THE BEGINNING.
        </p>

        <h2>
          The details are
          <br />
          <span>where I get interested.</span>
        </h2>
      </footer>
    </div>
  );
}

/* ========================
   WIREFRAME
======================== */

function Wireframe() {
  return (
    <div className="build-wireframe" aria-hidden="true">
      <div className="build-wire-nav">
        <span>LOGO</span>
        <span>NAVIGATION</span>
      </div>

      <div className="build-wire-heading">
        <small>&lt;header&gt;</small>
        <div />
        <div />
        <span />
      </div>

      <div className="build-wire-filters">
        <span />
        <span />
        <span />
      </div>

      <div className="build-wire-grid">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <span>PROJECT {item}</span>
          </div>
        ))}
      </div>

      <span className="build-wire-caption">
        &lt;section aria-label="Projects"&gt;
      </span>
    </div>
  );
}

/* ========================
   SIMULATED API STATES
======================== */

function RequestPreview({ status, projects, onRetry }) {
  if (status === "loading") {
    return (
      <div className="build-loading-state" aria-label="Loading sample projects">
        {[1, 2, 3].map((item) => (
          <div className="build-skeleton-card" key={item}>
            <div />
            <span />
            <span />
          </div>
        ))}
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="build-feedback-state">
        <span className="build-feedback-icon" aria-hidden="true">⌕</span>
        <h4>No projects here yet.</h4>
        <p>An empty result still deserves a clear next step.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="build-feedback-state is-error">
        <span className="build-feedback-icon" aria-hidden="true">!</span>
        <h4>Couldn’t load the projects.</h4>
        <p>A simulated error. Give the visitor a way forward.</p>

        <button type="button" onClick={onRetry}>
          Retry demo ↻
        </button>
      </div>
    );
  }

  return (
    <div className="build-project-grid">
      {projects.map((project) => (
        <article
          key={project.id}
          className={`build-project ${project.color}`}
        >
          <div className="build-project-visual">
            <span aria-hidden="true">{project.symbol}</span>
            <small>{project.category}</small>
          </div>

          <div className="build-project-copy">
            <h4>{project.title}</h4>
            <p>{project.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ========================
   MOBILE PREVIEW
======================== */

function MobilePreview({ projects }) {
  return (
    <div className="build-phone" aria-hidden="true">
      <div className="build-phone-speaker" />

      <div className="build-phone-content">
        <span className="build-phone-logo">s.</span>

        <h4>
          Ideas made
          <em>interactive.</em>
        </h4>

        <div className="build-phone-pills">
          <span>All</span>
          <span>Apps</span>
        </div>

        {projects.slice(0, 2).map((project) => (
          <div
            key={project.id}
            className={`build-phone-project ${project.color}`}
          >
            <span>{project.symbol}</span>
            <p>{project.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}