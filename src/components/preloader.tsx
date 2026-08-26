"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BarcodeMark } from "@/components/barcode-mark";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDone(true);
      return;
    }

    const duration = 2000;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setRevealing(true);
          window.setTimeout(() => setDone(true), 980);
        }, 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReduced]);

  const visible = !done && !prefersReduced;

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-paper"
          initial={{ opacity: 1 }}
          animate={{ y: revealing ? "100%" : 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="relative z-20 flex flex-col items-center"
            animate={{ opacity: revealing ? 0 : 1, scale: revealing ? 0.92 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative grid h-[310px] w-[224px] place-items-center rounded-[34px] border border-cyan-300/70 bg-slate-900/75 shadow-[0_0_18px_rgba(0,245,255,0.35),0_0_50px_rgba(124,58,237,0.18),inset_0_0_24px_rgba(0,245,255,0.08)]"
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute top-3 h-1 w-12 rounded-full bg-slate-600" />
              <div className="relative grid h-[230px] w-[188px] place-items-center overflow-hidden rounded-[14px] border border-cyan-300/20 bg-ink">
                <div className="relative h-[110px] w-[160px] overflow-hidden p-1">
                  <BarcodeMark className="h-full w-full justify-center gap-[3px] text-cyan-200 drop-shadow-[0_0_5px_rgba(0,245,255,0.65)]" bars={28} />
                  <motion.span
                    className="absolute left-0 right-0 top-[7%] h-0.5 bg-cyan-100 shadow-[0_0_8px_#00f2fe,0_0_18px_#00f2fe]"
                    animate={{ top: ["7%", "91%", "7%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <span className="absolute left-5 top-9 h-[22px] w-[22px] border-l-2 border-t-2 border-cyan-300" />
                <span className="absolute right-5 top-9 h-[22px] w-[22px] border-r-2 border-t-2 border-cyan-300" />
                <span className="absolute bottom-9 left-5 h-[22px] w-[22px] border-b-2 border-l-2 border-cyan-300" />
                <span className="absolute bottom-9 right-5 h-[22px] w-[22px] border-b-2 border-r-2 border-cyan-300" />
              </div>
            </motion.div>

            <p className="mt-6 font-sans text-xs font-semibold tracking-[0.27em] text-cyan-300">
              SCANNING IDENTITY
            </p>
            <p className="label mt-4 text-sm tracking-[0.4em]">BARCODE OUTFIT</p>
            <div className="mt-5 h-0.5 w-[200px] overflow-hidden rounded-full bg-paper/10">
              <motion.span
                className="block h-full rounded-full bg-cyan-300"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p className="mt-3 font-sans text-xs tabular-nums text-mist">
              {String(progress).padStart(3, "0")} %
            </p>
          </motion.div>

          <span className="sr-only" role="status">
            Loading Barcode Outfit, {progress}% complete
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
