import { motion } from "framer-motion";
import { marqueeWords, profile } from "@/data/content";
import { downloadResume } from "@/lib/resume";
import { Icon } from "./ui/Icon";
import { Magnetic } from "./ui/primitives";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "About", id: "about" },
      { label: "Skills", id: "skills" },
      { label: "Projects", id: "work" },
    ],
  },
  {
    title: "Builds",
    links: [
      { label: "Campaign dashboard", id: "dashboard" },
      { label: "How I work", id: "process" },
      { label: "Contact", id: "contact" },
    ],
  },
];

const tech = ["React 19", "Vite", "Tailwind CSS", "Three.js + R3F", "Framer Motion", "Chart.js"];

export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_140%,rgba(61,125,255,0.18),transparent_60%)]" />

      <div className="relative overflow-hidden border-b border-white/8 py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-void to-transparent" />
        <div className="flex w-max marquee-track-rev gap-8">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={`${w}-${i}`} className="flex items-center gap-8 font-display text-[13px] tracking-[0.06em] whitespace-nowrap text-mist/35 uppercase">
              {w}
              <span className="h-1 w-1 rounded-full bg-electric/50" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <button onClick={() => go("hero")} className="ring-focus flex items-center gap-3 rounded-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-electric to-volt font-display text-[14px] font-bold text-white">
              AM
            </span>
            <span className="text-left">
              <span className="block font-display text-[16px] font-semibold text-chalk">{profile.name}</span>
              <span className="block font-mono text-[9.5px] tracking-[0.2em] text-mist/65 uppercase">{profile.role}</span>
            </span>
          </button>
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-mist">
            B.Tech Computer Science graduate (2026), based in Greater Noida, building a career at the intersection of AI
            tooling, sales execution and digital marketing. Open to roles across India and remote.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Magnetic strength={0.14}>
              <button
                onClick={downloadResume}
                className="ring-focus flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12.5px] font-medium text-chalk transition-colors hover:border-electric/45 hover:bg-electric/10"
              >
                <Icon name="download" className="h-3.5 w-3.5 text-electric-2" /> Résumé
              </button>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="ring-focus flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12.5px] font-medium text-chalk transition-colors hover:border-lime/45 hover:bg-lime/10"
            >
              <Icon name="mail" className="h-3.5 w-3.5 text-lime" /> Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="ring-focus flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12.5px] font-medium text-chalk transition-colors hover:border-volt/45 hover:bg-volt/10"
            >
              <Icon name="linkedin" className="h-3.5 w-3.5 text-volt-2" /> LinkedIn
            </a>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <p className="font-mono text-[9.5px] tracking-[0.24em] text-mist/55 uppercase">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="ring-focus group flex items-center gap-2 rounded-md text-[13.5px] text-mist transition-colors hover:text-chalk"
                  >
                    <span className="h-px w-0 bg-electric transition-all duration-300 group-hover:w-3.5" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-3">
          <p className="font-mono text-[9.5px] tracking-[0.24em] text-mist/55 uppercase">Built with</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9.5px] text-mist/80">
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={() => go("hero")}
            className="ring-focus mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] text-chalk uppercase transition-colors hover:border-electric/45 hover:bg-electric/10"
          >
            <motion.span animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ duration: 2.4, repeat: Infinity }}>
              <Icon name="chevronDown" className="h-3 w-3 rotate-180" />
            </motion.span>
            back to top
          </button>
        </div>
      </div>

      <div className="relative border-t border-white/8 px-5 py-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 text-[11px] text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Concept portfolio — projects are practice work with illustrative demo metrics, not client results.</p>
          <p className="font-mono tracking-[0.16em] uppercase">
            {profile.status}
          </p>
        </div>
      </div>
    </footer>
  );
}
