import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaArrowRight, FaCode, FaCoffee, FaLeaf, FaMagic, FaRobot, FaRocket, FaStore, FaWhatsapp } from "react-icons/fa";
import { DEMO, DEMO_IDEA, VIBES, enquiryUrl, matchesSchema } from "./concept.mjs";

const PALETTES = {
  sage: { shell: "bg-[#edf2e7] text-[#243b2b]", tile: "bg-[#dfe8d6]", ink: "text-[#496344]", button: "bg-[#243b2b] text-white", border: "border-[#243b2b]/20", swatches: ["bg-[#edf2e7]", "bg-[#243b2b]", "bg-[#bccfa5]"] },
  cocoa: { shell: "bg-[#fbefe0] text-[#4b2e22]", tile: "bg-[#efdbc2]", ink: "text-[#825231]", button: "bg-[#6b3f29] text-white", border: "border-[#4b2e22]/20", swatches: ["bg-[#fbefe0]", "bg-[#6b3f29]", "bg-[#efb875]"] },
  electric: { shell: "bg-[#19231e] text-[#f2f5dc]", tile: "bg-[#2b3b30]", ink: "text-[#c6ff6b]", button: "bg-[#c6ff6b] text-[#19231e]", border: "border-[#c6ff6b]/25", swatches: ["bg-[#19231e]", "bg-[#c6ff6b]", "bg-[#809684]"] },
  berry: { shell: "bg-[#fff0f4] text-[#532542]", tile: "bg-[#f5d5e5]", ink: "text-[#92326c]", button: "bg-[#7a285a] text-white", border: "border-[#532542]/20", swatches: ["bg-[#fff0f4]", "bg-[#7a285a]", "bg-[#eab6d2]"] },
};
const SYMBOLS = { coffee: FaCoffee, code: FaCode, spark: FaMagic, shop: FaStore, leaf: FaLeaf, rocket: FaRocket };
const EXAMPLES = [
  { label: "A neighbourhood café", idea: DEMO_IDEA },
  { label: "A fitness coach", idea: "A personal trainer website that explains coaching options and helps new clients book an introductory conversation." },
  { label: "A creative studio", idea: "A small design studio portfolio with selected work, a clear process and a friendly enquiry form." },
];
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#597f36]";

export default function AIConceptBuilder({ fun = true, onJoke }) {
  const reduced = useReducedMotion();
  const animate = fun && reduced === false;
  const [idea, setIdea] = useState("");
  const [vibe, setVibe] = useState("premium");
  const [result, setResult] = useState(null);
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [device, setDevice] = useState("desktop");
  const request = useRef(null);
  const dirty = result && (idea.trim() !== result.idea || vibe !== result.vibe);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!busy) { setSlow(false); return; }
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [busy]);

  async function generate(style = vibe) {
    if (request.current) return;
    if (idea.trim().length < 12 || idea.length > 600) { setError("Tell me a little more—use 12–600 characters."); return; }
    const snapshot = { idea: idea.trim(), vibe: style };
    const controller = new AbortController();
    request.current = controller;
    setVibe(style); setBusy(true); setError(""); setNotice("");
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/concept", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snapshot), signal: controller.signal,
      });
      let data;
      try { data = await response.json(); }
      catch { throw new Error("The AI endpoint isn't responding with JSON. Check that the backend and Vite proxy are running."); }
      if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "Couldn't generate a concept. Please try again.");
      if (data.source !== "ai" || !matchesSchema(data.concept)) throw new Error("That preview didn't pass validation. Please try again.");
      if (request.current !== controller) return;
      setResult({ ...snapshot, concept: data.concept, source: "ai" });
      setRevision((n) => n + 1);
      setNotice("Your AI concept is ready. Explore the preview below.");
      onJoke?.(data.concept.joke);
    } catch (err) {
      if (request.current === controller) setError(controller.signal.aborted ? "That took too long. Try again or explore the sample concept." : err.message);
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) { request.current = null; setBusy(false); }
    }
  }

  function cancel() {
    const controller = request.current;
    request.current = null;
    controller?.abort();
    setBusy(false); setNotice("Generation cancelled. Any previous preview is unchanged.");
  }

  function showDemo() {
    if (request.current) return;
    setResult({ idea: DEMO_IDEA, vibe: "premium", source: "demo", concept: DEMO });
    setIdea(DEMO_IDEA); setVibe("premium"); setError("");
    setRevision((n) => n + 1);
    setNotice("Showing a prewritten sample. No AI request was made.");
    onJoke?.(DEMO.joke);
  }

  return (
    <div className="min-w-0 rounded-[1.75rem] border border-[#d5deca] bg-white p-4 shadow-[0_25px_80px_-40px_rgba(30,50,20,0.35)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#526648]">Your idea. A new perspective.</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">What if we built <span className="font-serif italic text-[#527735]">your idea?</span></h2>
          <p className="mt-2 text-sm leading-6 text-[#64745b]">A tiny AI concept studio. You bring the “what if.”</p>
        </div>
        <motion.span aria-hidden="true" whileHover={animate ? { rotate: [0, -12, 12, 0] } : undefined} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#c6ff6b] text-2xl"><FaRobot /></motion.span>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); generate(); }}>
        <fieldset disabled={busy} className="min-w-0">
          <legend className="sr-only">Describe your website concept</legend>
          <label htmlFor="hero-idea" className="text-sm font-medium">01 / Tell me what you have in mind</label>
          <textarea id="hero-idea" name="idea" value={idea} onChange={(event) => setIdea(event.target.value)} minLength={12} maxLength={600} required rows={3} aria-describedby="hero-privacy hero-length" placeholder="A cosy café in Meerut. Warm colours, a lovely menu, and somewhere to plan your next coffee…" className={`mt-2 w-full resize-y rounded-2xl border border-[#c4d0b8] bg-[#f6f8f2] p-4 text-sm leading-6 placeholder:text-[#65735b] disabled:opacity-60 ${focus}`} />
          <div className="mt-1 flex flex-wrap justify-between gap-2 text-[11px] text-[#64745b]">
            <p id="hero-privacy" className="max-w-sm">Generate sends your brief to OpenAI. Don’t include private or confidential information.</p>
            <span id="hero-length">{idea.length}/600</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Example briefs">
            {EXAMPLES.map((example) => <button key={example.label} type="button" onClick={() => { setIdea(example.idea); setError(""); }} className={`rounded-full border border-[#d5deca] px-3 py-1.5 text-[11px] text-[#526648] hover:bg-[#edf5e4] disabled:opacity-50 ${focus}`}>{example.label} ↗</button>)}
          </div>
          <fieldset className="mt-5"><legend className="mb-2 text-sm font-medium">02 / Give it a personality</legend>
            <div className="flex flex-wrap gap-2">{VIBES.map((style) => <label key={style} className="cursor-pointer"><input type="radio" name="concept-vibe" value={style} checked={vibe === style} onChange={() => setVibe(style)} className="peer sr-only" /><span className="block rounded-full border border-[#c4d0b8] px-4 py-2 text-xs capitalize text-[#526648] peer-checked:border-[#243b2b] peer-checked:bg-[#243b2b] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#597f36] peer-disabled:opacity-50">{style}</span></label>)}</div>
          </fieldset>
          <div className="mt-5 flex flex-wrap gap-2">
            <motion.button whileTap={animate ? { scale: 0.98 } : undefined} type="submit" className={`flex min-h-12 flex-1 items-center justify-center gap-3 rounded-xl bg-[#172017] px-4 py-3 text-sm font-semibold text-white hover:bg-[#365128] disabled:cursor-wait disabled:opacity-60 ${focus}`}><FaMagic aria-hidden="true" />{busy ? "Creating your concept…" : "Generate my concept"}<FaArrowRight aria-hidden="true" /></motion.button>
            <button type="button" onClick={() => { const other = VIBES.filter((style) => style !== vibe); generate(other[Math.floor(Math.random() * other.length)]); }} className={`rounded-xl border border-[#c4d0b8] px-4 py-3 text-xs text-[#526648] hover:bg-[#edf5e4] disabled:opacity-50 ${focus}`}>Surprise me ↗</button>
          </div>
        </fieldset>
      </form>

      <div role="status" aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-[#526648]">{busy ? slow ? "Still thinking through the concept. You can cancel at any time." : "Generating copy and design direction—not building a live website." : notice || "Select an example or write your own brief, then generate."}</div>
      {busy && <button type="button" onClick={cancel} className={`mt-1 text-xs underline underline-offset-4 ${focus}`}>Cancel generation</button>}
      {error && <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5deca]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d5deca] bg-[#f3f6ee] px-3 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-[#526648]"><span aria-hidden="true" className={`h-2 w-2 rounded-full ${result?.source === "ai" ? "bg-green-600" : "bg-amber-600"}`} />{result ? result.source === "ai" ? "AI-generated concept" : "Prewritten sample · not AI" : "Your preview lives here"}</span>
          <div role="group" aria-label="Preview width" className="flex gap-1">{["desktop", "mobile"].map((size) => <button key={size} type="button" aria-pressed={device === size} onClick={() => setDevice(size)} className={`rounded px-2 py-1 text-[10px] capitalize ${device === size ? "bg-[#243b2b] text-white" : "text-[#526648]"} ${focus}`}>{size}</button>)}</div>
        </div>
        <div aria-busy={busy} className="overflow-hidden bg-[#e8ede2] p-2 sm:p-3">
          <div className={`mx-auto min-w-0 ${device === "mobile" ? "max-w-75" : "w-full"}`}>
            <AnimatePresence mode="wait" initial={false}>
              {result ? <ConceptPreview key={revision} concept={result.concept} compact={device === "mobile"} animate={animate} /> : <EmptyPreview animate={animate} busy={busy} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {dirty && <p className="mt-2 text-xs leading-5 text-[#64745b]">Your brief has changed. Generate again to update this preview; the contact link still uses the displayed concept.</p>}

      {result && <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-[#d5deca] bg-[#f6f8f2] p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#526648]"><FaCode aria-hidden="true" />{result.source === "ai" ? "AI-suggested developer perspective" : "Sample developer perspective"}</p>
          <p className="mt-2 text-sm leading-6 text-[#34492e]">{result.concept.perspective}</p>
          <p className="mt-3 border-t border-[#d5deca] pt-3 text-xs leading-6 text-[#526648]"><span className="font-semibold">Next step: </span>{result.concept.nextStep}</p>
        </div>
        <a href={enquiryUrl(result)} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between gap-3 rounded-xl bg-[#c6ff6b] px-4 py-4 text-sm font-semibold text-[#243b2b] hover:bg-[#b9f45c] ${focus}`}>Discuss this concept with Siddhant <FaWhatsapp aria-hidden="true" className="shrink-0 text-xl" /></a>
        <p className="text-[11px] leading-5 text-[#64745b]">Opens WhatsApp with this brief. Review it before sending. Nothing is submitted automatically.</p>
      </div>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#dfe6d6] pt-3 text-[11px] leading-5 text-[#64745b]">
        <span>Concept, not a deployed website or a quote.</span>
        <button type="button" disabled={busy} onClick={showDemo} className={`font-bold text-2xl underline underline-offset-4 disabled:opacity-50 ${focus}`}>Explore a sample Click · no AI request</button>
      </div>
    </div>
  );
}

function EmptyPreview({ animate, busy }) {
  return <motion.div initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: animate ? 0.2 : 0 }} className="flex min-h-75 flex-col justify-center rounded-xl border border-dashed border-[#a6b797] bg-[#f5f7ef] p-6 text-center">
    <motion.div initial={false} animate={animate && busy ? { y: [0, -8, 0], rotate: [0, -8, 8, 0] } : { y: 0, rotate: 0 }} transition={{ duration: animate ? 1.2 : 0 }} className="mx-auto grid h-20 w-20 place-items-center rounded-[1.6rem] bg-[#e0eecf] text-4xl text-[#527735]"><FaRobot aria-hidden="true" /></motion.div>
    <h3 className="mt-5 text-xl font-semibold tracking-tight">{busy ? "A little imagination is happening." : "Blank canvas. Very good intentions."}</h3>
    <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-[#526648]">{busy ? "The real AI response will appear here. No pretend loading percentage." : "Your brief becomes a visual concept, a suggested approach and a conversation starter."}</p>
  </motion.div>;
}

function ConceptPreview({ concept: c, compact, animate }) {
  const theme = PALETTES[c.palette];
  const Icon = SYMBOLS[c.motif];
  const [selected, setSelected] = useState(null);
  const split = c.layout === "split" && !compact;
  return <motion.div initial={animate ? { opacity: 0, y: 12, scale: 0.98 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: animate ? 0.4 : 0 }} className={`min-w-0 overflow-hidden rounded-xl p-4 sm:p-5 ${theme.shell}`}>
    <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${theme.border}`}>
      <p className="max-w-full wrap-break-word font-mono text-[10px] font-bold tracking-[0.12em]">{c.brand}</p>
      <div aria-label={`Suggested ${c.palette} palette`} className="flex gap-1">{theme.swatches.map((color) => <span key={color} aria-hidden="true" className={`h-3 w-3 rounded-full border border-current/20 ${color}`} />)}</div>
    </div>
    <div className={`my-5 grid min-w-0 items-center gap-4 ${split ? "grid-cols-[minmax(0,1fr)_100px]" : "grid-cols-1"} ${c.layout === "editorial" ? "text-center" : ""}`}>
      <div className="min-w-0">
        <p className={`mb-2 font-mono text-[9px] uppercase tracking-[0.18em] ${theme.ink}`}>A possible next chapter</p>
        <h3 className={`wrap-break-word text-3xl leading-[1.08] tracking-tight ${c.layout === "editorial" ? "font-serif italic" : c.layout === "cards" ? "font-black" : "font-semibold"}`}>{c.headline}</h3>
        <p className="mt-3 wrap-break-word text-xs leading-6">{c.description}</p>
        <button type="button" onClick={() => setSelected(selected === 0 ? null : 0)} aria-expanded={selected === 0} aria-controls="concept-section-details" className={`mt-4 rounded-full px-4 py-2.5 text-xs font-semibold outline-offset-4 focus-visible:outline ${theme.button}`}>{c.cta} ↗</button>
      </div>
      <motion.div aria-hidden="true" whileHover={animate ? { rotate: -8, scale: 1.04 } : undefined} className={`relative grid place-items-center overflow-hidden rounded-4xl ${theme.tile} ${split ? "h-32" : "h-20"}`}>
        <div className={`absolute h-28 w-28 rounded-full border border-dashed ${theme.border}`} />
        <div className={`absolute h-20 w-20 rounded-full border ${theme.border}`} />
        <Icon className={`relative text-4xl ${theme.ink}`} />
      </motion.div>
    </div>
    <p className={`mb-2 text-[10px] ${theme.ink}`}>Preview interaction: tap a section to explore the idea.</p>
    <div className={`grid gap-2 ${compact || c.layout === "editorial" ? "grid-cols-1" : "grid-cols-3"}`}>
      {c.sections.map((section, index) => { const SectionIcon = SYMBOLS[section.icon]; return <button key={index} 
      type="button" aria-expanded={selected === index} aria-controls="concept-section-details" 
      onClick={() => setSelected(selected === index ? null : index)} 
      className={`min-w-0 rounded-xl border p-3 text-left outline-offset-2 focus-visible:outline ${theme.border} ${selected === index ? theme.button : theme.tile}`}><SectionIcon aria-hidden="true" className="mb-2 text-lg" /><span className="block wrap-break-word text-[11px] font-semibold leading-5">{section.title}</span></button>; })}
    </div>
    <div id="concept-section-details" hidden={selected === null} className={`mt-3 rounded-xl border p-3 ${theme.border}`}>
      {selected !== null && <p className="wrap-break-word text-xs leading-6">{c.sections[selected].body}</p>}
    </div>
    <p className={`mt-3 text-[9px] leading-4 ${theme.ink}`}>Illustrative content and interactions. No purchases, bookings or form submissions.</p>
  </motion.div>;
}
