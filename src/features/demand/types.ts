export interface DemandFormErrors {
    customerName?: string;
    phone?: string;
    size?: string;
    measurements?: string;
    notes?: string;
}

export type DemandActionResult =
    | { success: true; message: string }
    | { success: false; errors: DemandFormErrors };
