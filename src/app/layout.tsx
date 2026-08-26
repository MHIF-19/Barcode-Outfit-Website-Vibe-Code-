import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Barcode Outfit — Defined by the Details",
  description:
    "Barcode Outfit is a premium fashion house for men, women and kids. Considered essentials, tailored outerwear and editorial-grade basics — designed with restraint, built to last.",
  openGraph: {
    title: "Barcode Outfit — Defined by the Details",
    description:
      "Premium modern fashion for men, women and kids. Shop the new collection.",
    siteName: "Barcode Outfit",
    type: "website",
  },
  metadataBase: new URL("https://barcodeoutfit.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-paper antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
