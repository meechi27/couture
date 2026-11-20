import type { DemandFormField } from "@/features/demand/lib/demand-schema";

export type DemandFormErrors = Partial<Record<DemandFormField, string>>;
