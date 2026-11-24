import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Background, CursorLight } from "./components/Background";
import { Contact } from "./components/Contact";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { QuoteBand } from "./components/QuoteBand";
import { Skills } from "./components/Skills";

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-100 grid place-items-center bg-void"
        >
          <div className="w-[260px] text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[15px] font-semibold tracking-[-0.01em] text-chalk"
            >
              Abhinav Mishra
            </motion.p>
            <p className="mt-1.5 font-mono text-[9px] tracking-[0.3em] text-electric-2/70 uppercase">
              booting ai core
            </p>
            <div className="mt-5 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-linear-to-r from-electric via-volt to-aqua"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1150);
    const onLoad = () => window.setTimeout(() => setReady(true), 260);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full font-body text-chalk antialiased">
      <Background />
      <CursorLight />
      <Loader done={ready} />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <QuoteBand />
        <Skills />
        <Projects />
        <Dashboard />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
