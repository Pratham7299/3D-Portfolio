import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Icon } from "./ui/Icon";

export function QuoteBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [46, -46]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-26, 26]);

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-white/8 py-20 sm:py-24">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-16 -left-24 font-display text-[26rem] leading-none font-extrabold text-white/[0.028] select-none"
      >
        AI
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute -right-16 -bottom-28 font-display text-[20rem] leading-none font-extrabold text-white/[0.025] select-none"
      >
        01
      </motion.div>

      <div className="relative mx-auto max-w-[1080px] px-6 sm:px-10">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-electric-2/80 uppercase">
          <Icon name="spark" className="h-3.5 w-3.5" />
          working principle
        </div>
        <blockquote className="mt-6 font-display text-[clamp(1.35rem,3.5vw,2.5rem)] leading-[1.24] font-light tracking-[-0.025em] text-chalk">
          “Marketing used to be guessing at scale.{" "}
          <span className="font-semibold">Now you can research, write, test and report in a week</span> — so the job
          is no longer 'more content', it's{" "}
          <span className="relative font-semibold text-electric-2">
            fewer, better bets
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-linear-to-r from-electric to-volt"
            />
          </span>
          , measured honestly.”
        </blockquote>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10.5px] tracking-[0.16em] text-mist/70 uppercase">
          <span>— Abhinav Mishra</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Greater Noida · 2026</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span className="text-lime">concept portfolio</span>
        </div>
      </div>
    </div>
  );
}
