import type { DemandFormField, DemandInput } from "@/features/demand/lib/demand-schema";

export type DemandFormErrors = Partial<Record<DemandFormField, string>>;

export type DemandActionResult =
    | { success: true; message: string; data: DemandInput }
    | { success: false; errors: DemandFormErrors };
