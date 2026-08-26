"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BarcodeMark } from "@/components/barcode-mark";

export function EditorialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="grid grid-cols-1 items-center gap-10 bg-ink px-5 py-24 md:grid-cols-12 md:gap-6 md:px-10 md:py-40"
    >
      <div className="md:col-span-5 md:col-start-1">
        <ScrollReveal>
          <BarcodeMark className="mb-6 h-4 text-mist" bars={16} />
          <h2 className="font-display text-4xl italic leading-[1.05] text-paper md:text-6xl">
            Garments made to be worn, not archived.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-mist md:text-base">
            Every Barcode Outfit piece begins as a single fabric decision —
            weight, hand-feel, drape — before a single seam is drawn. The
            result is clothing that holds its shape through daily wear and
            gets better with every season.
          </p>
          <a
            href="#collections"
            className="label mt-8 inline-flex items-center gap-3 border-b border-paper/40 pb-1 text-[11px] text-paper transition-colors hover:border-paper"
          >
            Read the story
          </a>
        </ScrollReveal>
      </div>

      <div className="relative md:col-span-6 md:col-start-7">
        <motion.div
          style={{ y }}
          className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
        >
          <Image
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1400&auto=format&fit=crop"
            alt="Barcode Outfit editorial campaign"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute -bottom-6 -left-6 hidden h-32 w-24 overflow-hidden border-4 border-ink bg-paper-dim md:block">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop"
            alt="Detail shot"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
