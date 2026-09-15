import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  FaGithub, FaLinkedin, FaWhatsapp, FaRobot, FaCoffee,
  FaCode, FaRegLightbulb, FaMagic, FaTimes, FaArrowRight,
} from "react-icons/fa";

/**
 * Drop-in Hero.jsx. Requires your existing Tailwind CSS, motion and react-icons.
 * No FloatingTech, images, external CSS, AI endpoint, or backend required.
 * Predefined interactive previews; nothing is generated, deployed, or sent.
 * Change projectsHref/contactHref if your portfolio uses different anchors.
 */

const TYPES = [
  { id: "business", label: "Business website" },
  { id: "portfolio", label: "Portfolio" },
  { id: "app", label: "Web app" },
];
const VIBES = [
  { id: "minimal", label: "Minimal", dot: "bg-slate-400" },
  { id: "bold", label: "Bold", dot: "bg-lime-400" },
  { id: "playful", label: "Playful", dot: "bg-pink-400" },
];
const THEMES = {
  minimal: {
    shell: "bg-white text-slate-900", muted: "text-slate-500",
    tile: "border-slate-200 bg-slate-50", chip: "border-slate-300 text-slate-600",
    active: "border-slate-900 bg-slate-900 text-white", heading: "font-semibold tracking-[-0.055em]",
    accent: "text-slate-800", radius: "rounded-md",
  },
  bold: {
    shell: "bg-[#191e15] text-[#f2f8e7]", muted: "text-[#b6c4a3]",
    tile: "border-[#425133] bg-[#26321d]", chip: "border-[#60704f] text-[#c8d7b4]",
    active: "border-[#c6ff6b] bg-[#c6ff6b] text-[#17200e]", heading: "font-black uppercase tracking-[-0.06em]",
    accent: "text-[#c6ff6b]", radius: "rounded-none",
  },
  playful: {
    shell: "bg-[#fff2f7] text-[#492846]", muted: "text-[#865779]",
    tile: "border-[#e6bed6] bg-[#f4ddeb]", chip: "border-[#dca8c9] text-[#794b70]",
    active: "border-[#71376b] bg-[#71376b] text-white", heading: "font-serif font-medium italic tracking-tight",
    accent: "text-[#984582]", radius: "rounded-2xl",
  },
};
const NAMES = [
  { text: "सिद्धांत ग्रोवर", lang: "hi" },
  { text: "シッダーント・グローバー", lang: "ja" },
  { text: "希丹汉特·格罗弗", lang: "zh" },
  { text: "Сиддхант Гровер", lang: "ru" },
  { text: "سدھانت گروور", lang: "ur", dir: "rtl" },
  { text: "સિદ્ધાંત ગ્રોવર", lang: "gu" },
  { text: "সিদ্ধান্ত গ্রোভার", lang: "bn" },
];
const BUILD_STEPS = ["Ready for your brief", "Assembling the layout", "Applying the personality", "Adding working interactions", "Preview ready — try it!"];
const JOKES = [
  "A rough idea is enough. I speak fluent ‘something like this.’",
  "Excellent brief. Suspiciously few meetings.",
  "Adding personality. Leaving the unnecessary gradients behind.",
  "A tiny preview today. Your actual business deserves actual content.",
];
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/siddhantgrove", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhant-grover-8a9176279/", icon: FaLinkedin },
  { label: "WhatsApp", href: "https://wa.me/918218969834?text=Hello%20Siddhant%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.", icon: FaWhatsapp },
];

function enquiryUrl(selection) {
  const type = TYPES.find((item) => item.id === selection.type)?.label || "website";
  const vibe = VIBES.find((item) => item.id === selection.vibe)?.label || "Minimal";
  return `https://wa.me/918218969834?text=${encodeURIComponent(`Hi Siddhant! I tried the interactive demo on your portfolio. I'm interested in a ${type.toLowerCase()} with a ${vibe.toLowerCase()} style. I'd like to discuss building the real version.`)}`;
}

export default function Hero({ projectsHref = "#projects", contactHref = "#contact" }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [fun, setFun] = useState(true);
  const [nameIndex, setNameIndex] = useState(0);
  const [draft, setDraft] = useState({ type: "business", vibe: "minimal" });
  const [built, setBuilt] = useState(null);
  const [phase, setPhase] = useState(0);
  const [buildId, setBuildId] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [dismissed, setDismissed] = useState([]);
  const busy = phase > 0 && phase < 4;
  const ready = phase === 4;
  const animateFun = fun && prefersReducedMotion === false;
  const snapshot = built || draft;
  const dirty = Boolean(built && (draft.type !== built.type || draft.vibe !== built.vibe));

  useEffect(() => {
    if (!animateFun || !inView) return;
    const timer = window.setInterval(() => setNameIndex((index) => (index + 1) % NAMES.length), 4500);
    return () => window.clearInterval(timer);
  }, [animateFun, inView]);

  useEffect(() => {
    if (!busy) return;
    if (!animateFun) {
      setPhase(4);
      return;
    }
    const timer = window.setTimeout(() => setPhase((value) => Math.min(4, value + 1)), 540);
    return () => window.clearTimeout(timer);
  }, [phase, busy, animateFun]);

  const build = (selection = draft) => {
    if (busy) return;
    setBuilt({ ...selection });
    setBuildId((value) => value + 1);
    setPhase(animateFun ? 1 : 4);
  };

  const surprise = () => {
    if (busy) return;
    const current = TYPES.findIndex((item) => item.id === draft.type) * VIBES.length + VIBES.findIndex((item) => item.id === draft.vibe);
    // Choose a different combination from the eight other possibilities.
    const next = (current + 1 + Math.floor(Math.random() * 8)) % 9;
    const selection = { type: TYPES[Math.floor(next / 3)].id, vibe: VIBES[next % 3].id };
    setDraft(selection);
    setJokeIndex((value) => (value + 1) % JOKES.length);
    build(selection);
  };

  const dismiss = (key) => setDismissed((values) => values.includes(key) ? values : [...values, key]);
  const reveal = { initial: animateFun ? { opacity: 0, y: 18 } : false, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section ref={sectionRef} id="hero" className="relative isolate overflow-x-clip bg-[#f3f4ec] px-5 pb-8 pt-10 text-[#172017] sm:px-8 lg:px-12 xl:pb-32 xl:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#c6ff6b]/25 blur-[110px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#64745b]"><span className="h-2 w-2 rounded-full bg-[#5e9d26]" /> AVAILABLE FOR FREELANCE PROJECTS</p>
          <button type="button" onClick={() => setFun((value) => !value)} aria-pressed={!fun} className="rounded-full border border-[#b8c8a8] bg-white/70 px-3 py-2 text-xs text-[#526648] outline-offset-4 focus-visible:outline  focus-visible:outline-[#597f36]">{fun ? "Quiet mode: off" : "Quiet mode: on"}</button>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <motion.div {...reveal} className="min-w-0">
            <p className="text-base text-[#64745b]">Hello, I’m Siddhant <span aria-hidden="true">👋</span></p>
            <h1 className="mt-5 text-[clamp(3.6rem,6.7vw,6.5rem)] font-semibold leading-[0.93] tracking-[-0.065em]">Siddhant<br /><span className="font-serif font-normal italic text-[#5e9d26]">Grover.</span></h1>
            <div className="mt-4 flex min-h-10 items-center gap-3">
              <span aria-hidden="true" className="text-xl font-medium leading-relaxed text-[#718065]" lang={NAMES[nameIndex].lang} dir={NAMES[nameIndex].dir || "ltr"}>{NAMES[nameIndex].text}</span>
              <button type="button" aria-label="Show my name in another writing system" onClick={() => setNameIndex((value) => (value + 1) % NAMES.length)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 text-[#64745b] hover:bg-white focus-visible:outline  focus-visible:outline-[#597f36]">↻</button>
            </div>
            <p className="mt-5 text-xl font-medium tracking-tight">Full-stack development. A little personality.</p>
            <p className="mt-4 max-w-md text-base leading-8 text-[#64745b]">I turn ideas into websites and web applications—from design and development to hosting and launch.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={projectsHref} className="inline-flex items-center gap-6 rounded-full bg-[#172017] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#365128] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]">View my projects <FaArrowRight aria-hidden="true" /></a>
              <a href={contactHref} className="inline-flex items-center gap-6 rounded-full border border-[#aebda0] px-6 py-3.5 text-sm font-medium hover:bg-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]">Start a project ↗</a>
            </div>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Connect on ${label}`} className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-xl text-[#526648] transition-colors hover:bg-[#172017] hover:text-white focus-visible:outline  focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"><Icon aria-hidden="true" /></a>)}
              <span className="ml-2 text-xs text-[#718065]">Based in India.<br />Building for the web.</span>
            </div>
          </motion.div>

          <motion.div {...reveal} className="min-w-0 rounded-[1.75rem] border border-[#d5deca] bg-white p-4 shadow-[0_25px_80px_-40px_rgba(30,50,20,0.35)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#64745b]">YOU’RE THE CLIENT. I’M THE DEVELOPER.</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Give me a tiny brief.</h2>
              <p className="mt-1 text-sm text-[#718065]">Choose a direction. Try a working preview.</p></div>
              <motion.button type="button" disabled={busy}
               onClick={surprise} aria-label="Surprise me with a different website and style" 
               whileHover={animateFun ? { rotate: -10, scale: 1.06 } : undefined} whileTap={animateFun ? { scale: 0.95 } : undefined}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#c6ff6b] text-3xl disabled:opacity-50 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]">
                  <FaRobot aria-hidden="true" /></motion.button>
            </div>

            <fieldset disabled={busy} className="min-w-0">
              <legend className="mb-2 text-sm font-medium">01 / What are we building?</legend>
              <div className="flex flex-wrap gap-2">{TYPES.map((type) =>
                 <Choice key={type.id} name="hero-project-type" checked={draft.type === type.id} label={type.label} value={type.id} 
                 onChange={() => setDraft((value) => ({ ...value, type: type.id }))} />)}</div>
                 </fieldset>
            <fieldset disabled={busy} className="mt-4 min-w-0">
              <legend className="mb-2 text-sm font-medium">02 / Choose a personality</legend>
              <div className="flex flex-wrap gap-2">{VIBES.map((vibe) => 
                <Choice key={vibe.id} name="hero-project-vibe" checked={draft.vibe === vibe.id} label={vibe.label} value={vibe.id} dot={vibe.dot}
                 onChange={() => setDraft((value) => ({ ...value, vibe: vibe.id }))} />)}</div>
                 </fieldset>

            <div className="mt-5 overflow-hidden rounded-xl border border-[#d5deca]">
              <div className="flex items-center justify-between gap-3 border-b border-[#d5deca] bg-[#f4f6ef] px-3 py-2.5"><span className="flex gap-1.5" aria-hidden="true"><i className="h-1.5 w-1.5 rounded-full bg-[#718065]" /><i className="h-1.5 w-1.5 rounded-full bg-[#a6b59a]" /><i className="h-1.5 w-1.5 rounded-full bg-[#c7d2bd]" /></span><span className="font-mono text-[11px] text-[#64745b]">your-idea.preview</span><span className="font-mono text-[10px] text-[#718065]">DEMO</span></div>
              <div className="relative min-h-80" aria-busy={busy}>
                {phase < 3 ? <WirePreview theme={phase === 2 ? THEMES[snapshot.vibe] : THEMES.minimal} phase={phase} animate={animateFun} /> : <DemoPreview key={buildId} selection={snapshot} enabled={ready} animate={animateFun} />}
                {ready && animateFun && <Confetti key={`celebrate-${buildId}`} />}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <motion.button type="button" disabled={busy} onClick={() => build()} whileTap={animateFun ? { scale: 0.98 } : undefined} className="flex min-h-12 flex-1 items-center justify-center gap-3 rounded-xl bg-[#172017] px-4 py-3 text-sm font-semibold text-white hover:bg-[#365128] disabled:cursor-wait disabled:opacity-60 focus-visible:outline  focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"><FaCode aria-hidden="true" />{busy ? 'Assembling preview…' : ready ? 'Build again' : 'Build my idea'}<span aria-hidden="true">↗</span></motion.button>
              <button type="button" disabled={busy} onClick={surprise} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#d5deca] px-4 py-3 text-sm text-[#526648] hover:bg-[#f4f6ef] disabled:opacity-50 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"><FaMagic aria-hidden="true" /> Surprise me</button>
            </div>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-[#64745b]">{dirty && !busy ? 'New choices selected. Build again to update the preview.' : BUILD_STEPS[phase]}</p>
            {ready && built && <div className="mt-3 border-t border-[#dfe6d6] pt-4"><a href={enquiryUrl(built)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-xl bg-[#e9f6d8] px-4 py-3 text-sm font-semibold text-[#355222] hover:bg-[#dbefc2] focus-visible:outline  focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"><span>Let’s build the real version</span><FaWhatsapp className="shrink-0 text-xl" aria-hidden="true" /></a><p className="mt-2 text-[11px] leading-5 text-[#718065]">Uses the choices shown in this preview. Opens WhatsApp; you review before sending.</p></div>}
            <p className="mt-3 text-[11px] leading-5 text-[#8a9580]">Interactive template demo. No AI generation, live deployment, or enquiry submission happens here.</p>
          </motion.div>
        </div>

        <AnimatePresence>
          {fun && <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:contents">
            {!dismissed.includes('coffee') && <CornerNote noteKey="coffee" icon={FaCoffee} title="CAFFEINE DEPARTMENT" text="Ideas welcome. Coffee optional. Curiosity included." position="xl:left-6 xl:top-4" tilt={-2} animate={animateFun} onClose={() => dismiss('coffee')} />}
            {!dismissed.includes('meeting') && <CornerNote noteKey="meeting" icon={FaRegLightbulb} title="TINY BRIEF. BIG ENERGY." text={JOKES[jokeIndex]} position="xl:right-6 xl:top-4" tilt={2} animate={animateFun} onClose={() => dismiss('meeting')} />}
            {!dismissed.includes('robot') && <CornerNote noteKey="robot" icon={FaRobot} title="THE ROBOT HAS A SUGGESTION" text="Tap my cousin beside the builder. It has excellent random taste." position="xl:bottom-4 xl:left-6" tilt={1} animate={animateFun} onClose={() => dismiss('robot')} />}
            {!dismissed.includes('code') && <CornerNote noteKey="code" icon={FaCode} title="MEETING REDUCER v1.0" text={ready ? 'This meeting really could have been a button.' : 'The buttons work. Go on, give them a small adventure.'} position="xl:bottom-4 xl:right-6" tilt={-1} animate={animateFun} onClose={() => dismiss('code')} />}
          </div>}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Choice({ name, checked, label, value, dot, onChange }) {
  return <label className="cursor-pointer"><input className="peer sr-only" type="radio" name={name} checked={checked} value={value} onChange={onChange} /><span className="flex items-center gap-2 rounded-full border border-[#d5deca] px-3 py-2 text-xs text-[#64745b] transition-colors peer-checked:border-[#4a673a]
   peer-checked:bg-[#edf5e4] peer-checked:text-[#27421e] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#597f36] peer-disabled:cursor-wait peer-disabled:opacity-50">{dot && <i aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />}{label}</span></label>;
}

function WirePreview({ phase, theme, animate }) {
  return <div className={`flex min-h-80 flex-col p-5 ${theme.shell}`}><div className={`flex justify-between border-b pb-3 text-xs ${theme.muted}`}><span>YOUR BRAND</span><span>YOUR NEXT CHAPTER</span></div><motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="my-6"><div className={`h-6 w-3/4 border ${theme.tile} ${theme.radius}`} /><div className={`mt-2 h-6 w-1/2 border ${theme.tile} ${theme.radius}`} /><p className={`mt-3 text-xs ${theme.muted}`}>{phase === 0 ? 'Choose a website and a style. Then press Build.' : BUILD_STEPS[phase]}</p></motion.div><div className="grid flex-1 grid-cols-3 gap-3">{[0,1,2].map((i) => <motion.div key={`${phase}-${i}`} initial={animate && phase > 0 ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: animate ? i * 0.08 : 0 }} className={`min-h-20 border ${theme.tile} ${theme.radius}`} />)}</div></div>;
}

function DemoPreview({ selection, enabled, animate }) {
  const theme = THEMES[selection.vibe];
  return <motion.div initial={animate ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: animate ? 0.3 : 0 }} className={`min-h-80 p-4 sm:p-5 ${theme.shell}`}><fieldset disabled={!enabled} className="min-w-0"><legend className="sr-only">Interactive {selection.type} demonstration</legend>{selection.type === 'business' ? <BusinessPreview theme={theme} /> : selection.type === 'portfolio' ? <PortfolioPreview theme={theme} /> : <AppPreview theme={theme} />}</fieldset></motion.div>;
}

function BusinessPreview({ theme }) {
  const [service, setService] = useState('Websites');
  const services = { Websites: 'A clear home for your business, your work, and your next enquiry.', Branding: 'A consistent visual identity that makes the business feel like itself.', Content: 'Useful words and a clear story, organized around what visitors need.' };
  return <>
  <PreviewLabel
   theme={theme} brand="NORTHSTAR STUDIO" label="BUSINESS CONCEPT" />
   <h3 className={`mt-5 text-3xl leading-[1.02] ${theme.heading}`}>Small studio.<br />
   <span className={theme.accent}>Thoughtful work.</span>
   </h3><p className={`mt-3 text-xs leading-5 ${theme.muted}`}>Choose a service below. The preview responds.</p>
   <div role="group" aria-label="Demo service selection"
    className="mt-4 flex flex-wrap gap-2">{Object.keys(services).map((name) => 
    <button key={name} type="button" aria-pressed={service === name}
     onClick={() => setService(name)}
      className={`border px-3 py-2 text-xs outline-offset-2 focus-visible:outline
         ${theme.radius} ${service === name ? theme.active : theme.chip}`}>{name}</button>)}</div>
         <div className={`mt-4 min-h-19 border p-3 ${theme.tile} ${theme.radius}`}><h4 className="text-sm font-semibold">{service}</h4><p className={`mt-1 text-xs leading-5 ${theme.muted}`}>{services[service]}</p></div></>;
}

function PortfolioPreview({ theme }) {
  const [filter, setFilter] = useState('All');
  const projects = [{ name: 'Travel journal', kind: 'Web', symbol: '↗' },
     { name: 'Studio identity', kind: 'Design', symbol: 'Aa' }, { name: 'Reading room', kind: 'Web', symbol: '⌘' },
      { name: 'Color studies', kind: 'Design', symbol: '◒' }];
  return <>
  <PreviewLabel theme={theme} brand="FOLIO / 01" label="PORTFOLIO CONCEPT" />
  <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
    <h3 className={`text-3xl leading-tight ${theme.heading}`}>Selected work.</h3>
    <div role="group" 
  aria-label="Filter demo projects" className="flex gap-1.5">{['All','Web','Design'].map((item) =>
     <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} 
     className={`border px-2.5 py-1.5 text-xs outline-offset-2
     focus-visible:outline ${theme.radius} ${filter === item ? theme.active : theme.chip}`}>{item}
     </button>)}
     </div>
     </div>
     <div className="mt-4 grid grid-cols-2 gap-3">{projects.filter((item) => filter === 'All'
      || item.kind === filter).map((item) => 
     
     <article key={item.name}
       className={`flex min-h-21.25 flex-col justify-between 
        border p-3 ${theme.tile} ${theme.radius}`}><span aria-hidden="true"
         className={`text-2xl ${theme.accent}`}>{item.symbol}</span>
         <h4 className="mt-2 text-xs font-medium">{item.name}</h4>
         </article>)}</div></>;
}

function AppPreview({ theme }) {
  const [done, setDone] = useState([false, false, false]);
  const tasks = ['Turn the idea into a clear brief', 'Build a useful first version', 'Review the little details'];
  const total = done.filter(Boolean).length;
  return <><PreviewLabel theme={theme} brand="LAUNCHPAD" label="WEB APP CONCEPT" /><div className="mt-5 flex items-end justify-between gap-3"><h3 className={`text-3xl leading-tight ${theme.heading}`}>A little progress.</h3><span className={`font-mono text-xs ${theme.muted}`}>{total} / 3 done</span></div><p className={`mt-2 text-xs ${theme.muted}`}>Try checking a task. This is real local state.</p><div className={`mt-4 h-2 overflow-hidden border ${theme.tile} ${theme.radius}`}><div style={{ width: `${total / 3 * 100}%` }} className={`h-full ${theme.active}`} /></div><div className="mt-4 space-y-2">{tasks.map((task, index) => <label key={task} className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 ${theme.tile} ${theme.radius}`}><input type="checkbox" checked={done[index]} onChange={() => setDone((values) => values.map((value, i) => i === index ? !value : value))} className="h-4 w-4 shrink-0 accent-[#597f36]" /><span className={`text-xs leading-5 ${done[index] ? 'line-through opacity-60' : ''}`}>{task}</span></label>)}</div></>;
}

function PreviewLabel({ theme, brand, label }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-xs font-bold tracking-wider">{brand}</span><span className={`text-[9px] tracking-wider ${theme.muted}`}>{label}</span></div>;
}

function CornerNote({ icon: Icon, title, text, position, tilt, animate, onClose }) {
  return <motion.aside layout={animate} initial={animate ? { opacity: 0, y: 12, rotate: 0 } : false}
   animate={{ opacity: 1, y: 0, rotate: animate ? tilt : 0 }} exit={{ opacity: 0, y: animate ? 8 : 0 }}
    transition={{ duration: animate ? 0.4 : 0 }} 
    className={`relative z-10 rounded-xl border border-[#d5deca] bg-white/95 p-3 pr-8 shadow-sm xl:absolute xl:w-57.5 
    ${position}`}><button type="button" onClick={onClose} aria-label={`Dismiss ${title.toLowerCase()} note`} 
    className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full text-xs text-[#718065] hover:bg-[#edf3e6] focus-visible:outline focus-visible:outline-[#597f36]"><FaTimes aria-hidden="true" /></button><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eaf4dc] text-[#597f36]"><Icon aria-hidden="true" /></span><div><p className="pr-1 font-mono text-[9px] tracking-wide text-[#64745b]">{title}</p><p className="mt-1 text-[11px] leading-4 text-[#526648]">{text}</p></div>
  </div></motion.aside>;
}

function Confetti() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{Array.from({ length: 12 }, (_, index) => <motion.span key={index} initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }} animate={{ x: Math.cos(index / 12 * Math.PI * 2) * 150, y: Math.sin(index / 12 * Math.PI * 2) * 110 + 55, opacity: 0, rotate: index % 2 ? 220 : -180 }} transition={{ duration: 0.9, ease: 'easeOut' }} className={`absolute left-1/2 top-1/2 h-2 w-1.5 rounded-sm ${['bg-lime-400','bg-pink-400','bg-violet-400'][index % 3]}`} />)}</div>;
}
