import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = { id: string; hue: number; className?: string };

const C = (hue: number, l = 62, a = 1) => `hsla(${hue}, 92%, ${l}%, ${a})`;

/** unique, hand-drawn SVG cover per concept project — zero image payload */
export function ProjectCover({ id, hue, className }: Props) {
  const shell = cn("relative h-full w-full overflow-hidden", className);

  if (id === "ai-voice-agent")
    return (
      <div className={shell}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,rgba(139,92,255,0.28),transparent_60%)]" />
        <svg viewBox="0 0 320 170" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 34 }).map((_, i) => {
            const h = 6 + Math.abs(Math.sin(i * 0.72)) * 58 + (i % 5) * 4;
            return (
              <rect
                key={i}
                x={8 + i * 9}
                y={85 - h / 2}
                width={3.4}
                height={h}
                rx={2}
                fill={C(hue, 70, i % 4 === 0 ? 0.95 : 0.4)}
              />
            );
          })}
          <circle cx="160" cy="85" r="52" fill="none" stroke={C(hue, 70, 0.22)} />
          <circle cx="160" cy="85" r="72" fill="none" stroke={C(hue, 70, 0.12)} />
        </svg>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime pulse-dot" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-chalk/70 uppercase">call flow · active</span>
        </div>
      </div>
    );

  if (id === "social-promo")
    return (
      <div className={shell}>
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_80%_0%,rgba(61,125,255,0.3),transparent_62%)]" />
        <svg viewBox="0 0 320 170" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={C(hue, 72, 0.4)} />
            </pattern>
          </defs>
          <rect x="18" y="16" width="122" height="138" rx="12" fill="url(#dots)" opacity="0.9" />
          <rect x="152" y="16" width="62" height="66" rx="10" fill={C(hue, 60, 0.16)} stroke={C(hue, 75, 0.4)} />
          <rect x="152" y="92" width="62" height="62" rx="10" fill={C(hue, 60, 0.1)} stroke={C(hue, 75, 0.24)} />
          <rect x="224" y="16" width="80" height="138" rx="12" fill={C(hue, 60, 0.09)} stroke={C(hue, 75, 0.3)} />
          <path d="M234 118c14-6 18-24 22-38 4 16 10 20 22 22" fill="none" stroke={C(hue, 82, 0.9)} strokeWidth="2.4" />
          <text x="234" y="52" fill={C(hue, 86, 0.9)} fontFamily="monospace" fontSize="13">
            #1
          </text>
          <text x="234" y="72" fill={C(hue, 86, 0.5)} fontFamily="monospace" fontSize="11">
            #2
          </text>
          <text x="234" y="92" fill={C(hue, 86, 0.3)} fontFamily="monospace" fontSize="11">
            #3
          </text>
        </svg>
        <span className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.2em] text-chalk/70 uppercase">
          1 idea → 5 formats
        </span>
      </div>
    );

  if (id === "lead-gen-strategy")
    return (
      <div className={shell}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_90%,rgba(52,226,255,0.2),transparent_60%)]" />
        <svg viewBox="0 0 320 170" className="absolute inset-0 h-full w-full">
          {[
            { w: 250, y: 26 },
            { w: 190, y: 64 },
            { w: 128, y: 102 },
            { w: 66, y: 140 },
          ].map((row, i) => (
            <g key={i}>
              <rect
                x={160 - row.w / 2}
                y={row.y}
                width={row.w}
                height={22}
                rx={7}
                fill={C(hue, 62, 0.14 + i * 0.08)}
                stroke={C(hue, 78, 0.45)}
              />
              <text
                x={160 + row.w / 2 + 8}
                y={row.y + 15}
                fill={C(hue, 88, 0.75)}
                fontFamily="monospace"
                fontSize="9"
              >
                {["1,200", "410", "96", "17"][i]}
              </text>
            </g>
          ))}
          <motion.path
            d="M160 20v130"
            stroke={C(hue, 80, 0.5)}
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ strokeDashoffset: 0 }}
            whileInView={{ strokeDashoffset: -120 }}
            viewport={{ once: false }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <span className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.2em] text-chalk/70 uppercase">
          icp → list → score → meeting
        </span>
      </div>
    );

  if (id === "ai-product-ad")
    return (
      <div className={shell}>
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_-10%,rgba(255,181,69,0.24),transparent_60%)]" />
        <svg viewBox="0 0 320 170" className="absolute inset-0 h-full w-full">
          <rect x="34" y="18" width="252" height="134" rx="12" fill="rgba(255,255,255,0.03)" stroke={C(hue, 78, 0.4)} />
          <rect x="52" y="36" width="94" height="98" rx="8" fill={C(hue, 60, 0.14)} />
          <path d="M84 66l34 20-34 20z" fill={C(hue, 86, 0.9)} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="164" y={44 + i * 22} width={i === 0 ? 104 : i === 1 ? 84 : 60} height="9" rx="4.5" fill={C(hue, 78, 0.5 - i * 0.12)} />
          ))}
          <rect x="164" y="112" width="66" height="20" rx="10" fill={C(hue, 66, 0.9)} />
          <text x="176" y="126" fill="#1b1200" fontFamily="monospace" fontSize="9">
            CTA
          </text>
        </svg>
        <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.2em] text-chalk/70 uppercase">
          6 variants · 3 angles
        </span>
      </div>
    );

  return (
    <div className={shell}>
      <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_70%_10%,rgba(139,92,255,0.26),transparent_58%)]" />
      <svg viewBox="0 0 320 170" className="absolute inset-0 h-full w-full">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const h = 18 + Math.abs(Math.cos(i * 0.9)) * 74;
          return <rect key={i} x={26 + i * 34} y={132 - h} width={16} height={h} rx={5} fill={C(hue, 68, 0.22 + (i % 3) * 0.2)} />;
        })}
        <path
          d="M26 100 L60 74 L94 88 L128 46 L162 62 L196 34 L230 44 L264 18"
          fill="none"
          stroke={C(hue, 84, 0.95)}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {[
          [60, 74],
          [128, 46],
          [196, 34],
          [264, 18],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill="#eef3ff" />
        ))}
        <line x1="18" y1="132" x2="302" y2="132" stroke={C(hue, 80, 0.35)} />
      </svg>
      <span className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.2em] text-chalk/70 uppercase">
        spend · reach · leads · cpa
      </span>
    </div>
  );
}
