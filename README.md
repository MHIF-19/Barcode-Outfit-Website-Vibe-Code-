# Barcode Outfit

Premium fashion e-commerce homepage. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. First build requires network access to Google Fonts
(Fraunces + Archivo are loaded via next/font/google).

## Structure

- `src/app/page.tsx` — homepage section assembly
- `src/components/scroll-expand-media.tsx` — the adapted 21st.dev scroll hero,
  migrated to the `motion` package, restyled for the brand, and made to
  respect `prefers-reduced-motion`
- `src/components/*` — Navbar, Preloader, ProductCard/Grid, CartDrawer,
  CategorySection, EditorialSection, CollectionShowcase, DepartmentSection,
  BrandStatement, Newsletter, Footer
- `src/lib/products.ts` — mock product catalog (no backend yet)
- `src/components/cart-provider.tsx` — local cart + wishlist state (mock only)
- `public/hero/campaign.mp4` / `campaign-poster.jpg` — your uploaded hero
  assets, already wired into the hero as the primary video + poster/background

## Notes

- Checkout is UI-only — there's no payment backend wired up, by design.
- The hero background/poster currently uses your storefront photo, which is
  out of focus. It still reads fine as a moody overlay behind the video, but
  if you have a sharper shot (or want to shoot fresh campaign stills), that's
  a one-line swap in `src/app/page.tsx`.
- Product images are Unsplash placeholders — swap `src/lib/products.ts` and
  the category/department section images for real product photography
  whenever it's ready.
