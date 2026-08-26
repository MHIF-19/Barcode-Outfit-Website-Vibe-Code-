"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { lines, isCartOpen, closeCart, setQty, removeFromCart, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-paper text-ink"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line-light px-6 py-5">
              <h2 className="label text-sm">Cart ({lines.length})</h2>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="p-1 text-ink hover:opacity-60"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <p className="mt-16 text-center text-sm text-mist-dark">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => (
                    <li key={line.product.id} className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-paper-dim">
                        <Image
                          src={line.product.image}
                          alt={line.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-sm">{line.product.name}</p>
                            <p className="label mt-1 text-[10px] text-mist-dark">
                              {line.product.category}
                            </p>
                          </div>
                          <p className="text-sm">
                            {formatPrice(line.product.price * line.qty)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-line-light">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                setQty(line.product.id, line.qty - 1)
                              }
                              className="p-1.5 hover:bg-paper-dim"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-6 text-center text-xs tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() =>
                                setQty(line.product.id, line.qty + 1)
                              }
                              className="p-1.5 hover:bg-paper-dim"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(line.product.id)}
                            className="label text-[10px] text-mist-dark underline-offset-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line-light px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="label text-xs text-mist-dark">Subtotal</span>
                <span className="text-base">{formatPrice(subtotal)}</span>
              </div>
              <button
                disabled={lines.length === 0}
                className="label w-full bg-ink py-4 text-xs text-paper transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Checkout
              </button>
              <p className="mt-3 text-center text-[11px] text-mist-dark">
                Checkout is not connected in this preview.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
