"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { BarcodeMark } from "@/components/barcode-mark";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Kids", href: "#kids" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Collections", href: "#collections" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, wishlist, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-0 md:px-6">
        <div
          className={cn(
            "relative mx-auto flex h-14 max-w-[1600px] items-center justify-between rounded-b-xl border-0 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.16)] backdrop-blur-[24px] backdrop-saturate-150 transition-colors duration-500 md:h-16 md:px-5",
            scrolled ? "bg-paper/30" : "bg-paper/25"
          )}
          style={{
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
          }}
        >
          <a
            href="#top"
            className="font-sans text-base font-bold tracking-[0.08em] text-paper md:text-lg"
          >
            BARCODE OUTFIT
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="label group relative text-xs font-semibold text-paper/85 transition-colors hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              aria-label="Search"
              className="hidden rounded-full p-2 text-paper/85 transition-colors hover:text-paper md:inline-flex"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Account"
              className="hidden rounded-full p-2 text-paper/85 transition-colors hover:text-paper md:inline-flex"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative hidden rounded-full p-2 text-paper/85 transition-colors hover:text-paper md:inline-flex"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-signal" />
              )}
            </button>
            <button
              aria-label={`Cart, ${count} items`}
              onClick={openCart}
              className="relative rounded-full p-2 text-paper/85 transition-colors hover:text-paper"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-paper text-[9px] font-semibold text-ink">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 rounded-full p-2 text-paper/85 transition-colors hover:text-paper lg:hidden"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-24 pb-10 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-2"
              aria-label="Mobile"
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  className="border-b border-line-dark py-4 font-sans text-5xl font-bold text-paper"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between">
              <BarcodeMark className="h-6 text-mist" bars={20} />
              <p className="label text-[11px] text-mist">Est. Barcode Outfit</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
