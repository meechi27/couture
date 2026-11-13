"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import { SubmitDemandButton } from "@/components/submit-demand-button";
import { submitDemand } from "@/app/actions/demand";

interface DemandFormProps {
    productId: string;
}

export interface DemandFormErrors {
    customerName?: string;
    phone?: string;
    size?: string;
    measurements?: string;
    notes?: string;
    form?: string;
}

export function DemandForm({ productId }: DemandFormProps) {
    const [errors, setErrors] = useState<DemandFormErrors>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        setSuccessMessage(null);
        e.preventDefault();
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const response = await submitDemand(formData);
        if(!response.success){
            setErrors(response.errors);
        } else {
            setSuccessMessage(response.message);
            form.reset();
        }
    };

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
                Submit a Demand
            </h2>

            {errors.form && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                    {errors.form}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <input type="hidden" name="productId" value={productId} />

                {/* Customer Name */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="customerName" className="text-sm font-medium text-neutral-700">
                        Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="customerName"
                        name="customerName"
                        type="text"
                        placeholder="Enter your full name"
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                            errors.customerName ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.customerName && (
                        <p className="text-xs text-red-500">{errors.customerName}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput id="phone" name="phone" hasError={Boolean(errors.phone)} />
                    {errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* Size */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-700">
                        Size <span className="text-red-500">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                            <label key={size} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    className="peer sr-only"
                                />
                                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-neutral-300 px-3 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-100 peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white">
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.size && (
                        <p className="text-xs text-red-500">{errors.size}</p>
                    )}
                </div>

                {/* Measurements */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="measurements" className="text-sm font-medium text-neutral-700">
                        Measurements / Customization Details
                    </label>
                    <textarea
                        id="measurements"
                        name="measurements"
                        rows={3}
                        maxLength={300}
                        placeholder="Bust, waist, hips, length, fabric preferences…"
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
                            errors.measurements ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.measurements && (
                        <p className="text-xs text-red-500">{errors.measurements}</p>
                    )}
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-sm font-medium text-neutral-700">
                        Additional Notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        maxLength={150}
                        placeholder="Anything else we should know…"
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
                            errors.notes ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.notes && (
                        <p className="text-xs text-red-500">{errors.notes}</p>
                    )}
                </div>

                <SubmitDemandButton />
            </form>

            {/* Success Modal / Popup */}
            {successMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Success!</h3>
                        <p className="text-sm text-neutral-600 mb-6">{successMessage}</p>

                        <button
                            type="button"
                            onClick={() => setSuccessMessage(null)}
                            className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

