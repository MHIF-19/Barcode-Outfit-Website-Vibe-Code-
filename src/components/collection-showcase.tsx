"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/scroll-reveal";

const COLLECTIONS = [
  {
    name: "The Essentials",
    tag: "01",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Monochrome",
    tag: "02",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Urban Series",
    tag: "03",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1600&auto=format&fit=crop",
  },
];

export function CollectionShowcase() {
  return (
    <section id="collections" className="bg-ink px-5 pt-24 md:px-10 md:pt-32">
      <ScrollReveal>
        <div className="mb-12 flex items-end justify-between border-b border-line-dark pb-6">
          <h2 className="font-display text-4xl italic text-paper md:text-6xl">
            Collections
          </h2>
          <p className="label hidden text-[11px] text-mist md:block">
            Scroll →
          </p>
        </div>
      </ScrollReveal>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-24 md:-mx-10 md:gap-6 md:px-10">
        {COLLECTIONS.map((c, i) => (
          <motion.a
            href="#new-arrivals"
            key={c.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group relative h-[52vh] w-[82vw] shrink-0 snap-start overflow-hidden md:h-[70vh] md:w-[46vw]"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 82vw, 46vw"
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <h3 className="font-display text-3xl italic text-paper md:text-4xl">
                {c.name}
              </h3>
              <span className="label text-xs text-paper/70">{c.tag}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
