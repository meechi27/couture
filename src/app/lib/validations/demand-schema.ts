import { z } from "zod";

export const DEMAND_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
] as const;

export const demandSchema = z.object({
  productId: z
    .string({ message: "Product ID is required." })
    .trim()
    .min(1, "Product ID cannot be empty."),

  customerName: z
    .string({ message: "Customer name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(20, "Name cannot exceed 20 characters."),

  phone: z
    .string({ message: "Phone number is required." })
    .trim()
    // Strips non-digits
    .transform((val) => val.replace(/\D/g, ""))
    // Algerian format: 10 digits starting with 0, or 9 digits starting with 1-9
    .refine(
      (val) => /^(0[0-9]{9}|[1-9][0-9]{8})$/.test(val),
      "Invalid Algerian phone number format (9 digits, or 10 digits starting with 0)."
    ),

  size: z.enum(DEMAND_SIZES, {
    message: "Please select a valid size.",
  }),

  measurements: z
    .string()
    .trim()
    .max(100, "Measurements cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(100, "Notes cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),
});

export type DemandInput = z.infer<typeof demandSchema>;
