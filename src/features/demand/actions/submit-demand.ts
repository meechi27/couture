"use server";

import type { DemandActionResult } from "@/features/demand/demand-action.types";
import type { DemandFormErrors } from "@/features/demand/demand-form.types";
import { demandSchema } from "@/features/demand/lib/demand-schema";

type DemandSchemaField = keyof typeof demandSchema.shape;

export async function submitDemand(formData: FormData): Promise<DemandActionResult> {
    const rawData = {
        productId: formData.get("productId"),
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        size: formData.get("size"),
        measurements: formData.get("measurements"),
        notes: formData.get("notes"),
    };

    const result = demandSchema.safeParse(rawData);

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        const errors: DemandFormErrors = {};
        for (const field of Object.keys(demandSchema.shape) as DemandSchemaField[]) {
            if (field === "productId") continue;
            errors[field] = fieldErrors[field]?.[0];
        }

        return { success: false, errors };
    }

    return {
        success: true,
        message: "Your demand information passed validation.",
        data: result.data,
    };
}
