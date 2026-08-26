export interface Product {
  id: string;
  code: string; // barcode-style product code, e.g. "004-M"
  name: string;
  category: "Men" | "Women" | "Kids";
  price: number; // whole Pakistani rupees
  compareAt?: number;
  image: string;
  sale?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    code: "001",
    name: "Utility Cargo Pants",
    category: "Men",
    price: 2990,
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    code: "002",
    name: "Relaxed Baggy Trouser",
    category: "Men",
    price: 2490,
    compareAt: 2990,
    sale: true,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    code: "003",
    name: "Bangladeshi Cotton Leggings",
    category: "Women",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    code: "004",
    name: "Kids Classic Polo",
    category: "Kids",
    price: 1190,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    code: "005",
    name: "Kids Denim Jeans",
    category: "Kids",
    price: 1690,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    code: "006",
    name: "Everyday Women's Tops",
    category: "Women",
    price: 1390,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p7",
    code: "007",
    name: "Performance Gym Wear Suit",
    category: "Women",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p8",
    code: "008",
    name: "Printed Lawn 2-Piece Suit",
    category: "Women",
    price: 3490,
    compareAt: 4290,
    sale: true,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
  },
];
