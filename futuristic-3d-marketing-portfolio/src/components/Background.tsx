import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* deep space wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_-8%,rgba(61,125,255,0.28),transparent_58%),radial-gradient(90%_70%_at_8%_8%,rgba(139,92,255,0.2),transparent_60%),radial-gradient(120%_90%_at_50%_120%,rgba(52,226,255,0.12),transparent_55%)]" />

      {/* star field */}
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(1.4px_1.4px_at_12%_22%,rgba(215,229,255,0.75),transparent_60%),radial-gradient(1px_1px_at_28%_68%,rgba(215,229,255,0.55),transparent_60%),radial-gradient(1.6px_1.6px_at_62%_16%,rgba(160,190,255,0.6),transparent_60%),radial-gradient(1px_1px_at_82%_52%,rgba(215,229,255,0.5),transparent_60%),radial-gradient(1.3px_1.3px_at_46%_84%,rgba(190,170,255,0.55),transparent_60%),radial-gradient(1px_1px_at_92%_78%,rgba(215,229,255,0.45),transparent_60%),radial-gradient(1.2px_1.2px_at_4%_52%,rgba(215,229,255,0.4),transparent_60%)]" />

      {/* perspective grid horizon */}
      <div className="absolute inset-x-[-25%] bottom-[-12%] h-[62vh] opacity-[0.4] [mask-image:linear-gradient(to_top,#000,transparent_78%)]">
        <div className="grid-floor h-full w-full [transform:perspective(560px)_rotateX(66deg)]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-[38vh] opacity-[0.14] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]">
        <div className="grid-floor h-full w-full [transform:perspective(700px)_rotateX(-64deg)]" />
      </div>

      {/* slow conic sweep */}
      <div className="absolute top-[-30vh] left-1/2 h-[80vh] w-[130vw] -translate-x-1/2 opacity-[0.16] [background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(61,125,255,0.55)_38deg,transparent_86deg,rgba(139,92,255,0.5)_190deg,transparent_250deg)] blur-[70px] spin-slow" />

      {/* horizon line */}
      <div className="absolute inset-x-0 top-[62vh] h-px hairline opacity-40" />

      {/* grain + vignette */}
      <div className="noise absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(105%_105%_at_50%_50%,transparent_52%,rgba(2,4,12,0.82))]" />
    </div>
  );
}

export function CursorLight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-60 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgba(72,124,255,0.14), rgba(139,92,255,0.07) 42%, transparent 68%)",
      }}
    />
  );
}
