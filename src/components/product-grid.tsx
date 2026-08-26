import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BarcodeMark } from "@/components/barcode-mark";

export function ProductGridSection() {
  return (
    <section id="new-arrivals" className="bg-ink px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line-dark pb-6 md:mb-16">
          <div>
            <BarcodeMark className="mb-4 h-4 text-mist" bars={18} />
            <h2 className="font-display text-4xl italic text-paper md:text-6xl">
              New Arrivals
            </h2>
          </div>
          <p className="label max-w-xs text-[11px] text-mist">
            The latest drop — considered pieces, released in limited runs.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">
        {products.map((product, i) => (
          <ScrollReveal key={product.id} delay={Math.min(i * 0.06, 0.3)} y={20}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
