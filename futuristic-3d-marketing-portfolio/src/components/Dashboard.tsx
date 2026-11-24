import { motion } from "framer-motion";
import type { TooltipItem } from "chart.js";
import { useMemo, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { areaGradient, chartTooltip, gridStyle } from "@/lib/charts";
import "@/lib/charts";
import { campaignRows, channels, dashboardSeries, metricDefs, weeks, type Channel } from "@/data/content";
import { Icon } from "./ui/Icon";
import { Chip, Counter, DemoNote, GlassCard, Reveal, Section, SectionHeading } from "./ui/primitives";
import { cn } from "@/utils/cn";

const channelColor: Record<Channel, string> = {
  "Meta Ads": "#3d7dff",
  "Google Search": "#34e2ff",
  LinkedIn: "#8b5cff",
  "Email / CRM": "#9dff5c",
};

const ranges = [
  { label: "4 weeks", key: "30d", count: 4 },
  { label: "8 weeks", key: "60d", count: 8 },
  { label: "12 weeks", key: "90d", count: 12 },
] as const;

type MetricKey = (typeof metricDefs)[number]["key"];

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export function Dashboard() {
  const [rangeIdx, setRangeIdx] = useState(2);
  const [channel, setChannel] = useState<"All" | Channel>("All");
  const [metric, setMetric] = useState<MetricKey>("leads");
  const [sort, setSort] = useState<{ key: keyof (typeof campaignRows)[number]; dir: 1 | -1 }>({
    key: "conversions",
    dir: -1,
  });

  const range = ranges[rangeIdx];
  const weekSlice = useMemo(() => weeks.slice(weeks.length - range.count), [range.count]);

  const rows = useMemo(
    () =>
      dashboardSeries.filter(
        (d) => (channel === "All" || d.channel === channel) && weekSlice.includes(d.week),
      ),
    [channel, weekSlice],
  );

  const totals = useMemo(() => {
    const t = { spend: 0, reach: 0, leads: 0, conversions: 0, cpa: 0 };
    rows.forEach((r) => {
      t.spend += r.spend;
      t.reach += r.reach;
      t.leads += r.leads;
      t.conversions += r.conversions;
    });
    t.cpa = t.leads ? t.spend / t.leads : 0;
    return t;
  }, [rows]);

  const prevWeeks = useMemo(
    () => weeks.slice(Math.max(0, weeks.length - range.count * 2), weeks.length - range.count),
    [range.count],
  );
  const hasPrevPeriod = prevWeeks.length === range.count;
  const deltaLabel = hasPrevPeriod ? "vs. prev. period" : "vs. 1st half";

  const prev = useMemo(() => {
    const p = { spend: 0, reach: 0, leads: 0, conversions: 0, cpa: 0 };
    if (!hasPrevPeriod) {
      const half = Math.floor(weekSlice.length / 2) || 1;
      const firstWeeks = weekSlice.slice(0, half);
      const agg = (weeksIn: string[]) => {
        const a = { spend: 0, reach: 0, leads: 0, conversions: 0, cpa: 0 };
        rows
          .filter((r) => weeksIn.includes(r.week))
          .forEach((r) => {
            a.spend += r.spend;
            a.reach += r.reach;
            a.leads += r.leads;
            a.conversions += r.conversions;
          });
        a.cpa = a.leads ? a.spend / a.leads : 0;
        return a;
      };
      const f = agg(firstWeeks);
      return {
        spend: f.spend * 2,
        reach: f.reach * 2,
        leads: f.leads * 2,
        conversions: f.conversions * 2,
        cpa: f.cpa,
      };
    }
    dashboardSeries
      .filter((d) => (channel === "All" || d.channel === channel) && prevWeeks.includes(d.week))
      .forEach((r) => {
        p.spend += r.spend;
        p.reach += r.reach;
        p.leads += r.leads;
        p.conversions += r.conversions;
      });
    p.cpa = p.leads ? p.spend / p.leads : 0;
    return { ...p };
  }, [channel, hasPrevPeriod, prevWeeks, range.count, rows, weekSlice]);

  const delta = (key: "spend" | "reach" | "leads" | "conversions" | "cpa") => {
    const base = key === "cpa" ? prev.cpa : prev[key] || 1;
    const cur = totals[key];
    if (!base) return 0;
    const pct = ((cur - base) / base) * 100;
    return key === "cpa" ? -pct : pct;
  };

  const perChannel = useMemo(
    () =>
      channels.map((c) => {
        const set = dashboardSeries.filter((d) => d.channel === c && weekSlice.includes(d.week));
        const leads = set.reduce((a, b) => a + b.leads, 0);
        const spend = set.reduce((a, b) => a + b.spend, 0);
        const conversions = set.reduce((a, b) => a + b.conversions, 0);
        return { channel: c, leads, spend, conversions, cpa: leads ? spend / leads : 0 };
      }),
    [weekSlice],
  );

  const best = [...perChannel].sort((a, b) => a.cpa - b.cpa)[0];
  const worst = [...perChannel].sort((a, b) => b.cpa - a.cpa)[0];

  const lineData = useMemo(() => {
    const active = channel === "All" ? [...channels] : [channel];
    return {
      labels: weekSlice as unknown as string[],
      datasets: active.map((c) => ({
        label: c,
        data: weekSlice.map((w) => {
          const set = dashboardSeries.filter((d) => d.channel === c && d.week === w);
          const spend = set.reduce((a, b) => a + b.spend, 0);
          const reach = set.reduce((a, b) => a + b.reach, 0);
          const leads = set.reduce((a, b) => a + b.leads, 0);
          const conversions = set.reduce((a, b) => a + b.conversions, 0);
          if (metric === "cpa") return leads ? +(spend / leads).toFixed(1) : 0;
          if (metric === "reach") return reach;
          if (metric === "conversions") return conversions;
          return leads;
        }),
        borderColor: channelColor[c],
        borderWidth: 2.2,
        tension: 0.38,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: channelColor[c],
        pointHoverBorderColor: "#05081a",
        fill: true,
        backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
          const area = ctx.chart.chartArea;
          if (!area) return "transparent";
          return areaGradient(ctx.chart.ctx, area, channelColor[c]);
        },
      })),
    };
  }, [channel, metric, weekSlice]);

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" as const, intersect: false },
      animation: { duration: 650, easing: "easeOutQuart" as const },
      plugins: {
        legend: {
          display: channel === "All",
          position: "top" as const,
          align: "end" as const,
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            pointStyle: "circle" as const,
            padding: 16,
            color: "#c3d2f5",
            font: { size: 10.5 },
          },
        },
        tooltip: {
          ...chartTooltip,
          callbacks: {
            label: (c: TooltipItem<"line">) =>
              ` ${c.dataset.label}: ${metric === "cpa" ? inr(c.parsed.y ?? 0) : fmt(c.parsed.y ?? 0)}`,
          },
        },
      },
      scales: {
        x: { grid: { ...gridStyle, display: false }, ticks: { maxRotation: 0, font: { size: 10 } }, border: { display: false } },
        y: {
          grid: gridStyle,
          border: { display: false },
          ticks: {
            font: { size: 10 },
            callback: (v: number | string) => (metric === "cpa" ? `₹${v}` : Number(v) >= 1000 ? `${+(Number(v) / 1000).toFixed(0)}k` : v),
          },
        },
      },
    }),
    [channel, metric],
  );

  const doughnutData = useMemo(
    () => ({
      labels: perChannel.map((p) => p.channel),
      datasets: [
        {
          data: perChannel.map((p) => p.leads),
          backgroundColor: perChannel.map((p) => `${channelColor[p.channel]}cc`),
          borderColor: "#05081a",
          borderWidth: 3,
          hoverOffset: 14,
          spacing: 3,
        },
      ],
    }),
    [perChannel],
  );

  const barData = useMemo(
    () => ({
      labels: perChannel.map((p) => p.channel.split(" ")[0]),
      datasets: [
        {
          label: "Cost / lead (₹)",
          data: perChannel.map((p) => Math.round(p.cpa)),
          backgroundColor: perChannel.map((p) =>
            p.channel === best.channel ? "rgba(157,255,92,0.75)" : p.channel === worst.channel ? "rgba(255,181,69,0.7)" : "rgba(127,178,255,0.55)",
          ),
          borderRadius: 7,
          barThickness: 26,
        },
      ],
    }),
    [perChannel, best.channel, worst.channel],
  );

  const sortedCampaigns = useMemo(() => {
    const list = campaignRows.filter((c) => channel === "All" || c.channel === channel);
    return [...list].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
      return String(av).localeCompare(String(bv)) * sort.dir;
    });
  }, [channel, sort]);

  const head = [
    { key: "name" as const, label: "Campaign" },
    { key: "leads" as const, label: "Leads" },
    { key: "conversions" as const, label: "Conv." },
    { key: "spend" as const, label: "Spend" },
  ];

  return (
    <Section id="dashboard" className="scroll-mt-24 py-24 sm:py-32">
      <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
        <SectionHeading
          index="04"
          eyebrow="Live concept app"
          title={
            <>
              Interactive campaign
              <br />
              <span className="text-mist">dashboard.</span>
            </>
          }
          lead="Project 05, running live. Every filter, chart and sort below is real React + Chart.js logic — only the numbers are synthetic."
        />
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2">
            {ranges.map((r, i) => (
              <Chip key={r.key} active={rangeIdx === i} onClick={() => setRangeIdx(i)}>
                {r.label}
              </Chip>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <GlassCard className="mt-10 rounded-[24px] p-4 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[9.5px] tracking-[0.22em] text-mist/60 uppercase">channel</span>
              <Chip active={channel === "All"} onClick={() => setChannel("All")}>
                all channels
              </Chip>
              {channels.map((c) => (
                <Chip key={c} active={channel === c} onClick={() => setChannel(c)}>
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: channelColor[c] }} />
                  {c}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] tracking-[0.22em] text-mist/60 uppercase">metric</span>
              {metricDefs.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMetric(m.key)}
                  title={m.formula}
                  className={cn(
                    "ring-focus rounded-lg px-2.5 py-1.5 font-mono text-[10px] tracking-wide uppercase transition-colors duration-300",
                    metric === m.key ? "bg-white/10 text-chalk ring-1 ring-electric/40" : "text-mist hover:bg-white/5 hover:text-chalk",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI row */}
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { k: "Spend", v: totals.spend, pre: "₹", suf: "", d: delta("spend"), good: "neutral" },
              { k: "Reach", v: totals.reach, pre: "", suf: "", d: delta("reach"), good: "up" },
              { k: "Leads", v: totals.leads, pre: "", suf: "", d: delta("leads"), good: "up" },
              { k: "Cost / lead", v: totals.cpa, pre: "₹", suf: "", d: delta("cpa"), good: "down" },
            ].map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(150deg,rgba(126,163,255,0.08),rgba(5,8,26,0.55))] p-4"
              >
                <p className="font-mono text-[9px] tracking-[0.2em] text-mist/65 uppercase">{c.k}</p>
                <p className="mt-2 font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold text-chalk tabular-nums">
                  <Counter
                    to={c.v}
                    prefix={c.pre}
                    decimals={c.k === "Cost / lead" ? 0 : 0}
                    replayKey={rangeIdx + (channel === "All" ? 0 : 1) + i}
                  />
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9.5px]",
                      c.good === "neutral"
                        ? "bg-white/8 text-electric-2"
                        : c.d >= 0
                          ? "bg-lime/12 text-lime"
                          : "bg-amber/12 text-amber",
                    )}
                  >
                    <Icon name="arrowUpRight" className={cn("h-2.5 w-2.5", c.d < 0 && "rotate-90")} />
                    {Math.abs(c.d).toFixed(1)}%
                  </span>
                  <span className="font-mono text-[9px] text-mist/50">{deltaLabel}</span>
                </div>
                <div className="pointer-events-none absolute -top-8 -right-6 h-20 w-20 rounded-full bg-electric/12 blur-2xl" />
              </motion.div>
            ))}
          </div>

          {/* charts */}
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 xl:col-span-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[14px] font-semibold text-chalk">
                  {metricDefs.find((m) => m.key === metric)?.label} by week
                </h3>
                <span className="font-mono text-[9px] tracking-[0.16em] text-mist/55 uppercase">
                  {weekSlice[0]} → {weekSlice[weekSlice.length - 1]}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-mist/55">{metricDefs.find((m) => m.key === metric)?.formula}</p>
              <div className="relative mt-3 h-[268px]">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>

            <div className="flex flex-col gap-4 xl:col-span-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <h3 className="font-display text-[14px] font-semibold text-chalk">Lead mix</h3>
                <div className="relative mx-auto mt-2 h-[168px] w-full">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      cutout: "66%",
                      plugins: {
                        legend: {
                          position: "bottom" as const,
                          labels: { boxWidth: 7, boxHeight: 7, usePointStyle: true, pointStyle: "circle" as const, padding: 10, font: { size: 9.5 } },
                        },
                        tooltip: {
                          ...chartTooltip,
                          callbacks: {
                            label: (c: { label?: string; parsed: number }) =>
                              ` ${c.label}: ${fmt(c.parsed)} leads (${((c.parsed / (totals.leads || 1)) * 100).toFixed(0)}%)`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <h3 className="font-display text-[14px] font-semibold text-chalk">Cost efficiency</h3>
                <div className="relative mt-2 h-[124px]">
                  <Bar
                    data={barData}
                    options={{
                      maintainAspectRatio: false,
                      indexAxis: "y" as const,
                      animation: { duration: 600 },
                      plugins: { legend: { display: false }, tooltip: { ...chartTooltip, callbacks: { label: (c: TooltipItem<"bar">) => ` ₹${fmt(c.parsed.x ?? 0)} / lead` } } },
                      scales: {
                        x: { grid: gridStyle, border: { display: false }, ticks: { font: { size: 9 }, callback: (v: number | string) => `₹${v}` } },
                        y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 10 } } },
                      },
                    }}
                  />
                </div>
                <p className="mt-2 text-[11.5px] leading-snug text-mist">
                  <span className="text-lime">{best.channel}</span> is the cheapest lead source at ₹{Math.round(best.cpa)};{" "}
                  <span className="text-amber">{worst.channel}</span> needs a creative refresh.
                </p>
              </div>
            </div>
          </div>

          {/* table */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="font-display text-[14px] font-semibold text-chalk">Campaign table</h3>
              <span className="font-mono text-[9px] tracking-[0.16em] text-mist/55 uppercase">click a header to sort</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-y border-white/8 bg-white/[0.02]">
                    {head.map((h) => (
                      <th key={h.key} className="px-4 py-2.5">
                        <button
                          onClick={() => setSort((s) => ({ key: h.key, dir: s.key === h.key ? ((s.dir * -1) as 1 | -1) : -1 }))}
                          className="ring-focus inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] uppercase transition-colors hover:text-chalk"
                        >
                          <span className={cn(sort.key === h.key ? "text-electric-2" : "text-mist/70")}>{h.label}</span>
                          <Icon
                            name="chevronDown"
                            className={cn("h-3 w-3 transition-transform", sort.key === h.key ? "text-electric-2" : "text-mist/30", sort.key === h.key && sort.dir === 1 && "rotate-180")}
                          />
                        </button>
                      </th>
                    ))}
                    <th className="px-4 py-2.5 font-mono text-[9.5px] tracking-[0.18em] text-mist/70 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCampaigns.map((c) => (
                    <tr key={c.name} className="border-b border-white/5 transition-colors last:border-0 hover:bg-electric/[0.06]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: channelColor[c.channel] }} />
                          <span className="text-[13px] font-medium text-chalk">{c.name}</span>
                        </div>
                        <p className="mt-0.5 pl-4 font-mono text-[9.5px] tracking-wide text-mist/55 uppercase">{c.channel}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-chalk/90 tabular-nums">{fmt(c.leads)}</td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-chalk/90 tabular-nums">
                        {c.conversions}
                        <span className="ml-1.5 text-[10px] text-mist/50">{((c.conversions / c.leads) * 100).toFixed(0)}%</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[12.5px] text-mist tabular-nums">{inr(c.spend)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] uppercase",
                            c.status === "Live" && "border-lime/30 bg-lime/10 text-lime",
                            c.status === "Tuning" && "border-electric/30 bg-electric/10 text-electric-2",
                            c.status === "Paused" && "border-amber/30 bg-amber/10 text-amber",
                          )}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DemoNote className="mt-4" />
        </GlassCard>
      </Reveal>
    </Section>
  );
}
