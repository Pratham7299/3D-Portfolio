import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/content";
import { downloadResume, printResume } from "@/lib/resume";
import { Icon } from "./ui/Icon";
import { DemoNote, GlassCard, Magnetic, Reveal, Section, SectionHeading } from "./ui/primitives";
import { cn } from "@/utils/cn";

type Fields = { name: string; email: string; org: string; topic: string; message: string };
const empty: Fields = { name: "", email: "", org: "", topic: "Sales / Biz Dev role", message: "" };

const topics = ["Sales / Biz Dev role", "Digital marketing role", "Freelance campaign help", "Just say hi"];

export function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    setErrors((v) => ({ ...v, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<keyof Fields, string>> = {};
    if (f.name.trim().length < 2) err.name = "Tell me who you are";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) err.email = "A reachable email, please";
    if (f.message.trim().length < 12) err.message = "A sentence or two is plenty";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    window.setTimeout(() => setState("sent"), 1150);
  };

  const inputCls =
    "w-full rounded-xl border bg-white/[0.03] px-3.5 py-3 text-[14px] text-chalk placeholder:text-mist/40 outline-none transition-all duration-300 focus:border-electric/60 focus:bg-electric/[0.06]";

  return (
    <Section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        index="06"
        eyebrow="Contact"
        title={
          <>
            Let's turn attention
            <br />
            <span className="text-mist">into pipeline.</span>
          </>
        }
        lead="Hiring for a sales, marketing or biz-dev seat — or want a second pair of hands on a campaign? Write to me. I reply within 24 hours, usually faster."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* left: channels */}
        <div className="space-y-4 lg:col-span-5">
          <Reveal>
            <GlassCard className="rounded-[22px] p-5 sm:p-6">
              <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">direct channels</p>
              <a
                href={`mailto:${profile.email}`}
                className="ring-focus group mt-4 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-electric/40 hover:bg-electric/[0.07]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-electric/25 bg-electric/10 text-electric-2 transition-transform duration-300 group-hover:scale-110">
                  <Icon name="mail" className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-mono tracking-[0.16em] text-mist/60 uppercase">email</span>
                  <span className="block truncate text-[14px] font-medium text-chalk">{profile.email}</span>
                </span>
                <Icon name="arrowUpRight" className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="ring-focus group mt-3 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-volt/40 hover:bg-volt/[0.07]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-volt/25 bg-volt/10 text-volt-2 transition-transform duration-300 group-hover:scale-110">
                  <Icon name="linkedin" className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] tracking-[0.16em] text-mist/60 uppercase">linkedin</span>
                  <span className="block truncate text-[14px] font-medium text-chalk">{profile.linkedinLabel}</span>
                </span>
                <Icon name="arrowUpRight" className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk" />
              </a>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-mist/55">
                ↑ placeholder handle — swap in the live profile URL before publishing.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { i: "pin" as const, k: "Based in", v: "Greater Noida" },
                  { i: "globe" as const, k: "Work mode", v: "Remote / Hybrid" },
                ].map((x) => (
                  <div key={x.k} className="rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-3">
                    <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-mist/60 uppercase">
                      <Icon name={x.i} className="h-3 w-3 text-electric-2" />
                      {x.k}
                    </p>
                    <p className="mt-1.5 text-[13px] font-medium text-chalk">{x.v}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="rounded-[22px] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">résumé</p>
                  <h3 className="mt-2 font-display text-[17px] font-semibold text-chalk">One page, no fluff</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mist">
                    Education, skill tracks and the five concept projects — generated live from this portfolio, so it's
                    never out of date.
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-electric to-volt text-white">
                  <Icon name="download" className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Magnetic strength={0.16}>
                  <button
                    onClick={downloadResume}
                    className="ring-focus btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white"
                  >
                    <span className="relative">Download résumé</span>
                    <Icon name="download" className="relative h-3.5 w-3.5" />
                  </button>
                </Magnetic>
                <button
                  onClick={printResume}
                  className="ring-focus flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[13.5px] font-medium text-chalk transition-colors duration-300 hover:border-electric/45 hover:bg-electric/10"
                >
                  <Icon name="layers" className="h-3.5 w-3.5 text-electric-2" />
                  Print / Save as PDF
                </button>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass-soft rounded-[22px] p-5 sm:p-6">
              <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">looking for</p>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Entry-level sales / business development (SaaS or AI products)",
                  "Digital marketing & content roles where data is welcome",
                  "Teams that will let me run small, measurable experiments",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-mist">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-lime" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal delay={0.05} className="lg:col-span-7">
          <GlassCard className="relative overflow-hidden rounded-[22px] p-5 sm:p-7">
            <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-volt/12 blur-3xl" />
            <AnimatePresence mode="wait">
              {state !== "sent" ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submit}
                  className="relative"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[19px] font-semibold text-chalk">Send a message</h3>
                    <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.18em] text-lime uppercase">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" /> available
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] text-mist/70 uppercase">your name *</span>
                      <input
                        value={f.name}
                        onChange={set("name")}
                        placeholder="Priya Sharma"
                        className={cn(inputCls, errors.name ? "border-amber/60" : "border-white/10")}
                      />
                      {errors.name && <span className="mt-1 block text-[11px] text-amber">{errors.name}</span>}
                    </label>
                    <label className="block">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] text-mist/70 uppercase">email *</span>
                      <input
                        value={f.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        className={cn(inputCls, errors.email ? "border-amber/60" : "border-white/10")}
                      />
                      {errors.email && <span className="mt-1 block text-[11px] text-amber">{errors.email}</span>}
                    </label>
                    <label className="block">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] text-mist/70 uppercase">company</span>
                      <input value={f.org} onChange={set("org")} placeholder="Optional" className={cn(inputCls, "border-white/10")} />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] text-mist/70 uppercase">subject</span>
                      <select value={f.topic} onChange={set("topic")} className={cn(inputCls, "border-white/10 appearance-none")}>
                        {topics.map((t) => (
                          <option key={t} value={t} className="bg-abyss">
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mt-4 block">
                    <span className="font-mono text-[9.5px] tracking-[0.2em] text-mist/70 uppercase">message *</span>
                    <textarea
                      value={f.message}
                      onChange={set("message")}
                      rows={5}
                      placeholder="What are you trying to grow, and what's in the way?"
                      className={cn(inputCls, "resize-none leading-relaxed", errors.message ? "border-amber/60" : "border-white/10")}
                    />
                    {errors.message && <span className="mt-1 block text-[11px] text-amber">{errors.message}</span>}
                  </label>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Magnetic strength={0.14}>
                      <button
                        type="submit"
                        disabled={state === "sending"}
                        className="ring-focus btn-primary flex items-center gap-2.5 rounded-xl px-6 py-3 text-[14px] font-semibold text-white disabled:opacity-70"
                      >
                        <span className="relative">{state === "sending" ? "Sending…" : "Send message"}</span>
                        <Icon
                          name={state === "sending" ? "gauge" : "arrowRight"}
                          className={cn("relative h-4 w-4", state === "sending" && "spin-slow")}
                        />
                      </button>
                    </Magnetic>
                    <p className="max-w-[240px] text-[11.5px] leading-snug text-mist/60">
                      Demo form — it validates locally and doesn't transmit anything. Use the email above for real mail.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative grid min-h-[380px] place-items-center py-8 text-center"
                >
                  <div>
                    <motion.span
                      initial={{ scale: 0.4, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-lime/80 to-electric text-void"
                    >
                      <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
                    </motion.span>
                    <h3 className="mt-5 font-display text-[22px] font-semibold text-chalk">Message queued, {f.name.split(" ")[0]}.</h3>
                    <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-mist">
                      In a real deployment this would hit my inbox and auto-reply. Here it stays on your device — which
                      is exactly the kind of honest demo I'd rather ship.
                    </p>
                    <button
                      onClick={() => {
                        setState("idle");
                        setF(empty);
                      }}
                      className="ring-focus mt-6 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-chalk transition-colors hover:border-electric/45 hover:bg-electric/10"
                    >
                      Write another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <DemoNote className="mx-auto mt-8 max-w-2xl" />
      </Reveal>
    </Section>
  );
}
