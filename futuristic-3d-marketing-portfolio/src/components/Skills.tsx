import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Radar } from "react-chartjs-2";
import "@/lib/charts";
import { radarAxes, skills } from "@/data/content";
import { Chip, Reveal, Section, SectionHeading } from "./ui/primitives";
import { cn } from "@/utils/cn";

const filters = ["All", "Growth", "Content", "Technical"] as const;

export function Skills() {
  const [focus, setFocus] = useState(0);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const shown = skills.filter((s) => filter === "All" || s.category === filter);

  const data = useMemo(
    () => ({
      labels: radarAxes.map((r) => r.axis),
      datasets: [
        {
          label: "Proficiency",
          data: radarAxes.map((r) => r.value),
          fill: true,
          backgroundColor: "rgba(61,125,255,0.18)",
          borderColor: "rgba(127,178,255,0.9)",
          borderWidth: 2,
          pointBackgroundColor: radarAxes.map((_, i) => (i === focus ? "#34e2ff" : "rgba(189,164,255,0.9)")),
          pointBorderColor: "#05081a",
          pointBorderWidth: 1.5,
          pointRadius: radarAxes.map((_, i) => (i === focus ? 7 : 3.4)),
          pointHoverRadius: 8,
        },
      ],
    }),
    [focus],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 700, easing: "easeOutQuart" as const },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(6,10,26,0.94)",
          borderColor: "rgba(140,170,255,0.3)",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 10,
          callbacks: { label: (c: { label?: string; parsed: { r: number } }) => ` ${c.parsed.r}/100 — ${c.label}` },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false, stepSize: 25 },
          grid: { color: "rgba(140,170,255,0.14)" },
          angleLines: { color: "rgba(140,170,255,0.16)" },
          pointLabels: {
            color: "#9fb0d8",
            font: { family: "'JetBrains Mono', monospace", size: 10 },
          },
        },
      },
    }),
    [],
  );

  return (
    <Section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <>
              Six tracks, one goal:
              <br />
              <span className="text-mist">make the funnel cheaper.</span>
            </>
          }
          lead="Self-assessed levels from study, practice builds and freelance-grade experiments — not certifications, and definitely not inflated."
        />
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="glass relative h-full rounded-[22px] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9.5px] tracking-[0.26em] text-electric-2/80 uppercase">capability map</p>
                <h3 className="mt-1.5 font-display text-[17px] font-semibold text-chalk">Balanced, not scattered</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] tracking-widest text-mist uppercase">
                1–100
              </span>
            </div>
            <div className="relative mx-auto mt-4 max-w-[420px]">
              <Radar data={data} options={options} />
            </div>
            <p className="mt-2 text-center text-[12px] text-mist/80">
              Hover a skill → the axis lights up.{" "}
              <span className="text-electric-2">{radarAxes[focus].axis}: {radarAxes[focus].value}</span>
            </p>
          </div>
        </Reveal>

        <div className="space-y-3 lg:col-span-7">
          {shown.map((s) => {
            const idx = skills.findIndex((x) => x.name === s.name);
            const active = focus === idx;
            return (
              <Reveal key={s.name} delay={0.04 * idx}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setFocus(idx)}
                  onFocus={() => setFocus(idx)}
                  onClick={() => setFocus(idx)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className={cn(
                    "ring-focus group relative w-full overflow-hidden rounded-[18px] border px-4 py-4 text-left transition-colors duration-300 sm:px-5",
                    active
                      ? "border-electric/45 bg-electric/[0.09]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/18",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background: active
                        ? "radial-gradient(420px circle at 88% 50%, rgba(139,92,255,0.16), transparent 70%)"
                        : "none",
                    }}
                  />
                  <div className="relative flex items-center gap-4">
                    <span className="font-mono text-[10px] text-mist/45">0{idx + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[15.5px] font-semibold text-chalk">{s.name}</h3>
                        <span className="rounded-full border border-volt/30 bg-volt/10 px-2 py-0.5 font-mono text-[8.5px] tracking-[0.16em] text-volt-2 uppercase">
                          {s.category}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "mt-1.5 text-[13px] leading-relaxed transition-colors duration-300",
                          active ? "text-mist" : "text-mist/70",
                        )}
                      >
                        {s.blurb}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-[19px] font-bold tabular-nums text-chalk">
                      {s.level}
                    </span>
                  </div>

                  <div className="relative mt-3.5 h-[5px] w-full overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                      className={cn(
                        "h-full rounded-full",
                        active ? "bg-linear-to-r from-electric via-volt to-aqua" : "bg-linear-to-r from-electric/70 to-volt/70",
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "relative grid transition-all duration-400",
                      active ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-1.5">
                        {s.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9.5px] text-electric-2/90"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
