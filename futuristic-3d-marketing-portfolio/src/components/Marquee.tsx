import { marqueeWords } from "@/data/content";
import { Icon } from "./ui/Icon";

const icons = ["brain", "megaphone", "target", "gauge", "funnel", "spark"] as const;

export function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="group relative border-y border-white/8 bg-white/[0.015] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-void to-transparent" />
      <div className="flex w-max overflow-hidden">
        <div className="marquee-track flex w-max shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {row.map((w, i) => (
            <div key={`${w}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-[13px] font-light tracking-[0.02em] whitespace-nowrap text-chalk/70 sm:text-[15px]">
                {w}
              </span>
              <span className="flex items-center gap-2 text-electric/60">
                <Icon name={icons[i % icons.length]} className="h-3.5 w-3.5" />
                <span className="h-1 w-1 rounded-full bg-volt/70" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
