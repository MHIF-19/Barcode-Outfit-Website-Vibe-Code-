"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // No backend connected in this preview — mock local confirmation only.
    setSubmitted(true);
  };

  return (
    <section className="border-t border-line-dark bg-ink px-6 py-24 md:py-32">
      <ScrollReveal className="mx-auto flex max-w-xl flex-col items-center text-center">
        <h2 className="font-display text-4xl italic text-paper md:text-5xl">
          Get the next drop.
        </h2>
        <p className="label mt-4 text-[11px] text-mist">
          One email, before each release. No noise.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm text-paper">
            You&rsquo;re on the list — see you at the next drop.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-sm items-center border-b border-paper/40 focus-within:border-paper"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-transparent py-3 text-sm text-paper placeholder:text-mist focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="p-2 text-paper transition-transform hover:translate-x-1"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
        )}
      </ScrollReveal>
    </section>
  );
}
