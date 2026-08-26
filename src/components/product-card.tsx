"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-provider";
import { formatPrice, cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const liked = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {product.sale && (
          <span className="label absolute left-3 top-3 bg-signal px-2 py-1 text-[10px] text-paper">
            Sale
          </span>
        )}

        <button
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-ink/50 p-2 text-paper backdrop-blur transition-colors hover:bg-ink/80"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={cn(liked && "fill-paper")}
          />
        </button>

        <motion.button
          onClick={() => addToCart(product)}
          initial={false}
          className="label absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 bg-paper py-3 text-[11px] text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={13} strokeWidth={2} />
          Add to Cart
        </motion.button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] leading-snug text-paper">{product.name}</p>
          <p className="label mt-1 text-[10px] text-mist">
            {product.category} — N°{product.code}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[13px] text-paper">{formatPrice(product.price)}</p>
          {product.compareAt && (
            <p className="text-[11px] text-mist line-through">
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
