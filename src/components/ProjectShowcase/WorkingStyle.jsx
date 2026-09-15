import { useEffect, useRef, useState } from "react";


const STAGES = [
  { title: "Understand", label: "01 / THE BRIEF", headline: "Start with the right questions.", description: "Clarify the goal, the audience, and what the finished website needs to do.", output: "A shared understanding", file: "project-brief.md" },
  { title: "Plan", label: "02 / THE DIRECTION", headline: "Give the idea a structure.", description: "Map the pages, organize the content, and work out the important interactions before polishing the details.", output: "A clear starting point", file: "site-plan.fig" },
  { title: "Build", label: "03 / THE IMPLEMENTATION", headline: "Build in thoughtful pieces.", description: "Turn the direction into reusable components, responsive layouts, and manageable code.", output: "A working preview", file: "ProjectPage.jsx" },
  { title: "Review", label: "04 / THE CONVERSATION", headline: "Share early. Refine together.", description: "Use specific feedback to improve the interface. Small changes can make the next action much clearer.", output: "A refined experience", file: "feedback-round.demo" },
  { title: "Hand over", label: "05 / THE FINISH", headline: "Make the next step easy.", description: "Review the details, explain how things work, and prepare an organized handover.", output: "A clear handover", file: "handover-checklist.md" },
];

const clamp = (value) => Math.min(1, Math.max(0, value));
const mono = "font-mono text-xs tracking-wide";

export default function WorkingStyle({ id = "working-style", topOffset = 0 }) {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const panelRefs = useRef([]);
  const progressRef = useRef(null);
  const travelRef = useRef(0);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);
  const offset = Math.max(0, Number(topOffset) || 0);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let naturalLayout = false;

    const paint = () => {
      frame = 0;
      const progress = naturalLayout ? 1 : clamp((offset - section.getBoundingClientRect().top) / Math.max(1, travelRef.current));
      const position = progress * STAGES.length;
      const current = Math.min(STAGES.length - 1, Math.floor(position + 0.125));

      setActive((previous) => previous === current ? previous : current);
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;

      // Feedback resolves as the review segment advances, and reverses on scroll-up.
      const reviewed = naturalLayout ? 1 : clamp((position - 3.08) / 0.55);
      scene.style.setProperty("--ws-reviewed", String(reviewed));
      setReviewComplete((previous) => previous === (reviewed > 0.95) ? previous : reviewed > 0.95);

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        if (naturalLayout) {
          panel.style.opacity = "1";
          panel.style.transform = "none";
          return;
        }
        // Hold each scene for most of its segment; crossfade near the end.
        const enter = index === 0 ? 1 : clamp((position - index + 0.25) / 0.25);
        const leave = index === STAGES.length - 1 ? 0 : clamp((position - index - 0.75) / 0.25);
        panel.style.opacity = String(Math.min(enter, 1 - leave));
        panel.style.transform = `translate3d(0, ${(1 - enter) * 22 - leave * 12}px, 0)`;
      });
    };

    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const measure = () => {
      naturalLayout = reducedMotion.matches || window.innerHeight - offset < 560;
      setStaticMode(naturalLayout);
      travelRef.current = naturalLayout ? 0 : STAGES.length * Math.max(380, (window.innerHeight - offset) * 0.62);
      section.style.setProperty("--ws-travel", `${travelRef.current}px`);
      requestPaint();
    };

    const observer = new ResizeObserver(requestPaint);
    observer.observe(scene);
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
    };
  }, [offset]);

  const navigate = (index) => {
    if (!sectionRef.current) return;
    if (staticMode) {
      panelRefs.current[index]?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    const start = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: start + ((index + 0.4) / STAGES.length) * travelRef.current, behavior: "smooth" });
  };

  return (
    <section id={id} className="overflow-x-clip bg-[#101512] text-[#edf2e9]" style={{ "--ws-top": `${offset}px` }} aria-label="My working style">
      <header className="mx-auto max-w-375 px-5 pb-12 pt-20 md:px-10 lg:px-14">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#91e6c0]" />
          <p className={`${mono} text-[#a6b5a8]`}>THE OTHER HALF OF THE WORK</p>
        </div>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-4xl font-medium leading-[1.04] tracking-[-0.055em] md:text-6xl">Good code.<br /><span className="text-[#91e6c0]">A thoughtful process.</span></h2>
          <p className="max-w-sm text-base leading-7 text-[#a6b5a8]">How I move from a conversation to a finished interface. Scroll through a sample project workspace.</p>
        </div>
      </header>

      <div ref={sectionRef} className={staticMode ? "relative" : "relative h-[calc(100svh-var(--ws-top)+var(--ws-travel,2000px))]"}>
        <div ref={sceneRef} className={`${staticMode ? "relative" : "sticky top-(--ws-top) flex h-[calc(100svh-var(--ws-top))] flex-col overflow-hidden"} border-y border-white/10 bg-[#101512]`}>
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-5 md:px-10 lg:px-14">
            <span className={`${mono} text-[#a6b5a8]`}>HOW I WORK</span>
            <span className={`${mono} text-[#91e6c0]`}>{staticMode ? "PROCESS OVERVIEW" : `${String(active + 1).padStart(2, "0")} / 05`}</span>
          </div>

          <div className={`mx-auto grid w-full max-w-375 gap-5 px-5 py-5 md:px-10 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)] lg:gap-12 lg:px-14 ${staticMode ? "" : "min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1"}`}>
            <aside className="min-w-0 lg:self-center">
              <nav aria-label="Working process stages" className="relative">
                <div className="absolute bottom-4 left-3.75 top-4 hidden w-px bg-white/10 lg:block" aria-hidden="true">
                  <div ref={progressRef} className="h-full origin-top scale-y-0 bg-[#91e6c0]" />
                </div>
                <ol className="relative flex gap-2 overflow-x-auto py-1 lg:flex-col lg:gap-3 lg:overflow-visible">
                  {STAGES.map((stage, index) => (
                    <li key={stage.title} className="shrink-0">
                      <button type="button" onClick={() => navigate(index)} aria-current={!staticMode && active === index ? "step" : undefined} className={`group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left outline-offset-4 focus-visible:outline focus-visible:outline-[#91e6c0] ${active === index && !staticMode ? "text-[#91e6c0]" : "text-[#a6b5a8] hover:text-white"}`}>
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-[#101512] font-mono text-xs ${active === index && !staticMode ? "border-[#91e6c0]" : "border-[#3e5043]"}`}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="whitespace-nowrap text-sm lg:text-base">{stage.title}</span>
                        <span className="ml-auto hidden pr-2 lg:block" aria-hidden="true">{active === index && !staticMode ? "↗" : ""}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="mt-7 hidden border-t border-white/10 pt-6 lg:block [@media(max-height:760px)]:hidden">
                <p className={`${mono} text-[#91e6c0]`}>{STAGES[active].label}</p>
                <h3 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.04em]">{STAGES[active].headline}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#a6b5a8]">{STAGES[active].description}</p>
                <p className="mt-5 text-xs text-[#a6b5a8]">Outcome <span className="ml-2 text-[#edf2e9]">{STAGES[active].output}</span></p>
              </div>
            </aside>

            <div className={`${staticMode ? "" : "flex min-h-0 flex-col"} min-w-0 rounded-2xl border border-[#3d4a3e] bg-[#1a211b] shadow-2xl`}>
              <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4">
                <span className="truncate font-mono text-xs text-[#a6b5a8]">{staticMode ? "working-style / overview" : STAGES[active].file}</span>
                <span className="shrink-0 rounded border border-[#91e6c0]/25 px-2 py-1 font-mono text-[10px] tracking-wide text-[#91e6c0]">SAMPLE PROJECT</span>
              </div>
              <div className={staticMode ? "grid gap-6 p-4" : "relative min-h-0 flex-1 overflow-hidden"}>
                {STAGES.map((stage, index) => (
                  <article key={stage.title} ref={(element) => { panelRefs.current[index] = element; }} aria-hidden={!staticMode && active !== index} className={`${staticMode ? "relative rounded-xl border border-white/10" : `absolute inset-0 will-change-[transform,opacity] ${index === 0 ? "opacity-100" : "opacity-0"}`} flex min-h-0 flex-col gap-4 p-4 md:p-6`}>
                    <div className="shrink-0">
                      <p className={`${mono} text-[#91e6c0]`}>{stage.label}</p>
                      <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl">{stage.headline}</h3>
                    </div>
                    <div className={staticMode ? "min-h-80" : "min-h-0 flex-1"}>
                      {index === 0 && <BriefScene />}
                      {index === 1 && <PlanScene />}
                      {index === 2 && <BuildScene />}
                      {index === 3 && <ReviewScene complete={reviewComplete} />}
                      {index === 4 && <HandoverScene />}
                    </div>
                    <p className="shrink-0 border-t border-white/10 pt-3 text-xs leading-5 text-[#a6b5a8]">Outcome: <span className="text-[#edf2e9]">{stage.output}</span></p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {!staticMode && <div className="flex h-11 shrink-0 items-center justify-between gap-4 px-5 font-mono text-[10px] tracking-wide text-[#a6b5a8] md:px-10 lg:px-14"><span>SCROLL TO FOLLOW THE PROCESS ↓</span><span className="hidden sm:block">CLEAR STEPS. SHARED PROGRESS.</span></div>}
        </div>
      </div>
      <div className="mx-auto flex max-w-375 items-center gap-4 px-5 py-9 md:px-10 lg:px-14"><span className="text-2xl text-[#91e6c0]" aria-hidden="true">↳</span><p className="text-sm leading-6 text-[#a6b5a8]">A process that leaves room for conversation, iteration, and the details that matter.</p></div>
    </section>
  );
}

function BriefScene() {
  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[1.15fr_0.85fr]">
      <div className="flex flex-col justify-center rounded-xl bg-[#edf0e6] p-5 text-[#233224]">
        <p className="font-mono text-xs text-[#62715c]">PROJECT / STUDIO WEBSITE</p>
        <h4 className="mt-4 text-2xl font-medium leading-tight tracking-tight">Make the work easy<br />to understand.</h4>
        <p className="mt-4 text-sm leading-6 text-[#62715c]">A portfolio for a small studio, with a clear path from discovering the work to getting in touch.</p>
        <div className="mt-5 flex flex-wrap gap-2"><Tag light>Project gallery</Tag><Tag light>Mobile first</Tag><Tag light>Clear enquiry</Tag></div>
      </div>
      <div className="grid gap-3 max-sm:hidden">
        {[['01', 'Who is it for?', 'Potential clients exploring the studio.'], ['02', 'What should it do?', 'Explain the work and make contact easy.'], ['03', 'What do we need?', 'Approved copy, project images, and priorities.']].map(([number, title, body]) => <div key={number} className="flex flex-col justify-center rounded-xl border border-white/10 p-4"><span className="font-mono text-xs text-[#91e6c0]">{number}</span><h4 className="mt-2 text-sm font-medium">{title}</h4><p className="mt-1 text-xs leading-5 text-[#a6b5a8]">{body}</p></div>)}
      </div>
    </div>
  );
}

function PlanScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap gap-2"><Tag>/ home</Tag><Tag>/ selected-work</Tag><Tag>/ contact</Tag></div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 rounded-xl border border-dashed border-[#91e6c0]/40 bg-[#101810] p-5">
        <div className="flex justify-between border-b border-dashed border-white/20 pb-3 text-xs text-[#a6b5a8]"><span>STUDIO / LOGO</span><span>WORK · ABOUT · CONTACT</span></div>
        <div className="flex items-end justify-between gap-5"><div className="flex-1"><p className="font-mono text-xs text-[#91e6c0]">01 / INTRODUCTION</p><div className="mt-3 h-5 w-4/5 rounded-sm bg-[#42543c]" /><div className="mt-2 h-5 w-3/5 rounded-sm bg-[#34442f]" /><div className="mt-3 h-2 w-4/5 bg-[#293826]" /></div><span className="hidden rounded-md border border-dashed border-white/30 px-4 py-3 text-xs text-[#a6b5a8] sm:block">CONTACT ↗</span></div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">{['Selected work', 'Project details', 'Next steps'].map((label) => <div key={label} className="flex items-center justify-center rounded-lg border border-dashed border-[#91e6c0]/30 p-2 text-center text-xs text-[#a6b5a8]">{label}</div>)}</div>
      </div>
      <p className="text-xs text-[#a6b5a8]">Content first. Decoration second.</p>
    </div>
  );
}

function BuildScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap gap-2"><Tag>Reusable components</Tag><Tag>Responsive layout</Tag></div>
      <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[0.85fr_1.15fr]">
        <div className="hidden rounded-xl border border-white/10 bg-[#0c120d] p-4 sm:block"><p className="font-mono text-xs text-[#a6b5a8]">ProjectPage.jsx</p><pre className="mt-5 whitespace-pre-wrap font-mono text-xs leading-7 text-[#91e6c0]"><code>{`<PageLayout>\n  <Header />\n  <ProjectIntro />\n  <ProjectGrid\n    projects={projects}\n  />\n  <ContactSection />\n</PageLayout>`}</code></pre></div>
        <div className="flex flex-col rounded-xl bg-[#edf0e6] p-5 text-[#233224]"><div className="flex justify-between text-xs"><strong>STUDIO.</strong><span>WORK ↗</span></div><h4 className="mt-7 text-3xl font-medium leading-tight tracking-tight">Thoughtful work.<br /><span className="text-[#587b42]">Clearly presented.</span></h4><div className="mt-5 grid min-h-0 flex-1 grid-cols-2 gap-3"><div className="flex items-end rounded-lg bg-[#cdd9bc] p-3 text-xs">Project 01 ↗</div><div className="flex items-end rounded-lg bg-[#d2c5ad] p-3 text-xs">Project 02 ↗</div></div><span className="mt-4 text-xs text-[#62715c]">Preview in progress</span></div>
      </div>
    </div>
  );
}

function ReviewScene({ complete }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative rounded-xl border border-[#91e6c0]/25 bg-[#91e6c0]/5 p-4"><p className="font-mono text-xs text-[#91e6c0]">SAMPLE FEEDBACK</p><p className="mt-2 text-sm leading-6">“Can the contact action stand out more?”</p></div>
      <div className="flex min-h-0 flex-1 flex-col justify-center rounded-xl bg-[#edf0e6] p-6 text-[#233224]">
        <span className="font-mono text-xs text-[#62715c]">LET’S MAKE SOMETHING USEFUL</span><h4 className="mt-3 text-3xl font-medium tracking-tight">Have a project in mind?</h4><p className="mt-2 hidden text-sm text-[#62715c] sm:block">A clearer invitation to start a conversation.</p>
        <div className="relative mt-6 h-12 w-48" aria-hidden="true"><span className="absolute inset-0 grid place-items-center 
        rounded-lg border border-[#c3ccbb] bg-[#dde3d5] text-sm text-[#718267]
         opacity-[calc(1-var(--ws-reviewed,0))]">Discuss your project ↗</span><span className="absolute inset-0 grid place-items-center rounded-lg 
         bg-[#233c27] text-sm text-white shadow-lg opacity-(--ws-reviewed,0)">Discuss your project ↗</span></div>
      </div>
      <p className={`font-mono text-xs ${complete ? 'text-[#91e6c0]' : 'text-[#a6b5a8]'}`}>{complete ? '✓ Feedback applied: stronger CTA contrast.' : '↓ Scroll to apply the feedback.'}</p>
    </div>
  );
}

function HandoverScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl border border-[#91e6c0]/25 bg-[#91e6c0]/5 p-4"><p className="font-mono text-xs text-[#91e6c0]">A CLEAR FINISH, NOT A MYSTERY FOLDER.</p><h4 className="mt-2 text-xl font-medium">Ready for the next person.</h4></div>
      <ul className="grid min-h-0 flex-1 gap-2">{[['Responsive checks', 'Review small and large screens.'], ['Links & interface states', 'Check navigation, forms, and edge cases.'], ['Organized source', 'Keep the project structure understandable.'], ['Handover notes', 'Explain setup, editing, and next steps.']].map(([title, body], index) => <li key={title} className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#91e6c0]/30 font-mono text-xs text-[#91e6c0]">{index + 1}</span><div><h5 className="text-sm font-medium">{title}</h5><p className="mt-1 hidden text-xs text-[#a6b5a8] sm:block">{body}</p></div></li>)}</ul>
      <p className="text-xs text-[#a6b5a8]">An illustrative checklist, not a claim that a real project has passed testing.</p>
    </div>
  );
}

function Tag({ children, light = false }) {
  return <span className={`rounded-md border px-2.5 py-1.5 text-xs ${light ? 'border-[#bdcbb3] text-[#526648]' : 'border-white/15 text-[#a6b5a8]'}`}>{children}</span>;
}
