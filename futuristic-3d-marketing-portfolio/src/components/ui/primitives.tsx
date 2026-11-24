import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";
import { cn } from "@/utils/cn";

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- section shell ---------- */
export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-electric-2/80 uppercase">
      <span className="grid h-6 w-6 place-items-center rounded-[7px] border border-electric/40 bg-electric/10 text-[9px] text-electric-2">
        {index}
      </span>
      <span className="h-px w-8 bg-linear-to-r from-electric/70 to-transparent" />
      {label}
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow index={index} label={eyebrow} />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-chalk">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className={cn("mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-mist", align === "center" && "mx-auto")}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- animated number ---------- */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
  replayKey = 0,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** change this to replay the count-up */
  replayKey?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
    else mv.set(0);
  }, [inView, mv, to, replayKey]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return spring.on("change", (v) => {
      node.textContent = `${prefix}${v.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
    });
  }, [prefix, spring, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

/* ---------- chips / tags ---------- */
export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? motion.button : motion.div;
  return (
    <Comp
      onClick={onClick}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      className={cn(
        "ring-focus rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300",
        active
          ? "border-transparent bg-linear-to-r from-electric to-volt text-white shadow-[0_10px_28px_-14px_rgba(61,125,255,0.9)]"
          : "border-slate-400/18 bg-white/[0.03] text-mist hover:border-electric/50 hover:bg-electric/10 hover:text-chalk",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export function Pill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "green" }) {
  const tones = {
    blue: "border-electric/30 bg-electric/10 text-electric-2",
    amber: "border-amber/35 bg-amber/10 text-amber",
    green: "border-lime/30 bg-lime/10 text-lime",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] uppercase",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/* ---------- magnetic wrapper (desktop feel) ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}

/* ---------- glass card with pointer-tracked spotlight ---------- */
export function GlassCard({
  children,
  className,
  intensity = 260,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn("glass group relative overflow-hidden rounded-[20px]", className)}
      style={{ ["--mx" as string]: "-1000px", ["--my" as string]: "-1000px" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${intensity}px circle at var(--mx) var(--my), rgba(126,178,255,0.16), transparent 68%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ---------- demo-data disclaimer badge ---------- */
export function DemoNote({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-amber/25 bg-amber/[0.07] px-3.5 py-2.5 text-[11.5px] leading-snug text-amber/90",
        className,
      )}
    >
      <Icon name="info" className="mt-px h-3.5 w-3.5 shrink-0" />
      <span>
        <strong className="font-semibold">Illustrative demo metrics.</strong> Practice concept work with synthetic data —
        not actual client or campaign results.
      </span>
    </div>
  );
}

