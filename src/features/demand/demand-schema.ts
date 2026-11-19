import { z } from "zod";
import { DEMAND_SIZES } from "@/features/demand/demand-sizes";

export const demandSchema = z.object({
  productId: z
    .string({ message: "Product ID is required." })
    .trim()
    .min(1, "Product ID cannot be empty."),

  customerName: z
    .string({ message: "Customer name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name cannot exceed 50 characters."),

  phone: z
    .string({ message: "Phone number is required." })
    .trim()
    .transform((val) => val.replace(/\D/g, ""))
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
