import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaPause,
  FaPlay,
  FaQuoteLeft,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { FaArrowRightLong, FaCirclePlay } from "react-icons/fa6";
import ClientStoryVideo from "../../public/client-stories/client-review.MP4";

/*
  Replace these placeholders only with genuine client stories.
  Put videos inside public/client-stories and use paths such as:
  video: "/client-stories/client-name.mp4"
*/
const stories = [
  {
    id: "story-one",
    client: "Your first client",
    company: "Company / Brand",
    project: "React website & deployment",
    quote: "Replace this with the client’s exact, approved review.",
    video: "",
    poster: "",
    accent: "#c6ff6b",
    result: "Add a verified result",
    metric: "—",
    metricLabel: "measured improvement",
    link: "",
    journey: [
      { label: "The problem", text: "Describe the real business problem the client brought to you." },
      { label: "The build", text: "Explain your solution, technology choices, and collaboration style." },
      { label: "The result", text: "Add an honest, measurable outcome after the project launches." },
    ],
  },
  {
    id: "story-two",
    client: "Your next collaborator",
    company: "Startup / Local business",
    project: "Landing page & lead flow",
    quote: "A real face, a real project, and a real result will live here.",
    video: "",
    poster: "",
    accent: "#ffb74d",
    result: "Story currently being earned",
    metric: "Soon",
    metricLabel: "client story incoming",
    link: "",
    journey: [
      { label: "The problem", text: "Show what was confusing, slow, or missing before your work." },
      { label: "The build", text: "Show a few purposeful decisions—not a giant list of features." },
      { label: "The result", text: "Use analytics, speed scores, conversions, or delivery time." },
    ],
  },
  {
    id: "your-story",
    client: "Could this be you?",
    company: "Now accepting projects",
    project: "Your idea, built properly",
    quote: "The next story starts with one useful conversation.",
    video: "",
    poster: "",
    accent: "#8ad7ff",
    result: "Let’s create the evidence",
    metric: "01",
    metricLabel: "conversation to begin",
    link: "",
    journey: [
      { label: "Tell me", text: "Share the goal, audience, deadline, and what success should look like." },
      { label: "See the plan", text: "Receive a clear scope, practical timeline, and transparent price." },
      { label: "Launch together", text: "Review the work, deploy it, and continue with reliable support." },
    ],
  },
];

const proofTape = [
  "Real people",
  "Real projects",
  "Permission approved",
  "Results over promises",
  "No fake testimonials",
  "Built & deployed",
];

function VideoStage({ story }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggleVideo = async () => {
    if (!story.video || !videoRef.current) return;
    if (videoRef.current.paused) await videoRef.current.play();
    else videoRef.current.pause();
  };

  return (
    <div className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/15 bg-[#0c120d] shadow-[0_35px_100px_rgba(0,0,0,.38)] sm:rounded-[2.5rem]">
      {story.video ? (
        <video
          ref={videoRef}
          src={story.video}
          poster={story.poster || undefined}
          muted={muted}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(198,255,107,.2),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,183,77,.16),transparent_35%),#0c120d] p-8 text-center">
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] bg-size-[42px_42px]" />
          <div className="relative">
            <FaCirclePlay className="mx-auto text-6xl text-[#c6ff6b] sm:text-8xl" />
            <p className="mt-5 text-xl font-black sm:text-3xl">Client film goes here</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
              Add a genuine edited review video to <span className="font-mono text-white/75">public/client-stories</span>.
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/25" />
      <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[.22em] backdrop-blur-xl sm:left-7 sm:top-7">
        Client story
      </div>

      {story.video && (
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between sm:bottom-7 sm:left-7 sm:right-7">
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={playing ? "Pause client story" : "Play client story"}
            className="grid h-14 w-14 place-items-center rounded-full bg-[#c6ff6b] text-[#172017] transition hover:scale-105"
          >
            {playing ? <FaPause /> : <FaPlay className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/35 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ClientStories({ navigateTo }) {
  const reduceMotion = useReducedMotion();

{/*new area added here*/}

  const heroVideoRef = useRef(null);
const [heroMuted, setHeroMuted] = useState(true);

const toggleHeroSound = async () => {
  const video = heroVideoRef.current;

  if (!video) return;

  video.muted = !heroMuted;
  setHeroMuted(!heroMuted);

  if (video.paused) {
    try {
      await video.play();
    } catch (error) {
      console.log("Browser blocked video playback:", error);
    }
  }
};

  const [activeIndex, setActiveIndex] = useState(0);
  const story = stories[activeIndex];

  const orderedDots = useMemo(() => stories.map((item) => item.id), []);

  const changeStory = (direction) => {
    setActiveIndex((current) => (current + direction + stories.length) % stories.length);
  };

  const startProject = () => {
    if (typeof navigateTo === "function") {
      navigateTo("contact", "Contact");
      return;
    }
    window.location.href = "/#contact";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#172017] text-[#f7f5ea] selection:bg-[#c6ff6b] selection:text-[#172017]">
      {/* <section className="relative px-5 pb-20 pt-36 sm:px-8 lg:px-12 lg:pb-28">
        <div className="pointer-events-none absolute -left-48 top-20 h-128 w-lg rounded-full bg-lime-300/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end"
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[.3em] text-[#c6ff6b]">
                Client stories · proof in motion
              </p>
              <h1 className="mt-6 max-w-5xl text-[clamp(3.7rem,9.5vw,9rem)] font-black leading-[.82] tracking-[-.075em]">
                Don’t take
                <span className="block text-white/35">my word.</span>
              </h1>
            </div>
            <div className="border-l border-white/15 pl-6 sm:pl-8">
              <FaQuoteLeft className="text-3xl text-[#c6ff6b]" />
              <p className="mt-5 text-xl font-semibold leading-8 sm:text-2xl">
                Watch the people behind the projects tell you what working together actually felt like.
              </p>
              <p className="mt-5 text-sm leading-6 text-white/45">
                Every published story should be genuine, client-approved, and connected to real work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center"
            >
              <VideoStage story={story} />

              <article>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: story.accent }} />
                  <p className="font-mono text-xs uppercase tracking-[.24em] text-white/40">Featured conversation</p>
                </div>
                <blockquote className="mt-7 text-3xl font-black leading-tight tracking-[-.035em] sm:text-5xl">
                  “{story.quote}”
                </blockquote>
                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-xl font-bold">{story.client}</p>
                  <p className="mt-1 text-white/45">{story.company} · {story.project}</p>
                  {story.link && (
                    <a href={story.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c6ff6b]">
                      View live project <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>

                <div className="mt-9 flex items-center justify-between">
                  <div className="flex gap-2" aria-label="Choose client story">
                    {orderedDots.map((id, index) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show story ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-10 bg-[#c6ff6b]" : "w-2.5 bg-white/20 hover:bg-white/45"}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => changeStory(-1)} aria-label="Previous story" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#172017]">
                      <FaArrowLeft />
                    </button>
                    <button type="button" onClick={() => changeStory(1)} aria-label="Next story" className="grid h-12 w-12 place-items-center rounded-full bg-[#c6ff6b] text-[#172017] transition hover:scale-105">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>
      </section> */}
      {/* FULLSCREEN CLIENT VIDEO HERO */}

      {/* FLOATING SOUND BUTTON */}

      {/* FLOATING MUTE BUTTON */
      }
<motion.button
  type="button"
  onClick={toggleHeroSound}
  initial={{ opacity: 0, scale: 0.5, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  whileHover={{ scale: 1.07 }}
  whileTap={{ scale: 0.92 }}
  transition={{ delay: 1, type: "spring", stiffness: 250 }}
  aria-label={heroMuted ? "Turn sound on" : "Mute video"}
  className="
    group absolute bottom-28 right-5 z-30 
    flex items-center gap-3 rounded-full
    border border-white/20 bg-black/40
    p-2 pr-4 text-white shadow-2xl
    backdrop-blur-xl
    sm:bottom-10 sm:right-10
  "
>
  <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#c6ff6b] text-lg text-[#172017]">
    {heroMuted ? <FaVolumeMute /> : <FaVolumeUp />}

    {!heroMuted && (
      <span className="absolute inset-0 animate-ping rounded-full border border-[#c6ff6b]/70" />
    )}
  </span>

  <span className="text-left">
    <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white">
      BackGround Audio
    </span>

    <span className="block text-xs font-bold">
      {heroMuted ? "Turn sound on" : "Sound is playing"}
    </span>
  </span>
</motion.button>

<section className="relative min-h-screen overflow-hidden bg-black">
  {/* Background video */}
<video
  ref={heroVideoRef}
  autoPlay
  muted={heroMuted}
  loop
  playsInline
  poster="/client-stories/client-poster.webp"
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src={ClientStoryVideo} type="video/mp4" />
</video>

  {/* Cinematic overlays */}
  <div className="absolute inset-0 bg-black/30" />
  <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-black/40" />
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />

  {/* Content */}
  {/* <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-16 pt-36 sm:px-8 md:pb-24 lg:px-12"> */}
    {/* <motion.div
      initial={{
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-5xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#c6ff6b]" />

        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#c6ff6b]">
          Client stories · proof in motion
        </p>
      </div>

      <h1 className="text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.075em] text-white">
        Don’t take
        <span className="block text-[#c6ff6b]">
          my word.
        </span>
      </h1>

      <div className="mt-8 max-w-2xl border-l-2 border-[#c6ff6b] pl-6">
        <FaQuoteLeft className="mb-4 text-2xl text-[#c6ff6b]" />

        <blockquote className="text-xl font-semibold leading-8 text-white sm:text-3xl">
          “{story.quote}”
        </blockquote>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-white">
            {story.client}
          </span>

          <span className="text-white/40">•</span>

          <span className="text-white/65">
            {story.company}
          </span>

          <span className="text-white/40">•</span>

          <span className="text-white/65">
            {story.project}
          </span>
        </div>
      </div>

      {/* Story controls */}
      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => changeStory(-1)}
          aria-label="Previous story"
          className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          <FaArrowLeft />
        </button>

        <button
          type="button"
          onClick={() => changeStory(1)}
          aria-label="Next story"
          className="grid h-12 w-12 place-items-center rounded-full bg-[#c6ff6b] text-[#172017] transition hover:scale-105"
        >
          <FaArrowRight />
        </button>

        <div className="ml-3 flex gap-2">
          {orderedDots.map((id, index) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show story ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-10 bg-[#c6ff6b]"
                  : "w-2.5 bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    {/* </motion.div> */}
  {/* </div> */}

  {/* Scroll hint */}
  <motion.div
    animate={
      reduceMotion
        ? undefined
        : {
            y: [0, 8, 0],
          }
    }
    transition={{
      duration: 1.6,
      repeat: Infinity,
    }}
    className="absolute bottom-10 right-6 z-10 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white md:flex"
  >
    Scroll for the build
    <span aria-hidden="true">↓</span>
  </motion.div>
</section>

      <div className="border-y border-[#172017]/15 bg-[#c6ff6b] py-4 text-[#172017]">
        <motion.div
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {[...proofTape, ...proofTape].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-5 px-5 text-xs font-black uppercase tracking-[.25em] sm:text-sm">
              {item} <span>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <section className="bg-[#f5f3e8] px-5 py-24 text-[#172017] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[.28em] text-[#65735f]">Behind the applause</p>
              <h2 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.055em] sm:text-7xl">The work<br />before the words.</h2>
              <div className="mt-10 rounded-3xl bg-[#172017] p-7 text-white">
                <p className="text-6xl font-black" style={{ color: story.accent }}>{story.metric}</p>
                <p className="mt-2 text-sm text-white/50">{story.metricLabel}</p>
                <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-bold text-[#c6ff6b]">
                  <FaCheck /> {story.result}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {story.journey.map((step, index) => (
                <motion.article
                  key={step.label}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.1 }}
                  className="group grid gap-4 rounded-3xl border border-[#172017]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[5rem_1fr] sm:p-8"
                >
                  <span className="font-mono text-sm font-black text-[#7b8975]">0{index + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black">{step.label}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-[#52604e]">{step.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(198,255,107,.13),transparent_38%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[.3em] text-[#c6ff6b]">There’s room for one more</p>
          <h2 className="mt-7 text-[clamp(3.5rem,9vw,8rem)] font-black leading-[.84] tracking-[-.07em]">
            Want to be the<br /><span className="text-[#c6ff6b]">next story?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
            Bring the idea. I’ll bring the plan, code, communication, and deployment energy.
          </p>
          <motion.button
            type="button"
            onClick={startProject}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group mx-auto mt-10 flex items-center gap-5 rounded-full bg-[#c6ff6b] px-8 py-5 text-lg font-black text-[#172017] shadow-[0_20px_70px_rgba(198,255,107,.18)]"
          >
            Start our story
            <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
