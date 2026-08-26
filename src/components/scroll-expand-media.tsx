"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  scrollHint?: string;
  children?: ReactNode;
}

export function ScrollExpandMedia({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  ctaLabel,
  ctaHref,
  scrollHint = "Scroll to explore",
  children,
}: ScrollExpandMediaProps) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const progressRef = useRef(reduced ? 1 : 0);
  const touchStartRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const setExpansion = (value: number) => {
      const next = Math.min(1, Math.max(0, value));
      progressRef.current = next;
      setProgress(next);
    };

    const html = document.documentElement;
    const body = document.body;
    const savedScrollY = window.scrollY;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyTop = body.style.top;
    const originalBodyWidth = body.style.width;

    const setPageLock = (locked: boolean) => {
      if (locked) {
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${savedScrollY}px`;
        body.style.width = "100%";
      } else {
        html.style.overflow = originalHtmlOverflow;
        body.style.overflow = originalBodyOverflow;
        body.style.position = originalBodyPosition;
        body.style.top = originalBodyTop;
        body.style.width = originalBodyWidth;
        window.scrollTo(0, savedScrollY);
      }
    };

    setPageLock(true);

    const handleWheel = (event: WheelEvent) => {
      const atTop = window.scrollY <= 5;
      const expanding = event.deltaY > 0 && progressRef.current < 1;
      const collapsing = event.deltaY < 0 && atTop && progressRef.current > 0;
      if (!expanding && !collapsing) return;

      event.preventDefault();
      const wheelDelta = Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 90);
      setExpansion(progressRef.current + wheelDelta * 0.0007);
      if (progressRef.current >= 1) setPageLock(false);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartRef.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const delta = touchStartRef.current - currentY;
      const atTop = window.scrollY <= 5;
      const expanding = delta > 0 && progressRef.current < 1;
      const collapsing = delta < 0 && atTop && progressRef.current > 0;
      if (!expanding && !collapsing) return;

      event.preventDefault();
      const touchDelta = Math.sign(delta) * Math.min(Math.abs(delta), 45);
      setExpansion(progressRef.current + touchDelta * 0.007);
      touchStartRef.current = currentY;
      if (progressRef.current >= 1) setPageLock(false);
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { capture: true, passive: false });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });
    window.addEventListener("touchend", handleTouchEnd, true);

    return () => {
      setPageLock(false);
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
    };
  }, [reduced]);

  const targetWidth = viewport.width * 0.94;
  const targetHeight = viewport.height * 0.82;
  const mediaWidth = 340 + progress * (targetWidth - 340);
  const mediaHeight = 440 + progress * (targetHeight - 440);
  const textTranslate = progress * (viewport.width < 768 ? 260 : 560);
  const textOpacity = Math.max(0, 1 - Math.max(0, progress - 0.45) * 1.8);

  return (
    <div ref={sectionRef} className="relative overflow-x-hidden bg-ink text-paper">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div className="absolute inset-0 z-0" animate={{ opacity: 1 - progress * 0.9 }}>
            <Image src={bgImageSrc} alt="" fill priority sizes="100vw" className="object-cover object-center grayscale-[15%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/80" />
          </motion.div>

          <div className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-center px-6">
            <motion.div
              className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem]"
              animate={{ width: mediaWidth, height: mediaHeight }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.55)" }}
            >
              {mediaType === "video" ? (
                <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" controls={false} disablePictureInPicture />
              ) : (
                <Image src={mediaSrc} alt={title || "Barcode Outfit campaign"} fill sizes="94vw" className="object-cover" priority />
              )}
              <motion.div className="absolute inset-0 bg-ink/35" animate={{ opacity: 0.5 - progress * 0.3 }} />
            </motion.div>

            <div className="pointer-events-none relative z-10 flex w-full flex-col items-center gap-3 text-center mix-blend-difference">
              <motion.h1 className="font-sans text-[13vw] font-bold leading-[0.95] tracking-tight text-paper md:text-[8vw]" animate={{ opacity: textOpacity, x: -textTranslate }} transition={{ duration: 0.15, ease: "easeOut" }}>
                BARCODE
              </motion.h1>
              <motion.h1 className="font-sans text-[13vw] font-bold leading-[0.95] tracking-tight text-paper md:text-[8vw]" animate={{ opacity: textOpacity, x: textTranslate }} transition={{ duration: 0.15, ease: "easeOut" }}>
                OUTFIT
              </motion.h1>
            </div>

            {ctaLabel && ctaHref && (
              <motion.a href={ctaHref} className="label absolute bottom-28 z-20 rounded-full bg-paper px-7 py-3.5 text-xs font-semibold text-ink" animate={{ opacity: 1 - progress * 1.6 }}>
                {ctaLabel}
              </motion.a>
            )}

            <motion.div className="absolute bottom-12 z-20 flex flex-col items-center gap-3" animate={{ opacity: 1 - progress * 1.8 }}>
              <span className="label text-[11px] text-mist">{scrollHint}</span>
              <span className="h-8 w-px bg-paper/50" />
            </motion.div>
          </div>

          {children && <div className="relative z-10 flex w-full flex-col px-2 py-16 md:px-8 md:py-24">{children}</div>}
        </div>
      </section>
    </div>
  );
}
