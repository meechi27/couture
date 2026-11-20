import type { DemandInput } from "@/features/demand/lib/demand-schema";
import type { DemandFormErrors } from "@/features/demand/demand-form.types";

export type DemandActionResult =
    | { success: true; message: string; data: DemandInput }
    | { success: false; errors: DemandFormErrors };
