"use client";

import { motion } from "motion/react";
import { BarcodeMark } from "@/components/barcode-mark";

export function BrandStatement() {
  return (
    <section className="flex flex-col items-center justify-center border-t border-line-dark bg-ink px-6 py-32 text-center md:py-48">
      <BarcodeMark className="mb-10 h-6 text-mist" bars={24} />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[13vw] italic leading-[0.95] text-paper md:text-[7vw]"
      >
        Style without noise.
      </motion.h2>
    </section>
  );
}
