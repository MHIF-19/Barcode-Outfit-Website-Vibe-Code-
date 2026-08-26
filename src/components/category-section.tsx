"use client";

import { ArrowUpRight, Tag } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/scroll-reveal";

const OFFERS = [
  {
    code: "Offer 01",
    price: "Rs. 2600",
    title: "2 Jeans",
    copy: "Double up on everyday denim.",
    image: "/hero/Gemini_Generated_Image_ckp0luckp0luckp0.jfif",
    tone: "bg-[#d8d1c4] text-ink",
  },
  {
    code: "Offer 02",
    price: "Rs. 2400",
    title: "2 Polo T-Shirts",
    copy: "Two polished layers for less.",
    image: "/hero/Gemini_Generated_Image_orss4porss4porss.jfif",
    tone: "bg-[#b7c5c1] text-ink",
  },
  {
    code: "Offer 03",
    price: "Rs. 1500",
    title: "3 T-Shirts",
    copy: "Build your daily rotation.",
    image: "/hero/Gemini_Generated_Image_tmj329tmj329tmj3.jfif",
    tone: "bg-[#d7b3a9] text-ink",
  },
];

export function CategorySection() {
  return (
    <section id="offers" className="bg-paper px-5 py-20 text-ink md:px-10 md:py-28">
      <ScrollReveal>
        <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-5">
          <div>
            <p className="label mb-3 text-[11px] text-mist-dark">Limited time</p>
            <h2 className="font-display text-5xl italic md:text-7xl">Current Offers</h2>
          </div>
          <Tag className="mb-1 hidden md:block" size={28} strokeWidth={1.2} />
        </div>
      </ScrollReveal>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:-mx-10 md:gap-6 md:px-10">
        {OFFERS.map((offer, index) => (
          <ScrollReveal key={offer.code} delay={index * 0.1} y={20} className="shrink-0 snap-start">
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className={`relative flex h-[360px] w-[82vw] flex-col justify-between overflow-hidden rounded-3xl p-7 md:h-[440px] md:w-[31vw] md:p-9 ${offer.tone}`}
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                sizes="(max-width: 768px) 82vw, 31vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
              <div className="flex items-center justify-between">
                <span className="label relative text-[11px] text-paper/80">{offer.code}</span>
                <ArrowUpRight className="relative text-paper" size={22} strokeWidth={1.3} />
              </div>
              <div className="relative text-paper">
                <p className="label text-xs text-paper/75">Buy together</p>
                <p className="mt-3 font-sans text-5xl font-bold tracking-tight md:text-6xl">{offer.price}</p>
                <h3 className="mt-2 font-display text-4xl italic md:text-5xl">{offer.title}</h3>
                <p className="mt-4 max-w-xs text-sm text-paper/75">{offer.copy}</p>
              </div>
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
