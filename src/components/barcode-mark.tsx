import { cn } from "@/lib/utils";

interface BarcodeMarkProps {
  className?: string;
  bars?: number;
}

/**
 * The recurring barcode-bar motif used throughout the site as a signature
 * device: section dividers, the preloader, product codes, and hover states.
 * Bar widths are derived deterministically so the pattern reads as "data"
 * rather than a decorative stripe.
 */
export function BarcodeMark({ className, bars = 28 }: BarcodeMarkProps) {
  const widths = Array.from({ length: bars }, (_, i) => {
    const seed = (i * 7919) % 13;
    if (seed < 2) return 3;
    if (seed < 6) return 1;
    return 2;
  });

  return (
    <div
      className={cn("flex items-stretch gap-[2px]", className)}
      aria-hidden="true"
    >
      {widths.map((w, i) => (
        <span
          key={i}
          style={{ width: w, opacity: i % 5 === 0 ? 0.35 : 0.9 }}
          className="bg-current"
        />
      ))}
    </div>
  );
}
