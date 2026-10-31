export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Silk Shirt",
    category: "Clothing",
    price: 120,
  },
  {
    id: "2",
    name: "Tailored Wool Trousers",
    category: "Clothing",
    price: 180,
  },
  {
    id: "3",
    name: "Leather Chelsea Boots",
    category: "Footwear",
    price: 250,
  },
  {
    id: "4",
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 85,
  },
  {
    id: "5",
    name: "Minimalist Watch",
    category: "Accessories",
    price: 210,
  },
];

