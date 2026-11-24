import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "./ui/Icon";
import { cn } from "@/utils/cn";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "dashboard", label: "Dashboard" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-70 h-[2px] bg-white/5">
        <motion.div
          className="h-full origin-left bg-linear-to-r from-electric via-volt to-aqua"
          style={{ scaleX: bar }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500",
              scrolled ? "glass" : "border border-transparent",
            )}
          >
            <button onClick={() => go("hero")} className="ring-focus group flex items-center gap-2.5 rounded-xl px-1.5 py-1">
              <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-linear-to-br from-electric to-volt text-[13px] font-display font-bold text-white">
                AM
                <span className="absolute inset-0 rounded-[11px] ring-1 ring-white/25" />
              </span>
              <span className="hidden text-left sm:block">
                <span className="block font-display text-[13px] leading-none font-semibold tracking-[-0.01em] text-chalk">
                  Abhinav Mishra
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-mist/70 uppercase">
                  AI × Growth
                </span>
              </span>
            </button>

            <div className="hidden items-center gap-0.5 lg:flex">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "ring-focus relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                    active === l.id ? "text-chalk" : "text-mist hover:text-chalk",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg border border-electric/30 bg-electric/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go("contact")}
                className="ring-focus btn-primary hidden rounded-xl px-4 py-2 text-[13px] font-semibold text-white sm:block"
              >
                <span className="relative">Hire me</span>
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className="ring-focus grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/5 text-chalk lg:hidden"
              >
                <Icon name={open ? "close" : "menu"} className="h-4.5 w-4.5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-x-4 top-[74px] z-70 lg:hidden"
          >
            <div className="glass rounded-2xl p-2">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045 }}
                  onClick={() => go(l.id)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] text-mist transition-colors hover:bg-white/[0.05] hover:text-chalk"
                >
                  {l.label}
                  <Icon name="arrowUpRight" className="h-4 w-4 opacity-50" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
