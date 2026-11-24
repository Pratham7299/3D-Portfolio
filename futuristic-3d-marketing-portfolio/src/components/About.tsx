import { motion } from "framer-motion";
import { about, profile } from "@/data/content";
import { Counter, GlassCard, Reveal, Section, SectionHeading } from "./ui/primitives";
import { Icon } from "./ui/Icon";

/** generative data-portrait — pure SVG, no image payload */
function HoloPortrait() {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[18px] border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(61,125,255,0.28),rgba(5,8,26,0.9)_62%)]">
      <svg viewBox="0 0 300 375" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7fb2ff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#8b5cff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#34e2ff" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="rg" cx="50%" cy="42%">
            <stop offset="0%" stopColor="#9db6ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9db6ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="150" cy="160" r="120" fill="url(#rg)" />

        {/* contour head silhouette */}
        <g stroke="url(#lg)" fill="none" strokeWidth="1.1">
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse
              key={i}
              cx="150"
              cy={92 + i * 10.5}
              rx={Math.max(6, 62 * Math.sin((Math.PI * (i + 0.6)) / 16.4))}
              ry={5.4}
              opacity={0.28 + i * 0.035}
            />
          ))}
        </g>

        {/* wire mesh shoulders */}
        <g stroke="#5b8dff" strokeOpacity="0.3" fill="none" strokeWidth="0.8">
          <path d="M52 342c22-42 58-60 98-60s76 18 98 60" />
          <path d="M62 352c22-38 52-54 88-54s66 16 88 54" />
          <path d="M74 362c20-32 46-46 76-46s56 14 76 46" />
        </g>

        {/* data nodes */}
        <g>
          {Array.from({ length: 26 }).map((_, i) => {
            const a = (i / 26) * Math.PI * 2;
            const r = 96 + (i % 4) * 12;
            const cx = 150 + Math.cos(a) * r * 0.82;
            const cy = 168 + Math.sin(a) * r * 0.66;
            return <circle key={i} cx={cx} cy={cy} r={i % 5 === 0 ? 2.6 : 1.4} fill={i % 3 ? "#a78bfa" : "#34e2ff"} opacity="0.75" />;
          })}
        </g>

        {/* connective threads */}
        <g stroke="#bda4ff" strokeOpacity="0.22" strokeWidth="0.6">
          <path d="M60 120L150 92l86 44-32 92-104 18z" fill="none" />
          <path d="M52 220l106-40 82 66" fill="none" />
        </g>
      </svg>

      {/* scanline */}
      <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(126,178,255,0.16),transparent)] scan-line" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.26em] text-electric-2/80 uppercase">subject</p>
          <p className="font-display text-[15px] font-semibold text-chalk">{profile.name}</p>
        </div>
        <div className="text-right font-mono text-[9px] leading-relaxed text-mist/70">
          <p>render: svg</p>
          <p>frames: 16</p>
          <p className="text-lime">stable</p>
        </div>
      </div>

      <span className="absolute top-4 left-4 h-6 w-6 border-t border-l border-electric/40" />
      <span className="absolute top-4 right-4 h-6 w-6 border-t border-r border-electric/40" />
      <span className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-electric/40" />
    </div>
  );
}

export function About() {
  return (
    <Section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <div className="glass rounded-[22px] p-3">
              <HoloPortrait />
            </div>
          </Reveal>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={0.06 * i}>
                <div className="glass-soft h-full rounded-[15px] px-3.5 py-3 transition-colors duration-300 hover:border-electric/35">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-mist/60 uppercase">{f.label}</p>
                  <p className="mt-1.5 text-[12.5px] leading-snug font-medium text-chalk">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <SectionHeading
            index="01"
            eyebrow="About"
            title={
              <>
                A developer's brain,
                <br />
                <span className="text-mist">a seller's instincts.</span>
              </>
            }
          />

          <div className="mt-7 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="max-w-2xl text-[15px] leading-[1.75] text-mist">
                  {i === 0 ? (
                    <>
                      <span className="float-left mt-1 mr-3 font-display text-[52px] leading-[0.8] font-bold text-electric">
                        {p.slice(0, 1)}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-9 space-y-3">
            {about.traits.map((t, i) => (
              <Reveal key={t.title} delay={0.05 * i}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 transition-colors duration-300 hover:border-electric/30 hover:bg-electric/[0.06] sm:px-5"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-electric/25 bg-electric/10 text-electric-2 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={t.icon as "terminal"} className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-chalk">{t.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-mist">{t.body}</p>
                  </div>
                  <span className="ml-auto hidden font-mono text-[10px] text-mist/40 sm:block">0{i + 1}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { to: 0, label: "Graduated", text: "2026" },
              { to: 8.42, label: "CGPA / 10", decimals: 2 },
              { to: 12, label: "AI tools in daily use", suffix: "+" },
              { to: 40, label: "Practice briefs written", suffix: "+" },
            ].map((s) => (
              <GlassCard key={s.label} className="rounded-2xl px-4 py-4">
                <p className="font-display text-[clamp(1.3rem,3.4vw,1.9rem)] font-bold text-chalk tabular-nums">
                  {s.text ? (
                    s.text
                  ) : (
                    <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                  )}
                </p>
                <p className="mt-1.5 font-mono text-[9px] leading-snug tracking-[0.16em] text-mist/70 uppercase">
                  {s.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
