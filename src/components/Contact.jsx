import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaRobot,
  FaArrowRight,
  FaRegSmile,
} from "react-icons/fa";

const CONTACT = {
  email: "siddhantsiddhant163@gmail.com",
  phone: "+91 82189 69834",
  phoneLink: "+918218969834",
  whatsapp: "918218969834",
  location: "Meerut, Uttar Pradesh, India",
  github: "https://github.com/siddhantgrove",
  linkedin: "https://www.linkedin.com/in/siddhant-grover-8a9176279/",
};

const projectTypes = [
  "Website",
  "Web application",
  "Redesign",
  "Not sure yet",
];

const robotMessages = [
  "A rough idea is enough. I speak fluent “something like this.”",
  "No technical brief? No problem. Human sentences work too.",
  "Your idea deserves more than another forgotten browser tab.",
  "Still figuring it out? That’s a perfectly good starting point.",
];

const quickWhatsApp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hello Siddhant! I visited your portfolio and would like to discuss a project."
)}`;

export default function Contact() {
  const reducedMotion = useReducedMotion();

  const [projectType, setProjectType] = useState("Website");
  const [message, setMessage] = useState("");
  const [robotIndex, setRobotIndex] = useState(0);
  const [draft, setDraft] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const details = String(formData.get("message") || "").trim();

    if (!name || !details) {
      setDraft({
        error: true,
        text: "Please add your name and a little about your idea.",
      });
      return;
    }

    const channel =
      event.nativeEvent.submitter?.value || "whatsapp";

    const subject = `Project enquiry: ${projectType}`;

    const body = [
      `Hello Siddhant!`,
      "",
      `I'm ${name}.`,
      `I'm interested in: ${projectType}.`,
      email ? `My email: ${email}` : "",
      "",
      "Here’s what I have in mind:",
      details,
      "",
      "I found you through your portfolio.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url =
      channel === "email"
        ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`
        : `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
            body
          )}`;

    setDraft({
      error: false,
      channel,
      url,
      text:
        channel === "email"
          ? "Review the draft in your email app, then send it."
          : "Review your message in WhatsApp, then send it.",
    });

    if (channel === "email") {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // Keep the form filled in case the visitor needs to try again.
    // Opening a draft does not mean the message has been sent.
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-[#d6dccd] bg-[#f8f9f4] px-4 py-3.5 text-base text-[#172017] outline-none transition-colors placeholder:text-[#8a9481] focus:border-[#597f36] focus:ring-2 focus:ring-[#c6ff6b]/40";

  return (
    <section
      id="contact"
      className="relative overflow-x-clip bg-[#f3f4ec] px-5 py-20 text-[#172017] sm:px-8 md:py-28 lg:px-12"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#c6ff6b]/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-between gap-5 border-b border-black/15 pb-5">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#66705f]">
            <span className="h-2 w-2 rounded-full bg-[#5e9d26]" />
            Let’s connect
          </p>

          <span className="hidden font-mono text-xs text-[#66705f] sm:block">
            IDEAS WELCOME. JARGON OPTIONAL.
          </span>
        </div>

        {/* Heading */}
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <h2 className="text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
            A good project
            <br />

            <span className="font-serif font-normal italic text-[#5e9d26]">
              starts with a hello.
            </span>
          </h2>

          <p className="max-w-md text-base leading-8 text-[#66705f] lg:ml-auto">
            Need a website, a web application, or help improving
            something you already have? Tell me what you’re thinking.
            We can figure out the technical bits together.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* Playful robot card */}
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#172017] p-7 text-white sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -top-5 select-none font-mono text-[8rem] font-bold text-white/[0.035]"
              >
                {"</>"}
              </div>

              <div className="relative flex items-start gap-5">
                <motion.button
                  type="button"
                  aria-label="Hear another message from the robot"
                  onClick={() =>
                    setRobotIndex(
                      (current) => (current + 1) % robotMessages.length
                    )
                  }
                  whileHover={
                    reducedMotion ? undefined : { rotate: -8, scale: 1.06 }
                  }
                  whileTap={
                    reducedMotion ? undefined : { scale: 0.94 }
                  }
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#c6ff6b] text-4xl text-[#172017] shadow-lg outline-offset-4 focus-visible:outline focus-visible:outline-[#c6ff6b]"
                >
                  <FaRobot aria-hidden="true" />
                </motion.button>

                <div className="pt-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c6ff6b]">
                    Your friendly brief assistant
                  </p>

                  <p
                    aria-live="polite"
                    className="mt-3 min-h-21 text-lg leading-7 text-white/90"
                  >
                    {robotMessages[robotIndex]}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                <span className="text-xl text-white">
                  Tap the robot. It has opinions.
                </span>

                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-[#c6ff6b]"
                >
                  {String(robotIndex + 1).padStart(2, "0")} / 04
                </span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={quickWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#bdd29d] bg-[#e7efd9] p-5 transition-colors hover:bg-[#dcebc6] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#263f24] text-2xl text-white">
                <FaWhatsapp aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold">
                  Prefer a quick conversation?
                </span>

                <span className="mt-1 block text-sm text-[#627557]">
                  Say hello on WhatsApp.
                </span>
              </span>

              <FaArrowRight
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* Contact information */}
            <div className="rounded-2xl border border-black/10 bg-white/70 p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaEnvelope
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#5e9d26]"
                  />

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-[#7b8573]">
                      Email
                    </p>

                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-1 block break-all text-sm font-medium hover:text-[#5e9d26]"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#5e9d26]"
                  />

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7b8573]">
                      Phone
                    </p>

                    <a
                      href={`tel:${CONTACT.phoneLink}`}
                      className="mt-1 block text-sm font-medium hover:text-[#5e9d26]"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#5e9d26]"
                  />

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7b8573]">
                      Based in
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {CONTACT.location}
                    </p>

                    <p className="mt-1 text-xs text-[#7b8573]">
                      Available for remote collaboration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social profiles */}
              <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                <SocialLink
                  href={CONTACT.github}
                  label="Visit my GitHub profile"
                  icon={FaGithub}
                />

                <SocialLink
                  href={CONTACT.linkedin}
                  label="Visit my LinkedIn profile"
                  icon={FaLinkedin}
                />

                <span className="ml-auto text-xs text-[#7b8573]">
                  Find me around the web ↗
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ENQUIRY FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-[#dce2d3] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(23,32,23,0.3)] sm:p-8 lg:p-10"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#718065]">
                  Tell me a little
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  What’s on your mind?
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#718065]">
                  A few sentences are enough to get started.
                </p>
              </div>

              <FaRegSmile
                aria-hidden="true"
                className="mt-2 hidden shrink-0 text-4xl text-[#7ca648] sm:block"
              />
            </div>

            {/* Project type */}
            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                I’m thinking about…
              </legend>

              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="radio"
                      name="project_type"
                      value={type}
                      checked={projectType === type}
                      onChange={() => setProjectType(type)}
                      className="peer sr-only"
                    />

                    <span className="block rounded-full border border-[#d6dccd] px-4 py-2.5 text-sm text-[#66705f] transition-colors peer-checked:border-[#263f24] peer-checked:bg-[#263f24] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#597f36]">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Name and email */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="min-w-0">
                <span className="mb-2 block text-sm font-medium">
                  Your name
                </span>

                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="What should I call you?"
                  required
                  maxLength={80}
                  className={inputClass}
                />
              </label>

              <label className="min-w-0">
                <span className="mb-2 block text-sm font-medium">
                  Email{" "}
                  <span className="font-normal text-[#8a9481]">
                    (optional)
                  </span>
                </span>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  className={inputClass}
                />
              </label>
            </div>

            {/* Project message */}
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium">
                A little about your idea
              </span>

              <textarea
                name="message"
                rows={5}
                required
                maxLength={1200}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What would you like to build or improve? Share a goal, a reference, or the problem you’re trying to solve."
                className={`${inputClass} min-h-37.5 resize-y`}
              />

              <span className="mt-2 block text-right font-mono text-xs text-[#8a9481]">
                {message.length} / 1200
              </span>
            </label>

            {/* Primary action */}
            <motion.button
              type="submit"
              name="channel"
              value="whatsapp"
              whileHover={
                reducedMotion ? undefined : { y: -2 }
              }
              whileTap={
                reducedMotion ? undefined : { scale: 0.98 }
              }
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#c6ff6b] px-5 py-4 text-base font-semibold text-[#172017] transition-colors hover:bg-[#b8f15f] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"
            >
              <FaWhatsapp aria-hidden="true" className="text-xl" />
              Continue on WhatsApp
              <FaArrowRight aria-hidden="true" className="ml-1 text-sm" />
            </motion.button>

            {/* Email alternative */}
            <button
              type="submit"
              name="channel"
              value="email"
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-full border border-[#d6dccd] px-5 py-3.5 text-sm font-medium text-[#526648] transition-colors hover:bg-[#f3f6ed] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"
            >
              <FaEnvelope aria-hidden="true" />
              Open an email draft instead
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#7b8573]">
              Opens WhatsApp or your email app.
              <br />
              You review the message before sending.
            </p>

            {/* Honest status + fallback link */}
            {draft && (
              <div
                role={draft.error ? "alert" : "status"}
                className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${
                  draft.error
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-[#c7d9b2] bg-[#eff6e6] text-[#425e31]"
                }`}
              >
                <p>{draft.text}</p>

                {!draft.error && (
                  <a
                    href={draft.url}
                    target={
                      draft.channel === "whatsapp" ? "_blank" : undefined
                    }
                    rel={
                      draft.channel === "whatsapp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-2 inline-block font-semibold underline underline-offset-4"
                  >
                    Didn’t open? Try this link.
                  </a>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Closing line */}
        <div className="mt-10 flex items-center justify-center gap-3 text-center">
          <span aria-hidden="true" className="text-xl">
            ☕
          </span>

          <p className="text-sm leading-6 text-[#718065]">
            Bring the idea. We’ll work out the next step.
          </p>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-xl text-[#526648] transition-colors hover:bg-[#263f24] hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#597f36]"
    >
      <Icon aria-hidden="true" />
    </a>
  );
}