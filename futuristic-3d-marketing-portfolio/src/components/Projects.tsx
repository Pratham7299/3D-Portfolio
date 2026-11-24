import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/data/content";
import { ProjectCover } from "./ProjectCover";
import { Icon } from "./ui/Icon";
import { Chip, DemoNote, Reveal, Section, SectionHeading } from "./ui/primitives";
import { cn } from "@/utils/cn";

const cats = ["All", "AI", "Social", "Sales", "Content"] as const;
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];

function CaseStudy({ p }: { p: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div>
            <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">the problem</p>
            <p className="mt-2 text-[14px] leading-relaxed text-mist">{p.problem}</p>
          </div>
          <div className="mt-5">
            <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">what I did</p>
            <ol className="mt-3 space-y-2.5">
              {p.approach.map((a, i) => (
                <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-mist">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-electric/25 bg-electric/10 font-mono text-[9px] text-electric-2">
                    {i + 1}
                  </span>
                  <span className="text-chalk/85">{a}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-5">
            <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/85 uppercase">takeaways</p>
            <div className="mt-3 space-y-2">
              {p.learnings.map((l, i) => (
                <p key={i} className="flex gap-2.5 rounded-xl border border-lime/15 bg-lime/[0.05] px-3 py-2.5 text-[13px] leading-relaxed text-chalk/85">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[9.5px] tracking-[0.26em] text-mist/70 uppercase">role</p>
            <p className="mt-1.5 text-[13.5px] text-chalk">{p.role}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9.5px] text-electric-2/90">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-[linear-gradient(155deg,rgba(126,163,255,0.07),rgba(5,8,26,0.5))] px-3.5 py-3">
                <p className="font-display text-[19px] leading-none font-bold text-chalk tabular-nums">{m.value}</p>
                <p className="mt-2 text-[11.5px] leading-tight text-mist">{m.label}</p>
                <p className="mt-1 font-mono text-[8.5px] tracking-[0.14em] text-amber/70 uppercase">{m.note}</p>
              </div>
            ))}
          </div>

          <DemoNote className="mt-4" />

          {p.id === "campaign-dashboard" && (
            <button
              onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
              className="ring-focus btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13.5px] font-semibold text-white"
            >
              <span className="relative">Open the live demo below</span>
              <Icon name="chevronDown" className="relative h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = projects.filter((p) => cat === "All" || p.category === cat);

  return (
    <Section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Five concept builds,
              <br />
              <span className="text-mist">fully documented.</span>
            </>
          }
          lead="Practice projects — a voice-agent campaign, a social promo, an outbound system, an ad concept and a working analytics app. Real thinking, synthetic numbers."
        />
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <Chip key={c} active={cat === c} onClick={() => { setCat(c); setOpen(null); }}>
                {c}
              </Chip>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <AnimatePresence initial={false}>
          {list.map((p, i) => {
            const isOpen = open === p.id;
            const span = p.category && isOpen ? "lg:col-span-12" : spans[projects.indexOf(p) % spans.length];
            return (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.2), ease: [0.19, 1, 0.22, 1] }}
                className={cn(
                  "group glass relative overflow-hidden rounded-[22px] transition-[border-color] duration-400",
                  span,
                  isOpen ? "border-electric/35" : "hover:border-electric/28",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(600px circle at 20% 0%, hsla(${p.hue},92%,66%,0.14), transparent 65%)` }}
                />

                <div className={cn("relative grid gap-0", isOpen && "lg:grid-cols-12")}>
                  <div className={cn(isOpen && "lg:col-span-5")}>
                    <div className={cn("relative overflow-hidden border-b border-white/8", isOpen ? "h-52" : "h-44")}>
                      <motion.div layout className="absolute inset-0 scale-[1.02] transition-transform duration-700 group-hover:scale-[1.08]">
                        <ProjectCover id={p.id} hue={p.hue} />
                      </motion.div>
                      <div className="absolute inset-0 bg-linear-to-t from-abyss via-abyss/25 to-transparent" />
                      <div className="absolute top-3.5 left-4 flex items-center gap-2">
                        <span className="font-mono text-[11px] text-chalk/50">{p.index}</span>
                        <span className="h-3 w-px bg-white/20" />
                        <span className="rounded-full border border-white/12 bg-black/30 px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] text-chalk/75 uppercase">
                          {p.category}
                        </span>
                      </div>
                      <span className="absolute top-3.5 right-4 font-mono text-[9.5px] text-chalk/55">{p.year}</span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="font-display text-[clamp(1.05rem,2vw,1.42rem)] leading-tight font-semibold text-chalk">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] font-medium text-electric-2">{p.kicker}</p>
                      <p className={cn("mt-3 text-[13.5px] leading-relaxed text-mist", !isOpen && "line-clamp-3")}>
                        {p.summary}
                      </p>
                      <p className="mt-3 font-mono text-[9.5px] tracking-[0.18em] text-mist/55 uppercase">{p.type}</p>

                      {!isOpen && (
                        <div className="mt-4 flex items-center gap-5 border-t border-white/8 pt-4">
                          {p.metrics.slice(0, 2).map((m) => (
                            <div key={m.label}>
                              <p className="font-display text-[15px] font-bold text-chalk tabular-nums">{m.value}</p>
                              <p className="font-mono text-[9px] tracking-[0.12em] text-mist/60 uppercase">{m.label}</p>
                            </div>
                          ))}
                          <span className="ml-auto rounded-full border border-amber/25 bg-amber/10 px-2 py-0.5 font-mono text-[8.5px] tracking-[0.14em] text-amber uppercase">
                            demo
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => setOpen(isOpen ? null : p.id)}
                        className="ring-focus mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-chalk transition-colors duration-300 hover:border-electric/45 hover:bg-electric/12"
                      >
                        {isOpen ? "Collapse case study" : "Open case study"}
                        <Icon
                          name={isOpen ? "chevronDown" : "arrowRight"}
                          className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                        />
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 lg:col-span-7 lg:py-6 lg:pr-7">
                      <CaseStudy p={p} />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
