import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaRobot, FaCoffee, FaCode, FaRegLightbulb, FaTimes, FaArrowRight } from "react-icons/fa";
import AIConceptBuilder from "./AIConceptBuilder";

const NAMES = [
  { text: "सिद्धांत ग्रोवर", lang: "hi" },
  { text: "シッダーント・グローバー", lang: "ja" },
  { text: "希丹汉特·格罗弗", lang: "zh" },
  { text: "Сиддхант Гровер", lang: "ru" },
  { text: "سدھانت گروور", lang: "ur", dir: "rtl" },
  { text: "સિદ્ધાંત ગ્રોવર", lang: "gu" },
  { text: "সিদ্ধান্ত গ্রোভার", lang: "bn" },
];
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/siddhantgrove", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhant-grover-8a9176279/", icon: FaLinkedin },
  { label: "WhatsApp", href: "https://wa.me/918218969834?text=Hi%20Siddhant%21%20I%27d%20like%20to%20discuss%20a%20project.", icon: FaWhatsapp },
];
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#597f36]";

export default function Hero({ projectsHref = "#projects", contactHref = "#contact" }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const reduced = useReducedMotion();
  const [fun, setFun] = useState(true);
  const [nameIndex, setNameIndex] = useState(0);
  const [joke, setJoke] = useState("A rough idea is enough. I speak fluent ‘something like this.’");
  const [dismissed, setDismissed] = useState([]);
  const animate = fun && reduced === false;
  useEffect(() => {
    if (!animate || !inView) return;
    const timer = window.setInterval(() => setNameIndex((value) => (value + 1) % NAMES.length), 4500);
    return () => window.clearInterval(timer);
  }, [animate, inView]);
  const reveal = { initial: animate ? { opacity: 0, y: 18 } : false, animate: { opacity: 1, y: 0 }, transition: { duration: animate ? 0.5 : 0 } };
  const notes = [
    { id: "coffee", icon: FaCoffee, title: "CAFFEINE DEPARTMENT", text: "Ideas welcome. Coffee optional. Curiosity included.", position: "xl:left-6 xl:top-4", tilt: -2 },
    { id: "brief", icon: FaRegLightbulb, title: "TINY BRIEF. BIG ENERGY.", text: "Your ‘what if’ has officially entered the chat.", position: "xl:right-6 xl:top-4", tilt: 2 },
    { id: "robot", icon: FaRobot, title: "ROBOT MARGIN NOTES", text: joke, position: "xl:bottom-4 xl:left-6", tilt: 1 },
    { id: "code", icon: FaCode, title: "HUMAN STILL REQUIRED", text: "AI brings a starting point. I bring the code, questions and finishing touches.", position: "xl:bottom-4 xl:right-6", tilt: -1 },
  ];

  return (
    <section ref={sectionRef} id="hero" className="relative isolate overflow-x-clip bg-[#f3f4ec] px-5 pb-8 pt-10 text-[#172017] sm:px-8 lg:px-12 xl:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#c6ff6b]/25 blur-[110px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#526648]"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#5e9d26]" />Available for freelance projects</p>
          <button type="button" onClick={() => setFun((value) => !value)} aria-pressed={!fun} className={`rounded-full border border-[#b8c8a8] bg-white/70 px-3 py-2 text-xs text-[#526648] ${focus}`}>{fun ? "Quiet mode: off" : "Quiet mode: on"}</button>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <motion.div {...reveal} className="min-w-0 lg:pt-12">
            <p className="text-base text-[#64745b]">Hello, I’m Siddhant <span aria-hidden="true">👋</span></p>
            <h1 className="mt-5 text-[clamp(3.6rem,6.7vw,6.5rem)] font-semibold leading-[0.93] tracking-[-0.065em]">Siddhant<br /><span className="font-serif font-normal italic text-[#527735]">Grover.</span></h1>
            <div aria-hidden="true" className="mt-4 flex h-12 items-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={NAMES[nameIndex].lang} lang={NAMES[nameIndex].lang} dir={NAMES[nameIndex].dir || "ltr"} initial={animate ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: animate ? 0 : 1, y: animate ? -14 : 0 }} transition={{ duration: animate ? 0.20 : 0, ease: [0.22, 1, 0.36, 1] }} className="text-lg font-medium text-[#64745b] sm:text-3xl">{NAMES[nameIndex].text}</motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-5 text-xl font-medium tracking-tight">Full-stack development.<br />A little personality. A lot of possibility.</p>
            <p className="mt-4 max-w-md text-base leading-8 text-[#64745b]">I turn ideas into websites and web applications—from design and development to hosting and launch.</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#526648]">Got an idea? Try the concept studio. Then let’s talk about turning the interesting bits into something real.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={projectsHref} className={`inline-flex items-center gap-6 rounded-full bg-[#172017] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#365128] ${focus}`}>View my projects <FaArrowRight aria-hidden="true" /></a>
              <a href={contactHref} className={`inline-flex items-center gap-6 rounded-full border border-[#aebda0] px-6 py-3.5 text-sm font-medium hover:bg-white ${focus}`}>Start a project ↗</a>
            </div>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Connect on ${label}`} className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 text-xl text-[#526648] hover:bg-[#172017] hover:text-white ${focus}`}><Icon aria-hidden="true" /></a>)}
              <span className="ml-2 text-xs text-[#64745b]">Based in India.<br />Building for the web.</span>
            </div>
            <div className="mt-9 max-w-md rounded-2xl border border-[#cbd6c0] bg-white/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#526648]">Not another portfolio chatbot.</p>
              <p className="mt-2 text-sm leading-7 text-[#526648]">A visitor’s idea becomes a visual direction, a suggested approach, and a useful conversation starter.</p>
            </div>
          </motion.div>
          <motion.div {...reveal} className="min-w-0"><AIConceptBuilder fun={fun} onJoke={setJoke} /></motion.div>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:contents">
          <AnimatePresence>{fun && notes.filter((note) => !dismissed.includes(note.id)).map((note) => <CornerNote key={note.id} {...note} animate={animate} onClose={() => setDismissed((values) => [...values, note.id])} />)}</AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CornerNote({ icon: Icon, title, text, position, tilt, animate, onClose }) {
  return <motion.aside initial={animate ? { opacity: 0, y: 12, rotate: 0 } : false} animate={{ opacity: 1, y: 0, rotate: animate ? tilt : 0 }} exit={{ opacity: 0, y: animate ? 8 : 0 }} transition={{ duration: animate ? 0.4 : 0 }} className={`relative z-10 rounded-xl border border-[#d5deca] bg-white/95 p-3 pr-8 shadow-sm xl:absolute xl:w-57.5 ${position}`}>
    <button type="button" onClick={onClose} aria-label={`Dismiss ${title.toLowerCase()} note`} className={`absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full text-xs text-[#526648] hover:bg-[#edf3e6] ${focus}`}><FaTimes aria-hidden="true" /></button>
    <div className="flex gap-3"><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eaf4dc] text-[#597f36]"><Icon /></span><div className="min-w-0"><p className="pr-1 font-mono text-[9px] tracking-wide text-[#526648]">{title}</p><p className="mt-1 wrap-break-word text-[11px] leading-4 text-[#526648]">{text}</p></div></div>
  </motion.aside>;
}
