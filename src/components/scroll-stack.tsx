"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import "./scroll-stack.css";

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export function ScrollStackItem({ children, itemClassName = "" }: ScrollStackItemProps) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>
      {children}
    </div>
  );
}

export function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, string>());
  const completedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const parsePosition = useCallback((value: string, height: number) => {
    return value.endsWith("%")
      ? (parseFloat(value) / 100) * height
      : parseFloat(value);
  }, []);

  const getDocumentTop = useCallback((element: HTMLElement) => {
    let top = 0;
    let current: HTMLElement | null = element;

    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }

    return top;
  }, []);

  const updateCards = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length || !stackRef.current) return;

    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    if (window.innerWidth < 768) {
      cards.forEach((card) => {
        card.style.transform = "none";
        card.style.filter = "none";
      });
      return;
    }

    const stackPositionPx = parsePosition(stackPosition, viewportHeight);
    const scaleEndPositionPx = parsePosition(scaleEndPosition, viewportHeight);
    const endElement = stackRef.current.querySelector(".scroll-stack-end");
    const endTop = endElement ? getDocumentTop(endElement) : scrollTop;
    const pinEnd = endTop - viewportHeight / 2;
    let topCardIndex = 0;

    cards.forEach((card, index) => {
      const cardTop = getDocumentTop(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      if (scrollTop >= triggerStart) topCardIndex = index;
    });

    cards.forEach((card, index) => {
      const cardTop = getDocumentTop(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const scaleProgress = Math.min(
        1,
        Math.max(0, (scrollTop - triggerStart) / (triggerEnd - triggerStart))
      );
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const isPinned = scrollTop >= triggerStart && scrollTop <= pinEnd;
      const translateY = isPinned
        ? scrollTop - cardTop + stackPositionPx + itemStackDistance * index
        : scrollTop > pinEnd
          ? pinEnd - cardTop + stackPositionPx + itemStackDistance * index
          : 0;
      const rotation = rotationAmount * index * scaleProgress;
      const depth = Math.max(0, topCardIndex - index);
      const blur = depth * blurAmount;
      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      const filter = blur ? `blur(${blur}px)` : "none";
      const signature = `${transform}|${filter}`;

      if (lastTransformsRef.current.get(index) !== signature) {
        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(index, signature);
      }

      if (index === cards.length - 1) {
        const isComplete = scrollTop >= triggerStart && scrollTop <= pinEnd;
        if (isComplete && !completedRef.current) {
          completedRef.current = true;
          onStackComplete?.();
        } else if (!isComplete) {
          completedRef.current = false;
        }
      }
    });
  }, [baseScale, blurAmount, getDocumentTop, itemScale, itemStackDistance, onStackComplete, parsePosition, rotationAmount, scaleEndPosition, stackPosition]);

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    cardsRef.current = Array.from(
      stack.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );
    cardsRef.current.forEach((card, index) => {
      if (index < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
    });

    const lenis = new Lenis({ duration: 1.2, lerp: 0.1, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      updateCards();
      frameRef.current = requestAnimationFrame(raf);
    };
    frameRef.current = requestAnimationFrame(raf);
    updateCards();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      lenis.destroy();
      cardsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [itemDistance, updateCards]);

  return (
    <div ref={stackRef} className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
