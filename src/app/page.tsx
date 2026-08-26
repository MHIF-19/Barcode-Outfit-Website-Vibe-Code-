import { Preloader } from "@/components/preloader";
import { Navbar } from "@/components/navbar";
import { ScrollExpandMedia } from "@/components/scroll-expand-media";
import { CategorySection } from "@/components/category-section";
import { ProductGridSection } from "@/components/product-grid";
import { EditorialSection } from "@/components/editorial-section";
import { DepartmentSection } from "@/components/department-section";
import { BrandStatement } from "@/components/brand-statement";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ScrollStack, ScrollStackItem } from "@/components/scroll-stack";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <CartDrawer />

      <main id="top">
        {/* Hero media: real Barcode Outfit storefront footage + poster */}
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc="/hero/campaign.mp4"
          posterSrc="/hero/campaign-poster.jpg"
          bgImageSrc="/hero/campaign-poster.jpg"
          ctaLabel="Shop Collection"
          ctaHref="#offers"
        />

        <CategorySection />

        <ProductGridSection />

        <EditorialSection />

        <ScrollStack
          itemDistance={80}
          itemStackDistance={34}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.88}
          itemScale={0.035}
        >
          <ScrollStackItem>
            <DepartmentSection
              id="men"
              index="Dept. 01"
              name="Men"
              headline="Tailoring that moves with you."
              copy="Structured outerwear, considered basics, and denim cut for everyday wear -- engineered for a decade of use, not a season."
              image="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1400&auto=format&fit=crop"
            />
          </ScrollStackItem>

          <ScrollStackItem>
            <DepartmentSection
              id="women"
              index="Dept. 02"
              name="Women"
              headline="Softness, structured."
              copy="Fluid silhouettes built on precise pattern-cutting -- pieces that hold their line from the studio to the street."
              image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop"
              reverse
            />
          </ScrollStackItem>

          <ScrollStackItem>
            <DepartmentSection
              id="kids"
              index="Dept. 03"
              name="Kids"
              headline="Made to be worn hard."
              copy="Durable fabrics and forgiving cuts, designed for climbing, running and everything in between -- without losing the house silhouette."
              image="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1400&auto=format&fit=crop"
            />
          </ScrollStackItem>
        </ScrollStack>

        <BrandStatement />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
