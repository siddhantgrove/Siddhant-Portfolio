import { motion } from "motion/react";
import {
  FaLaptopCode,
  FaRocket,
  FaLocationDot,
  FaGraduationCap,
  FaCheck,
} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


const cards = [
  {
    number: "01",
    icon: FaLaptopCode,
    title: "Projects built",
    value: "20+",
    description: "Websites, landing pages and interactive React experiences.",
    color: "bg-[#c6ff6b]",
    textColor: "text-[#101310]",
  },
  {
    number: "02",
    icon: FaRocket,
    title: "Currently exploring",
    value: "AI + GenAI",
    description: "Bringing smarter interactions into modern web products.",
    color: "bg-[#a9c7ff]",
    textColor: "text-[#101310]",
  },
  {
    number: "03",
    icon: FaLocationDot,
    title: "Based in",
    value: "India",
    description: "Available for remote freelance work and collaborations.",
    color: "bg-[#1a201a]",
    textColor: "text-white",
  },
  {
    number: "04",
    icon: FaGraduationCap,
    title: "Education",
    value: "MCA Student",
    description: "Growing through study, experiments and real projects.",
    color: "bg-[#d9c5ff]",
    textColor: "text-[#101310]",
  },
];

const services = [
  "Responsive websites",
  "React development",
  "Landing pages",
  "Prompt engineering",
  "Interactive experiences",
  "API integration",
  "Full-stack development",
  "Custom solutions",
  "Maintenance & support",
  "Performance optimization",
  "Trendy UI/UX design",
  "Hosting & deployment",
  

];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f3f4ec] px-5 py-20 text-[#121612] sm:px-8 md:py-28 lg:px-12"
    >
      {/* Background grid */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#101310 1px, transparent 1px), linear-gradient(90deg, #101310 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      /> */}

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-112.5 w-112.5 rounded-full bg-[#c6ff6b]/25 blur-[130px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="relative mx-auto max-w-7xl"
      >
        {/* Section label */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex items-center justify-between gap-5 border-b border-black/15 pb-5"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5e9d26]" />

            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/55">
              02 — About me
            </p>
          </div>

          <p className="hidden font-mono text-xs uppercase tracking-[0.18em] text-black/45 sm:block">
            Developer · Problem solver · Builder
          </p>
        </motion.div>

        {/* Main heading */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.h2
            variants={itemVariants}
            className="text-[clamp(3.4rem,8vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]"
          >
            I turn ideas
            <br />

            <span className="font-serif font-normal italic text-[#5e9d26]">
              into interfaces.
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="max-w-lg lg:pb-2"
          >
            <p className="text-base leading-8 text-black/60 md:text-lg">
             I turn ideas into websites and web applications that
              look sharp, work smoothly, and solve real problems. 
              From landing pages to custom full-stack solutions, I handle design, development, API integrations, hosting, and deployment
              —with performance improvements and ongoing support after launch.

            </p>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Main freelance card */}
          <motion.article
            variants={itemVariants}
            className="relative overflow-hidden rounded-4xl bg-[#111511] p-7 text-white sm:p-9 lg:col-span-7 lg:p-11"
          >
            {/* Decorative code */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-5 select-none font-mono text-[7rem] font-bold leading-none text-white/[0.035] sm:text-[10rem]"
            >
              {"</>"}
            </div>

            <div className="relative">
              {/* Availability */}
              <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-[#c6ff6b]/25 bg-[#c6ff6b]/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff6b] opacity-60" />

                  <span className="relative h-2 w-2 rounded-full bg-[#c6ff6b]" />
                </span>

                <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-[#c6ff6b]">
                  Available for freelance projects
                </span>
              </div>

              <p className="max-w-xl text-2xl font-medium leading-snug tracking-tight text-white/95 sm:text-3xl">
                I help businesses and creative teams turn their ideas
                into fast, responsive and memorable websites.
              </p>

              {/* Services */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#c6ff6b] text-[#101310]">
                      <FaCheck size={9} />
                    </span>

                    {service}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-between gap-8 rounded-full bg-[#c6ff6b] px-6 py-4 text-sm font-semibold text-[#101310] transition-transform duration-300 hover:-translate-y-1"
                >
                  Start a project

                  <FaArrowUpRightFromSquare className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>

                <a
                  href="#projects"
                  className="group inline-flex items-center justify-between gap-8 rounded-full border border-white/20 px-6 py-4 text-sm text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  View my work

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </motion.article>

          {/* Personality card */}
          <motion.article
            variants={itemVariants}
            className="relative flex min-h-87.5 flex-col justify-between overflow-hidden rounded-4xl bg-[#d9c5ff] p-7 text-[#17131e] sm:p-9 lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="absolute right-6 top-3 font-serif text-[8rem] italic leading-none text-black/6"
            >
              “
            </div>

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
                How I think
              </p>

              <h3 className="mt-6 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                Clean code is good.
                <br />

                <span className="font-serif font-normal italic">
                  Clear thinking is better.
                </span>
              </h3>
            </div>

            <div className="relative mt-12 border-t border-black/15 pt-6">
              <p className="text-sm leading-7 text-black/60">
                I care about the small details—spacing, responsiveness,
                loading states and the two pixels that somehow still
                don’t look right.
              </p>
            </div>
          </motion.article>

          {/* Information cards */}
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                variants={itemVariants}
                whileHover={{
                  y: -7,
                  rotate: -0.7,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`group relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7 lg:col-span-3 ${card.color} ${card.textColor}`}
              >
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-current/15 bg-white/10 text-xl">
                    <Icon />
                  </div>

                  <span className="font-mono text-xs opacity-45">
                    {card.number}
                  </span>
                </div>

                <p className="text-sm opacity-55">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                  {card.value}
                </h3>

                <p className="mt-4 text-sm leading-6 opacity-60">
                  {card.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        {/* Closing strip */}
        <motion.div
          variants={itemVariants}
          className="mt-5 flex flex-col justify-between gap-5 rounded-3xl border border-black/10 bg-white/60 px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center"
        >
          <p className="text-sm leading-6 text-black/55">
            Have an idea but aren’t sure how to build it?
            <span className="ml-1 font-medium text-black">
              Let’s figure it out together.
            </span>
          </p>

          <a
            href="#contact"
            className="group flex shrink-0 items-center gap-3 text-sm font-semibold"
          >
            Tell me about your project

            <FaArrowUpRightFromSquare className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}