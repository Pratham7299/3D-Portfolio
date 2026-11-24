import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/content";
import { Icon } from "./ui/Icon";
import { Reveal, Section, SectionHeading } from "./ui/primitives";

const icons = ["search", "funnel", "brain", "gauge"] as const;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 55%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="process" className="scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="05"
          eyebrow="How I work"
          title={
            <>
              Four steps, no mystery —
              <br />
              <span className="text-mist">research to review.</span>
            </>
          }
          lead="The loop I run on every brief, whether it's a campaign concept or a spreadsheet of 1,200 leads."
        />
        <Reveal delay={0.1}>
          <div className="glass-soft rounded-2xl px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-mist/80 uppercase">
            <p>cadence · weekly review</p>
            <p className="text-electric-2">rule · kill the loser fast</p>
          </div>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-14">
        <div className="absolute top-[46px] right-0 left-0 hidden h-px bg-white/8 lg:block">
          <motion.div style={{ width: line }} className="h-full bg-linear-to-r from-electric via-volt to-aqua shadow-glow" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.09}>
              <div className="group relative h-full">
                <div className="relative z-10 mb-6 hidden lg:block">
                  <span className="grid h-[54px] w-[54px] place-items-center rounded-2xl border border-electric/25 bg-abyss text-electric-2 transition-all duration-400 group-hover:-translate-y-1 group-hover:border-electric/60 group-hover:text-chalk group-hover:shadow-glow">
                    <Icon name={icons[i]} className="h-6 w-6" />
                  </span>
                </div>
                <div className="glass h-full rounded-[20px] p-5 transition-transform duration-400 group-hover:-translate-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[26px] leading-none font-bold text-white/10 transition-colors duration-300 group-hover:text-electric/35">
                      {s.step}
                    </span>
                    <span className="rounded-full border border-volt/25 bg-volt/10 px-2 py-0.5 font-mono text-[8.5px] tracking-[0.18em] text-volt-2 uppercase">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[16px] font-semibold text-chalk">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-mist">{s.body}</p>
                  <div className="mt-4 h-px w-full hairline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
