import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaBolt, FaCheck, FaCode, FaGlobe,
  FaLayerGroup, FaRocket, FaWhatsapp, FaWrench,
} from "react-icons/fa";
import { IoIosMan } from "react-icons/io";

const projectTypes = [
  { id: "landing", name: "Landing page", price: 8000, note: "One focused page built to explain, launch or convert." },
  { id: "portfolio", name: "Portfolio website", price: 12000, note: "A memorable home for your story, skills and work." },
  { id: "business", name: "Business website", price: 18000, note: "A clear multi-page presence designed around enquiries." },
  { id: "webapp", name: "React web application", price: 28000, note: "Custom interfaces, state, APIs and user workflows." },
  { id: "fullstack", name: "Full-stack product", price: 45000, note: "Frontend, backend, database and deployment setup." },
];

const extras = [
  { id: "cms", name: "CMS / editable content", price: 6000 },
  { id: "auth", name: "Login and user accounts", price: 8000 },
  { id: "payment", name: "Payment integration", price: 8000 },
  { id: "ai", name: "AI-powered feature", price: 10000 },
  { id: "motion", name: "Advanced interactions", price: 4000 },
  { id: "copy", name: "Content assistance", price: 3000 },
];

const packages = [
  {
    name: "Launch", eyebrow: "For one clear goal", price: "₹4,500",
    description: "A polished landing page for a campaign, professional or new idea.",
    features: ["3 responsive page", "Custom UI implementation", "Contact or enquiry action", "Full SEO setup", "Deployment assistance"],
  },
  {
    name: "Scale", eyebrow: "For a growing business", price: "₹10,000", featured: true,
    description: "A responsive website for your brand, products or services.",
    features: ["Up to five core pages", "Responsive custom design", "Lead-focused contact flow", "Performance pass", "Hosting and launch support,Ranking and SEO setup"],
  },
  {
    name: "Grow", eyebrow: "Most popular", price: "₹17,999", featured: true,
    description: "A complete business website that makes your offer easy to understand and trust.",
    features: ["Up to five core pages", "Responsive custom design", "Lead-focused contact flow", "Performance pass", "Hosting and launch support"],
  },
  {
    name: "Build", eyebrow: "For custom products", price: "₹35,000",
    description: "A tailored React or full-stack experience with real application logic.",
    features: ["Product discovery session", "Custom React interface", "API or database integration", "Testing and handover", "Deployment setup"],
  },
];

const services = [
  { icon: FaGlobe, title: "Websites", text: "Responsive portfolios, landing pages and business websites built around a real goal." },
  { icon: FaCode, title: "React development", text: "Reusable interfaces, state management, API connections and thoughtful interactions." },
  { icon: FaLayerGroup, title: "Full-stack builds", text: "Frontend, backend, authentication, databases and custom product workflows." },
  { icon: FaBolt, title: "Performance", text: "Practical improvements to loading, responsiveness and everyday usability." },
  { icon: FaRocket, title: "Hosting & launch", text: "Build configuration, domain connection and deployment assistance." },
  { icon: FaWrench, title: "Care & improvements", text: "Maintenance, fixes, content updates and ongoing product support." },
  { icon: IoIosMan, title:" Free Consulting", text:"We'll help you decide what's best for your business and project."},
  {icon: FaLayerGroup, title:"Ranking and SEO", text:"We'll help you rank your website in search results."},
];

const faqs = [
  ["Are these fixed prices?", "No. They are starting points. Your final quote depends on pages, functionality, integrations, content, timeline and the condition of any existing code."],
  ["What do I need before we begin?", "A rough idea is enough for the first conversation. Before development, we will agree on goals, scope, content responsibilities, timeline, payment stages and what success should look like."],
  ["Are domain and hosting included?", "Deployment assistance can be included, but domain, hosting and paid third-party services are normally billed separately in your name so you retain ownership."],
  ["How many revisions do I get?", "The agreed proposal will state the revision rounds. Changes inside the approved direction are revisions; new pages or features are quoted as additional scope."],
  ["Can you improve an existing website?", "Yes. I can review an existing React or frontend project for responsive issues, UI implementation, performance, integrations and maintainability before recommending the smallest useful engagement."],
  ["What happens after launch?", "You receive a handover and can choose ad-hoc help or a separate monthly maintenance plan. Nothing renews automatically unless we explicitly agree to it."],
];

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6da13e]";

export default function ServicePricing() {
  const reduceMotion = useReducedMotion();
  const [type, setType] = useState("business");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [priority, setPriority] = useState(false);

  const estimate = useMemo(() => {
    const project = projectTypes.find((item) => item.id === type);
    const additions = extras.filter((item) => selectedExtras.includes(item.id)).reduce((total, item) => total + item.price, 0);
    const subtotal = (project.price + additions) * (priority ? 1.2 : 1);
    const round = (number) => Math.ceil(number / 500) * 500;
    return { project, low: round(subtotal), high: round(subtotal * 1.25) };
  }, [type, selectedExtras, priority]);

  const whatsapp = useMemo(() => {
    const additions = extras.filter((item) => selectedExtras.includes(item.id)).map((item) => item.name);
    const message = [
      "Hi Siddhant! I used your project estimator and would like to discuss a project.",
      `Project: ${estimate.project.name}`,
      `Extras: ${additions.length ? additions.join(", ") : "None selected"}`,
      `Timeline: ${priority ? "Priority timeline requested" : "Flexible / standard"}`,
      `Indicative range shown: ${money.format(estimate.low)}–${money.format(estimate.high)}`,
      "I understand this is an estimate, not a final quote.",
    ].join("\n");
    return `https://wa.me/918218969834?text=${encodeURIComponent(message)}`;
  }, [estimate, selectedExtras, priority]);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.55 },
  };

  function toggleExtra(id) {
    setSelectedExtras((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }

  return (
    <main className="overflow-x-clip bg-[#f3f4ec] text-[#172017]">
      <section className="relative isolate px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-12 -z-10 h-128 w-lg rounded-full bg-[#c6ff6b]/30 blur-[130px]" />
        <div className="mx-auto max-w-7xl">
          <Link to="/" className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold text-[#526648] hover:bg-white ${focus}`}><FaArrowLeft aria-hidden="true" />Back to portfolio</Link>
          <motion.div {...reveal} className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_0.65fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#597f36]">Freelance services · clear starting points</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Let&apos;s make your idea <span className="font-serif font-normal italic text-[#597f36]">useful.</span></h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-8 text-[#526648]">From the first screen to hosting and launch, I build responsive websites and web products with clarity, personality and working details.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#526648]"><span className="inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-2"><span className="h-2 w-2 rounded-full bg-[#70ad3d]" />Available for selected projects</span><span>Based in India · Working remotely</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#172017] px-5 py-6 text-[#eef5e7] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b9c8ae]">Strategy · interface · code · launch</p>
          <p className="text-sm">No mystery quote button. Start with a real range.</p>
          <a href="#estimator" className={`inline-flex items-center gap-2 text-sm font-semibold text-[#c6ff6b] ${focus}`}>Estimate my project <FaArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#597f36]">What I can help with</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">One developer. The useful parts of the whole journey.</h2>
          </motion.div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.title} {...reveal} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.05 }} whileHover={reduceMotion ? undefined : { y: -6 }} className="group rounded-[1.75rem] border border-[#d1dbc8] bg-white/70 p-6 shadow-[0_18px_55px_-45px_rgba(23,32,23,.7)]"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f3d5] text-[#527735]"><Icon aria-hidden="true" /></span><span className="font-mono text-[10px] text-[#8b9783]">0{index + 1}</span></div><h3 className="mt-8 text-xl font-semibold">{service.title}</h3><p className="mt-3 text-sm leading-7 text-[#64745b]">{service.text}</p><div className="mt-6 h-px origin-left scale-x-0 bg-[#7fb34f] transition-transform duration-300 group-hover:scale-x-100" /></motion.article>; })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="font-mono text-xs uppercase tracking-[0.25em] text-[#597f36]">Ways to start</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Pick a starting line.</h2></div>
            <p className="max-w-md text-sm leading-7 text-[#64745b]">Every project receives a scoped proposal before work begins. These prices help us begin the conversation with less guesswork.</p>
          </motion.div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => <motion.article key={item.name} {...reveal} whileHover={reduceMotion ? undefined : { y: -7 }} className={`relative flex min-h-125 flex-col overflow-hidden rounded-4xl border p-7 ${item.featured ? "border-[#172017] bg-[#172017] text-white shadow-[0_28px_80px_-38px_rgba(23,32,23,.8)]" : "border-[#d4ddcc] bg-[#f5f7f1]"}`}>
              {item.featured && <span className="absolute right-5 top-5 rounded-full bg-[#c6ff6b] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#172017]">Good place to start</span>}
              <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${item.featured ? "text-[#b8c9ad]" : "text-[#718065]"}`}>{item.eyebrow}</p>
              <h3 className="mt-8 text-4xl font-semibold">{item.name}</h3>
              <p className={`mt-3 min-h-20 text-sm leading-7 ${item.featured ? "text-[#bdc9b7]" : "text-[#64745b]"}`}>{item.description}</p>
              <div className="my-7 border-y border-current/10 py-6"><span className={`text-xs ${item.featured ? "text-[#bdc9b7]" : "text-[#718065]"}`}>Starting from</span><p className="mt-1 text-4xl font-semibold tracking-tight">{item.price}</p></div>
              <ul className="space-y-3">{item.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${item.featured ? "bg-[#c6ff6b] text-[#172017]" : "bg-[#dfeecf] text-[#527735]"}`}><FaCheck aria-hidden="true" className="text-[9px]" /></span>{feature}</li>)}</ul>
              <a href="#estimator" className={`mt-auto flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-semibold ${item.featured ? "bg-[#c6ff6b] text-[#172017]" : "bg-[#172017] text-white"} ${focus}`}>Shape this project <FaArrowRight aria-hidden="true" /></a>
            </motion.article>)}
          </div>
          <p className="mt-5 text-center text-xl leading-6 text-black">Starting prices exclude domain, hosting, paid third-party subscriptions and applicable taxes unless your proposal says otherwise.</p>
        </div>
      </section>

      <section id="estimator" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="overflow-hidden rounded-[2.25rem] border border-[#cbd7c1] bg-[#eaf1e3] shadow-[0_30px_100px_-55px_rgba(23,32,23,.65)]">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-5 sm:p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#597f36]">The no-surprise-ish estimator</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Build a rough project range.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64745b]">Choose what sounds closest. This is an early planning range—not an automated quote or promise.</p>

                <fieldset className="mt-8"><legend className="mb-3 text-sm font-semibold">01 / What are we building?</legend><div className="grid gap-2 sm:grid-cols-2">{projectTypes.map((project) => <label key={project.id} className="cursor-pointer"><input type="radio" name="project-type" value={project.id} checked={type === project.id} onChange={() => setType(project.id)} className="peer sr-only" /><span className="flex h-full items-start justify-between gap-3 rounded-2xl border border-[#c5d2bb] bg-white/60 p-4 peer-checked:border-[#304a25] peer-checked:bg-[#172017] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#6da13e]"><span><span className="block text-sm font-semibold">{project.name}</span><span className="mt-1 block text-[10px] opacity-65">from {money.format(project.price)}</span></span><span className="mt-1 h-3 w-3 shrink-0 rounded-full border border-current peer-checked:bg-[#c6ff6b]" /></span></label>)}</div></fieldset>

                <fieldset className="mt-8"><legend className="mb-3 text-sm font-semibold">02 / Useful additions</legend><div className="grid gap-2 sm:grid-cols-2">{extras.map((extra) => { const checked = selectedExtras.includes(extra.id); return <label key={extra.id} className="cursor-pointer"><input type="checkbox" checked={checked} onChange={() => toggleExtra(extra.id)} className="peer sr-only" /><span className="flex items-center justify-between gap-3 rounded-xl border border-[#c5d2bb] bg-white/60 px-4 py-3 text-xs peer-checked:border-[#4f7638] peer-checked:bg-[#ddedce] peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#6da13e]"><span className="flex items-center gap-2"><span className={`grid h-5 w-5 place-items-center rounded-md border ${checked ? "border-[#4f7638] bg-[#4f7638] text-white" : "border-[#9eae92]"}`}>{checked && <FaCheck aria-hidden="true" className="text-[8px]" />}</span>{extra.name}</span><span className="shrink-0 text-[10px] opacity-65">+{money.format(extra.price)}</span></span></label>; })}</div></fieldset>

                <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#c5d2bb] bg-white/60 p-4"><input type="checkbox" checked={priority} onChange={(event) => setPriority(event.target.checked)} className="mt-1 h-4 w-4 accent-[#527735]" /><span><span className="block text-sm font-semibold">Priority timeline</span><span className="mt-1 block text-xs leading-5 text-[#64745b]">Adds a 20% planning allowance. Availability and an achievable date still need confirmation.</span></span></label>
              </div>

              <div className="relative flex min-h-120 flex-col bg-[#172017] p-6 text-white sm:p-8 lg:p-10">
                <div aria-hidden="true" className="absolute right-5 top-5 font-mono text-7xl font-black text-white/[0.035]">₹</div>
                <div className="relative"><div className="flex items-center justify-between gap-3"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9c8ae]">Live planning range</p><span className="rounded-full border border-white/10 px-3 py-1 text-[9px] text-[#b9c8ae]">Not a final quote</span></div>
                  <p className="mt-10 text-sm text-[#b9c8ae]">Estimated investment</p>
                  <motion.p key={`${estimate.low}-${estimate.high}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 wrap-break-word text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.06em] text-[#c6ff6b]">{money.format(estimate.low)}<span className="mx-2 text-2xl text-[#82927a]">–</span>{money.format(estimate.high)}</motion.p>
                  <p className="mt-5 text-sm leading-7 text-[#b9c8ae]">For a {estimate.project.name.toLowerCase()}{selectedExtras.length ? ` with ${selectedExtras.length} selected addition${selectedExtras.length > 1 ? "s" : ""}` : ""}. Final scope comes after a short conversation.</p>
                </div>
                <div className="relative mt-10 space-y-3 border-y border-white/10 py-6 text-xs text-[#b9c8ae]"><p className="flex justify-between gap-4"><span>Base project</span><span className="text-white">{money.format(estimate.project.price)}</span></p><p className="flex justify-between gap-4"><span>Selected additions</span><span className="text-white">{selectedExtras.length}</span></p><p className="flex justify-between gap-4"><span>Timeline</span><span className="text-right text-white">{priority ? "Priority requested" : "Standard / flexible"}</span></p></div>
                <div className="relative mt-auto pt-8"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`flex w-full items-center justify-between rounded-full bg-[#c6ff6b] px-5 py-4 text-sm font-semibold text-[#172017] hover:bg-[#b9f25f] ${focus}`}>Discuss this estimate <FaWhatsapp aria-hidden="true" className="text-xl" /></a><p className="mt-3 text-[10px] leading-5 text-[#9daa96]">Opens WhatsApp with your choices. You review the message before sending. No enquiry is submitted automatically.</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#dde7d5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.65fr_1fr]">
          <motion.div {...reveal}><p className="font-mono text-xs uppercase tracking-[0.25em] text-[#597f36]">Before you ask</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Small print.<br /><span className="font-serif font-normal italic text-[#597f36]">Human words.</span></h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#64745b]">Good projects begin with clarity. Here are the questions that usually matter before we write code.</p></motion.div>
          <div className="divide-y divide-black/10 border-y border-black/10">{faqs.map(([question, answer], index) => <details key={question} className="group py-1"><summary className={`flex cursor-pointer list-none items-center gap-4 py-5 text-base font-semibold ${focus}`}><span className="font-mono text-[10px] text-[#718065]">0{index + 1}</span><span>{question}</span><span className="ml-auto grid h-7 w-7 place-items-center rounded-full border border-black/10 text-lg font-normal transition-transform group-open:rotate-45">+</span></summary><p className="pb-6 pl-10 pr-8 text-sm leading-7 text-[#5e6e57]">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <motion.div {...reveal} className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#c6ff6b] p-7 sm:p-10 lg:p-16">
          <div aria-hidden="true" className="absolute -right-12 -top-24 text-[18rem] font-black leading-none text-[#172017]/4.5">?</div>
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#466331]">Not sure which package fits?</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[.98] tracking-tighter sm:text-6xl lg:text-7xl">Send the messy version of your idea.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#466331]">You don&apos;t need a technical brief. Tell me what should become easier for your customers or team, and we&apos;ll find the sensible first version.</p></div><a href="https://wa.me/918218969834?text=Hi%20Siddhant%21%20I%20have%20a%20project%20idea%20and%20I%27m%20not%20sure%20which%20service%20fits.%20Can%20we%20discuss%20it%3F" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#172017] px-7 py-4 text-sm font-semibold text-white hover:bg-[#304a25] ${focus}`}>Tell me the idea <FaArrowRight aria-hidden="true" /></a></div>
        </motion.div>
      </section>
    </main>
  );
}
