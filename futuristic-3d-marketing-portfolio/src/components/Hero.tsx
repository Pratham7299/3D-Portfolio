import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AIScene from "./scene/AIScene";
import { Icon } from "./ui/Icon";
import { Magnetic, Pill } from "./ui/primitives";
import { profile } from "@/data/content";

const roles = [
  "building AI-assisted go-to-market loops",
  "studying positioning & cold outreach",
  "shipping measurable practice campaigns",
  "open to sales & marketing roles",
];

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [inView, setInView] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dragged, setDragged] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 220);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const full = roles[roleIdx];
    const t = window.setTimeout(
      () => {
        if (!deleting) {
          const next = typed.length + 1;
          setTyped(full.slice(0, next));
          if (next === full.length) window.setTimeout(() => setDeleting(true), 1700);
        } else {
          const next = typed.length - 1;
          setTyped(full.slice(0, next));
          if (next === 0) {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 26 : 46,
    );
    return () => window.clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  useEffect(() => {
    const onDown = () => setDragged(true);
    window.addEventListener("pointerdown", onDown, { once: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <section
      ref={wrap}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden pt-24 pb-10 sm:pt-28"
    >
      {/* 3D layer */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(to_right,rgba(3,5,14,0.86),rgba(3,5,14,0.46)_58%,rgba(3,5,14,0.12))] lg:hidden" />
      <motion.div
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute inset-0 z-0 lg:left-[38%]"
      >
        <div className="pointer-events-auto relative mx-auto h-full w-full max-w-[980px]">
          {mounted ? (
            <AIScene active={inView} motion={reduce ? 0.3 : 1} />
          ) : (
            <div className="grid h-full place-items-center">
              <div className="h-56 w-56 animate-pulse rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(126,178,255,0.5),rgba(139,92,255,0.22)_45%,transparent_70%)] blur-md" />
            </div>
          )}
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-5 pt-6 sm:px-8 lg:grid-cols-12 lg:px-10">
        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-7 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-lime uppercase">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />
              open to opportunities
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-mist/70 uppercase">
              {profile.location}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-7 font-mono text-[11px] tracking-[0.34em] text-electric-2/85 uppercase"
          >
            portfolio — 2026 edition
          </motion.p>

          <h1 className="mt-3 font-display font-extrabold tracking-[-0.045em] text-chalk">
            {["Abhinav", "Mishra"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.95, delay: 0.14 + i * 0.11, ease: [0.19, 1, 0.22, 1] }}
                className="block text-[clamp(2.9rem,10vw,6.4rem)] leading-[0.92]"
              >
                {word}
                {i === 1 && <span className="text-electric">.</span>}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2"
          >
            <span className="flex items-baseline gap-3">
              <span className="h-px w-10 shrink-0 translate-y-[-6px] bg-linear-to-r from-electric to-volt" />
              <span className="font-display text-[clamp(0.95rem,2.1vw,1.32rem)] font-medium tracking-[-0.01em] text-chalk">
                {profile.role}
              </span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.16em] text-mist/75 uppercase">
              B.Tech CSE · Class of 2026
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3.5 flex min-h-[24px] items-baseline gap-2.5"
          >
            <span className="font-mono text-[9.5px] tracking-[0.22em] text-mist/50 uppercase">currently</span>
            <span className="caret font-mono text-[12.5px] text-electric-2 sm:text-[13.5px]">{typed}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="mt-6 max-w-xl font-display text-[clamp(1.15rem,2.4vw,1.7rem)] leading-[1.28] font-light text-chalk/90"
          >
            Turning <span className="relative font-semibold text-electric-2">AI technology<span className="absolute -bottom-1 left-0 h-px w-full bg-linear-to-r from-electric to-volt" /></span>{" "}
            into <span className="font-semibold text-chalk">business growth</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist"
          >
            I research, pitch, write and measure — using a developer's understanding of AI and a seller's obsession
            with the customer. Everything on this site is <span className="text-chalk">concept work</span> built to show
            how I think.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.22}>
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="ring-focus btn-primary group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14.5px] font-semibold text-white"
              >
                <span className="relative">Explore my work</span>
                <Icon
                  name="arrowRight"
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Magnetic>
            <Magnetic strength={0.18}>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="ring-focus flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3.5 text-[14px] font-medium text-chalk transition-colors duration-300 hover:border-electric/45 hover:bg-electric/10"
              >
                <Icon name="mail" className="h-4 w-4 text-electric-2" />
                Start a conversation
              </button>
            </Magnetic>
          </motion.div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              { k: "Degree", v: "B.Tech CSE" },
              { k: "Concept builds", v: "05" },
              { k: "Skill tracks", v: "06" },
              { k: "Live demos", v: "3D + JS" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.07 }}
                className="border-l border-white/10 pl-3"
              >
                <p className="font-mono text-[9.5px] tracking-[0.22em] text-mist/65 uppercase">{s.k}</p>
                <p className="mt-1 font-display text-[15px] font-semibold text-chalk">{s.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="hidden lg:col-span-5 lg:block" />
      </div>

      {/* scene HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="pointer-events-none absolute right-5 bottom-24 z-20 hidden sm:block lg:right-10"
      >
        <div className="glass w-[212px] rounded-2xl p-3.5">
          <div className="flex items-center justify-between">
            <Pill tone="blue">ai core</Pill>
            <span className="font-mono text-[9px] text-lime">● live</span>
          </div>
          <div className="mt-3 space-y-2 font-mono text-[10px] text-mist">
            {[
              ["model", "distort-field v3"],
              ["nodes", "adaptive · live"],
              ["input", "drag · hover"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3">
                <span className="text-mist/60 uppercase">{k}</span>
                <span className="truncate text-chalk/90">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-electric to-aqua"
              animate={{ x: ["-60%", "120%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-2.5 text-[10.5px] leading-snug text-mist/80">
            {dragged ? "nice — you're driving the mesh." : "Drag the sphere. It responds to your pointer."}
          </p>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-mist/60 uppercase">scroll</span>
        <span className="relative h-9 w-[18px] rounded-full border border-white/18">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
