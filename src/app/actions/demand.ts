"use server"
import { DemandFormErrors } from "@/components/demand-form";
import { demandSchema } from "../lib/validations/demand-schema";

type DemandActionResult =
    | { success: true; message: string }
    | { success: false; errors: DemandFormErrors };



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
        
        const fieldErrors = result.error.flatten().fieldErrors

        return {
            success: false,
            errors: {
                customerName: fieldErrors.customerName?.[0],
                phone: fieldErrors.phone?.[0],
                size: fieldErrors.size?.[0],
                measurements: fieldErrors.measurements?.[0],
                notes: fieldErrors.notes?.[0],
            },
        };
    }
    return {
        success: true,
        message: "Your demand information passed validation.",
    };



}