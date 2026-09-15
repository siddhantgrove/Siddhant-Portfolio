import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaBriefcase } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars, FaBolt, FaCode, FaEnvelope, FaFilePdf, FaFolderOpen,
  FaHome, FaSearch, FaTimes, FaUser,
} from "react-icons/fa";

const navItems = [
  { name: "Home", id: "hero", icon: FaHome, hint: "Back to the beginning" },
  { name: "About", id: "about", icon: FaUser, hint: "The human behind the code" },
  { name: "Skills", id: "skills", icon: FaCode, hint: "Things I build with" } ,
  { name: "Projects", id: "tech-skills", icon: FaFolderOpen, hint: "Selected experiments" },
  { name: "Contact", id: "contact", icon: FaEnvelope, hint: "Start a conversation" },
  { name: "Resume", href: "/Siddhant_Resume.pdf", icon: FaFilePdf, hint: "Download the PDF" },
  // CHANGED: featured keeps your two strongest business pages visible.
  { name: "Services", icon: FaBriefcase, path: "/services", hint: "What I can do for you", featured: true },
  { name: "Stories", path: "/client-stories", icon: FaBolt, hint: "What my clients say about me", featured: true },
];

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fa83f]";

export default function Navbar({ navigateTo }) {
  const reduceMotion = useReducedMotion();

  // OLD: this state allowed the Navbar to disappear while scrolling down.
  // const [visible, setVisible] = useState(true);

  // CHANGED: no visibility state is needed because the Navbar stays fixed.
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [query, setQuery] = useState("");
  // OLD: used only to compare the previous and current scroll positions.
  // const lastScroll = useRef(0);
  const frame = useRef(null);
  const commandInput = useRef(null);
  const dock = useRef(null);

  useEffect(() => {
    const update = () => {
      // OLD: these lines hid the Navbar whenever the user scrolled downward.
      // setVisible(
      //   menuOpen ||
      //   commandOpen ||
      //   currentY < 100 ||
      //   currentY < lastScroll.current
      // );
      // lastScroll.current = currentY;

      // CHANGED: visibility calculation was removed. The remaining code only
      // detects which homepage section is currently active.

      const marker = window.innerHeight * 0.42;
      let current = "hero";
      for (const item of navItems) {
        if (!item.id) continue;
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker) current = item.id;
      }
      setActive(current);
      frame.current = null;
    };

    const onScroll = () => {
      if (!frame.current) frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  // CHANGED: menu state no longer controls Navbar visibility.
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!commandOpen) return;
    setQuery("");
    const timer = window.setTimeout(() => commandInput.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [commandOpen]);

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? navItems.filter((item) => `${item.name} ${item.hint}`.toLowerCase().includes(value))
      : navItems;
  }, [query]);

  {/*Old Function:*\/*/}
// function goTo(item) {
//   if (item.href) {
//     const link = document.createElement("a");
    

//     link.href = item.href;
//     link.download = "Siddhant_Resume.pdf";

//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } else if (typeof navigateTo === "function") {
//     navigateTo(item.id, item.name, item.path);
//   } else if (item.id) {
//     document.getElementById(item.id)?.scrollIntoView({
//       behavior: reduceMotion ? "auto" : "smooth",
//     });
//   }

//   setMenuOpen(false);
//   setCommandOpen(false);
// }


function goTo(item) {
  // Immediately update the green active pill
  if (item.id) {
    setActive(item.id);
  }

  if (item.href) {
    const link = document.createElement("a");
    link.href = item.href;
    link.download = "Siddhant_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();
  } else if (typeof navigateTo === "function") {
    navigateTo(item.id, item.name, item.path);
  } else if (item.id) {
    document.getElementById(item.id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  setMenuOpen(false);
  setCommandOpen(false);
}



  function moveGlow(event) {
    const rect = dock.current?.getBoundingClientRect();
    if (!rect || !dock.current) return;
    dock.current.style.setProperty("--nav-x", `${event.clientX - rect.left}px`);
    dock.current.style.setProperty("--nav-y", `${event.clientY - rect.top}px`);
  }

  return (
    <>
      {/* OLD:
          animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
          This moved the Navbar off-screen while scrolling down.
      */}

      {/* CHANGED: animate always finishes at y: 0, so the Navbar stays visible. */}
      <motion.nav
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className="pointer-events-none fixed inset-x-0 top-4 z-999 px-4 "
      >
        <div className="mx-auto flex max-w-7xl justify-center">
          <div
            ref={dock}
            onMouseMove={moveGlow}
            className="pointer-events-auto hidden items-center gap-1 overflow-hidden rounded-full border border-black/10 bg-white/80 p-2 shadow-[0_18px_60px_-28px_rgba(24,40,20,0.55)] backdrop-blur-2xl md:flex"
            style={{ backgroundImage: "radial-gradient(180px circle at var(--nav-x, 50%) var(--nav-y, 50%), rgba(198,255,107,.28), transparent 65%)" }}
          >
            <button type="button" 
              onClick={() => goTo(navItems[0])} aria-label="Go home" 

            className={`group relative grid h-10 w-10 shrink-0 place-items-center 
            rounded-full bg-[#172017] text-xs font-black text-white ${focus}`}>

              SG<span aria-hidden="true" className="absolute -right-0.5 
              -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#8bd746]" />
            </button>

            <span aria-hidden="true" className="mx-1 h-6 w-px bg-black/10" />

            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = item.id === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goTo(item)}
                  aria-current={selected ? "page" : undefined}
                  className={`group relative isolate flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
                    selected
                      ? "text-[#203319]"
                      : item.featured
                        ? "bg-[#172017] text-[#c6ff6b] hover:bg-[#304a25]"
                        : "text-[#5d6d56] hover:text-[#172017]"
                  } ${focus}`}
                >
                  {selected && <motion.span layoutId="navbar-active-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 -z-10 rounded-full bg-[#c6ff6b]" />}
                  <Icon aria-hidden="true" className="shrink-0 text-sm" />
                  <span className="hidden lg:inline">{item.name}</span>
                  <span role="tooltip" className="pointer-events-none absolute left-1/2 top-[calc(100%+14px)] hidden w-max -translate-x-1/2 rounded-lg bg-[#172017] px-3 py-2 text-[10px] font-normal text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 xl:block">{item.hint}</span>
                </button>
              );
            })}

            <button type="button" onClick={() => setCommandOpen(true)} aria-label="Open quick navigation" className={`ml-1 flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 text-xs text-[#5d6d56] hover:bg-white ${focus}`}>
              <FaSearch aria-hidden="true" /><span className="hidden xl:inline">Jump</span><kbd className="hidden rounded border border-black/10 bg-[#f1f3ed] px-1.5 py-0.5 font-mono text-[9px] xl:inline">Ctrl K</kbd>
            </button>

            <motion.button type="button" onClick={() => goTo(navItems[4])} whileHover={reduceMotion ? undefined : { scale: 1.03 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} className={`ml-1 flex h-10 items-center gap-2 rounded-full bg-[#172017] px-4 text-sm font-semibold text-white hover:bg-[#304a25] ${focus}`}>
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff6b] opacity-60 motion-reduce:animate-none" /><span className="relative h-2 w-2 rounded-full bg-[#c6ff6b]" /></span>
              Let&apos;s talk
            </motion.button>
          </div>

          <div className="pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-black/10 bg-white/85 p-2 shadow-xl backdrop-blur-2xl md:hidden">
            <button type="button" onClick={() => goTo(navItems[0])} className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black ${focus}`}><span className="grid h-7 w-7 place-items-center rounded-full bg-[#172017] text-[10px] text-white">SG</span>Siddhant.</button>
            <div className="flex gap-2">
              <button type="button" onClick={() => goTo(navItems[4])} className={`rounded-full bg-[#c6ff6b] px-4 py-2 text-xs font-semibold text-[#172017] ${focus}`}>Let&apos;s talk</button>
              <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)} className={`grid h-9 w-9 place-items-center rounded-full bg-[#172017] text-white ${focus}`}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: reduceMotion ? 0 : 0.22 }} className="pointer-events-auto mx-auto mt-3 w-full max-w-sm overflow-hidden rounded-3xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">
              <p className="px-3 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#718065]">Choose your next stop</p>
              {navItems.map((item, index) => { const Icon = item.icon; const selected = item.id === active; return <motion.button key={item.name} type="button" initial={reduceMotion ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.035 }} onClick={() => goTo(item)} aria-current={selected ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${selected ? "bg-[#eaf6dc] text-[#28451c]" : "text-[#526648] hover:bg-[#f3f6ee]"} ${focus}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${selected ? "bg-[#c6ff6b]" : "bg-[#edf1e8]"}`}><Icon aria-hidden="true" /></span><span className="min-w-0"><span className="block text-sm font-semibold">{item.name}</span><span className="block truncate text-[10px] opacity-70">{item.hint}</span></span><span aria-hidden="true" className="ml-auto">↗</span></motion.button>; })}
              <button type="button" onClick={() => { setMenuOpen(false); setCommandOpen(true); }} className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 py-3 text-xs font-semibold text-[#526648] ${focus}`}><FaBolt aria-hidden="true" />Open command menu</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {commandOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} className="fixed inset-0 z-1000 flex items-start justify-center bg-[#172017]/45 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setCommandOpen(false); }}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="command-title" initial={reduceMotion ? false : { opacity: 0, y: -20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }} transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#f6f7f1] shadow-2xl">
              <div className="flex items-center gap-3 border-b border-black/10 p-4">
                <FaSearch aria-hidden="true" className="text-[#6c805e]" />
                <label htmlFor="nav-command" className="sr-only">Search portfolio sections</label>
                <input ref={commandInput} id="nav-command" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where do you want to go?" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#7b8874]" />
                <button type="button" onClick={() => setCommandOpen(false)} aria-label="Close quick navigation" className={`grid h-8 w-8 place-items-center rounded-full border border-black/10 text-xs text-[#526648] ${focus}`}><FaTimes /></button>
              </div>
              <div className="max-h-[55vh] overflow-y-auto p-3">
                <p id="command-title" className="px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#718065]">Portfolio command centre</p>
                {filteredItems.length ? filteredItems.map((item, index) => { const Icon = item.icon; return <button key={item.name} type="button" onClick={() => goTo(item)} className={`group flex w-full items-center gap-4 rounded-2xl p-3 text-left hover:bg-white ${focus}`}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e8f4d8] text-[#527735] transition-transform group-hover:-rotate-6"><Icon aria-hidden="true" /></span><span><span className="block text-sm font-semibold text-[#172017]">{String(index + 1).padStart(2, "0")} / {item.name}</span><span className="mt-0.5 block text-xs text-[#718065]">{item.hint}</span></span><span aria-hidden="true" className="ml-auto text-[#527735]">↗</span></button>; }) : <p className="p-8 text-center text-sm text-[#718065]">No command found. The robot checked twice.</p>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 bg-white/60 px-5 py-3 text-[10px] text-[#718065]"><span>Type to filter · Esc to close</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#76b83f]" />Available for freelance</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
