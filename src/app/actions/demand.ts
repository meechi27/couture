import { demandSchema } from "../lib/validations/demand-schema";
"use server"

export async function submitDemand(formData: FormData) {
    console.log(formData);
    const rawData = {
        productId: formData.get("productId"),
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        size: formData.get("size"),
        measurements: formData.get("measurements"),
        notes: formData.get("notes"),
    };

    const result = demandSchema.safeParse(rawData);
}