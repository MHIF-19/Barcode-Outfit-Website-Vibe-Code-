"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface DepartmentSectionProps {
  id: string;
  index: string;
  name: string;
  headline: string;
  copy: string;
  image: string;
  reverse?: boolean;
}

export function DepartmentSection({
  id,
  index,
  name,
  headline,
  copy,
  image,
  reverse,
}: DepartmentSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id={id}
      ref={ref}
      className="grid min-h-[100dvh] snap-start grid-cols-1 overflow-hidden rounded-3xl border-t border-line-dark md:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"
    >
      <div
        className={`relative h-[58vh] overflow-hidden md:h-auto ${
          reverse ? "md:order-1" : ""
        }`}
      >
        <motion.div style={{ y }} className="absolute inset-0 -m-6">
          <Image
            src={image}
            alt={`${name} department`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div
        className={`flex flex-col justify-center bg-paper px-7 py-14 text-ink md:px-12 md:py-0 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <ScrollReveal>
          <span className="label text-xs text-mist-dark">{index}</span>
          <h2 className="mt-4 font-display text-5xl italic text-ink md:text-6xl lg:text-7xl">
            {name}
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-dark md:text-base">
            {headline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-dark/80">
            {copy}
          </p>
          <a
            href="#new-arrivals"
            className="label group mt-9 inline-flex items-center gap-3 text-xs text-ink"
          >
            Shop {name}
            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
