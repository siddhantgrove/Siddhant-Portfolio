
import { useEffect, useRef, useState } from "react";
import {
  FaArrowUp,
  FaCheck,
  FaCopy,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaArrowRightLong, FaCode } from "react-icons/fa6";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EMAIL = "siddhantsiddhant163@gmail.com";

const services = [
  "React development",
  "Full-stack builds",
  "AI integrations",
  "Landing pages",
  "API integration",
  "Hosting & deployment",
  "Performance tuning",
  "Ranking & SEO",
];

const navigation = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", id: "contact" },
];

const terminalLines = [
  { command: "git status", reply: "idea detected ✦" },
  { command: "npm run courage", reply: "passed with style ✓" },
  { command: "deploy personality", reply: "shipped to production 🚀" },
];

const sparks = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  x: Math.cos((index / 12) * Math.PI * 2) * (55 + (index % 3) * 14),
  y: Math.sin((index / 12) * Math.PI * 2) * (42 + (index % 4) * 10),
}));

export default function Footer({ navigateTo }) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [burst, setBurst] = useState(0);
  const copyTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const goTo = (item) => {
    if (typeof navigateTo === "function") {
      navigateTo(item.id, item.name, item.path);
      return;
    }

    if (item.path) {
      window.location.assign(item.path);
      return;
    }

    document.getElementById(item.id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const shipSomething = () => {
    setTerminalIndex((current) => (current + 1) % terminalLines.length);
    setBurst((current) => current + 1);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const terminal = terminalLines[terminalIndex];
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#172017] text-[#f5f3e8]">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-lime-300/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

      {/* Moving capabilities tape */}
      <div className="-rotate-1 border-y border-lime-200/25 bg-[#c6ff6b] py-3 text-[#172017]">
        <motion.div
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          className="flex w-max items-center"
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={`${service}-${index}`}
              className="flex items-center gap-5 px-5 text-xs font-black uppercase tracking-[0.24em] sm:text-sm"
            >
              <span>{service}</span>
              <span aria-hidden="true">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        {/* Main freelance call to action */}
        <motion.div
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="grid gap-12 border-b border-white/15 pb-20 lg:grid-cols-[1fr_22rem] lg:items-end"
        >
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-lime-200/25 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lime-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
              </span>
              Available for freelance
            </div>

            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
              One last thing before you leave...
            </p>
            <h2 className="max-w-4xl text-[clamp(3.3rem,8.5vw,8rem)] font-black leading-[0.84] tracking-[-0.065em]">
              Have a weirdly
              <span className="block text-[#c6ff6b]">good idea?</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              Let’s turn it into a fast, memorable product people enjoy using—and
              your business enjoys owning.
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              type="button"
              onClick={() => goTo({ name: "Contact", id: "contact" })}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-between rounded-2xl bg-[#c6ff6b] px-6 py-5 text-left font-black text-[#172017] shadow-[0_20px_55px_rgba(198,255,107,0.14)]"
            >
              Start a project
              <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <button
              type="button"
              onClick={() => goTo({ name: "Services", path: "/services" })}
              className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left font-bold transition hover:border-lime-200/40 hover:bg-white/10"
            >
              Explore services
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </motion.div>

        <div className="grid gap-12 py-16 lg:grid-cols-[1.25fr_.7fr_1fr]">
          {/* Brand and copyable email */}
          <div>
            <p className="text-4xl font-black tracking-tighter sm:text-5xl">
              Siddhant<span className="text-[#c6ff6b]">.</span>
            </p>
            <p className="mt-5 max-w-md leading-7 text-white/55">
              Full-stack developer building sharp interfaces, reliable systems,
              AI-powered experiences, and smooth deployments.
            </p>

            <div className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-white/15 bg-black/20 p-2 pl-4">
              <a
                href={`mailto:${EMAIL}`}
                className="min-w-0 flex-1 truncate font-mono text-xs text-white/70 sm:text-sm"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-lime-200 transition hover:bg-[#c6ff6b] hover:text-[#172017]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <p className="mt-2 h-5 font-mono text-xs text-lime-200">
              {copied ? "Copied. Your move, future collaborator ✦" : "Usually replies within 24 hours."}
            </p>
          </div>

          {/* Route-aware navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-white/35">
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goTo(item)}
                  className="group flex items-center gap-3 text-left text-white/65 transition hover:text-lime-200"
                >
                  <span className="h-px w-0 bg-lime-200 transition-all group-hover:w-5" />
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Harmless terminal Easter egg */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-white/35">
              Tiny developer corner
            </p>
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0b100b] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
                <span className="ml-auto font-mono text-[10px] text-white/30">portfolio.exe</span>
              </div>
              <div className="min-h-32 p-5 font-mono text-xs leading-6 sm:text-sm">
                <p className="text-white/35">siddhant@portfolio:~$</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={terminal.command}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-1"
                  >
                    <p className="text-white">{terminal.command}</p>
                    <p className="text-lime-200">{terminal.reply}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative border-t border-white/10 p-3">
                <button
                  type="button"
                  onClick={shipSomething}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[#c6ff6b] hover:text-[#172017]"
                >
                  <FaCode /> Ship something
                </button>
                <AnimatePresence>
                  {burst > 0 && sparks.map((spark) => (
                    <motion.span
                      key={`${burst}-${spark.id}`}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                      animate={{ opacity: 0, x: spark.x, y: spark.y, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-lime-300"
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/25">
              Harmless button. Serious developer.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-xl">
            {[
              { label: "GitHub", href: "https://github.com/siddhantgrove", icon: FaGithub },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhant-grover-8a9176279/", icon: FaLinkedin },
              { label: "WhatsApp", href: "https://wa.me/918218969834?text=Hello%20Siddhant,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.", icon: FaWhatsapp },
            ].map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, rotate: -5 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-lime-200/50 hover:text-lime-200"
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          <p className="text-sm text-white/40">
            © {year} Siddhant Grover · Built with React, curiosity, and unreasonable respect for spacing.
          </p>

          <motion.button
            type="button"
            onClick={scrollTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Back to top"
            className="flex h-14 items-center justify-center gap-3 rounded-full border border-white/15 px-6 font-bold transition hover:bg-white hover:text-[#172017] md:w-14 md:px-0"
          >
            <span className="md:hidden">Back to top</span>
            <FaArrowUp />
          </motion.button>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none overflow-hidden whitespace-nowrap text-center text-[19vw] font-black leading-[0.72] tracking-[-0.08em] text-white/2.5">
        LET’S BUILD
      </div>
    </footer>
  );
}
