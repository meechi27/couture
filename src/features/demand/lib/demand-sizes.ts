export const DEMAND_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
] as const;

export type DemandSize = (typeof DEMAND_SIZES)[number];
