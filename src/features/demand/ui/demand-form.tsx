"use client";

import { useEffect, useRef, useState } from "react";
import type { DemandFormErrors } from "@/features/demand/demand-form.types";
import { DEMAND_SIZES } from "@/features/demand/lib/demand-sizes";
import { PhoneInput } from "@/features/demand/ui/phone-input";
import { SubmitDemandButton } from "@/features/demand/ui/submit-demand-button";
import { submitDemand } from "@/features/demand/actions/submit-demand";

interface DemandFormProps {
    productId: string;
}

export function DemandForm({ productId }: DemandFormProps) {
    const [errors, setErrors] = useState<DemandFormErrors>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const customerNameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null);
    const measurementsRef = useRef<HTMLTextAreaElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const firstInvalid =
            (errors.customerName && customerNameRef.current) ||
            (errors.phone && phoneRef.current) ||
            (errors.size && sizeRef.current) ||
            (errors.measurements && measurementsRef.current) ||
            (errors.notes && notesRef.current) ||
            null;

        firstInvalid?.focus();
    }, [errors]);

    useEffect(() => {
        if (!successMessage) return;

        previouslyFocusedRef.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeButtonRef.current?.focus();

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault();
                setSuccessMessage(null);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocusedRef.current?.focus();
        };
    }, [successMessage]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setSuccessMessage(null);
        e.preventDefault();
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);

        const response = await submitDemand(formData);
        if (!response.success) {
            setErrors(response.errors);
        } else {
            setSuccessMessage(response.message);
            form.reset();
        }
    }

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
                Submit a Demand
            </h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <input type="hidden" name="productId" value={productId} />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="customerName" className="text-sm font-medium text-neutral-700">
                        Customer Name <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <input
                        ref={customerNameRef}
                        id="customerName"
                        name="customerName"
                        type="text"
                        required
                        maxLength={50}
                        placeholder="Enter your full name"
                        aria-invalid={errors.customerName ? true : undefined}
                        aria-describedby={errors.customerName ? "customerName-error" : undefined}
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                            errors.customerName ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.customerName && (
                        <p id="customerName-error" className="text-xs text-red-500">
                            {errors.customerName}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                        Phone Number <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        ref={phoneRef}
                        id="phone"
                        name="phone"
                        required
                        hasError={Boolean(errors.phone)}
                        describedBy={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                        <p id="phone-error" className="text-xs text-red-500">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <fieldset className="flex min-w-0 flex-col gap-2">
                    <legend className="p-0 text-sm font-medium text-neutral-700">
                        Size <span aria-hidden="true" className="text-red-500">*</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        {DEMAND_SIZES.map((size, index) => (
                            <label key={size} className="cursor-pointer">
                                <input
                                    ref={index === 0 ? sizeRef : undefined}
                                    type="radio"
                                    name="size"
                                    value={size}
                                    required
                                    aria-describedby={errors.size ? "size-error" : undefined}
                                    className="peer sr-only"
                                />
                                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-neutral-300 px-3 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-100 peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900 peer-focus-visible:ring-offset-2">
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.size && (
                        <p id="size-error" className="text-xs text-red-500">
                            {errors.size}
                        </p>
                    )}
                </fieldset>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="measurements" className="text-sm font-medium text-neutral-700">
                        Measurements / Customization Details
                    </label>
                    <textarea
                        ref={measurementsRef}
                        id="measurements"
                        name="measurements"
                        rows={3}
                        maxLength={100}
                        placeholder="Bust, waist, hips, length, fabric preferences…"
                        aria-invalid={errors.measurements ? true : undefined}
                        aria-describedby={errors.measurements ? "measurements-error" : undefined}
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
                            errors.measurements ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.measurements && (
                        <p id="measurements-error" className="text-xs text-red-500">
                            {errors.measurements}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-sm font-medium text-neutral-700">
                        Additional Notes
                    </label>
                    <textarea
                        ref={notesRef}
                        id="notes"
                        name="notes"
                        rows={2}
                        maxLength={100}
                        placeholder="Anything else we should know…"
                        aria-invalid={errors.notes ? true : undefined}
                        aria-describedby={errors.notes ? "notes-error" : undefined}
                        className={`rounded-md border px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
                            errors.notes ? "border-red-500" : "border-neutral-300"
                        }`}
                    />
                    {errors.notes && (
                        <p id="notes-error" className="text-xs text-red-500">
                            {errors.notes}
                        </p>
                    )}
                </div>

                <SubmitDemandButton />
            </form>

            {successMessage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 motion-safe:animate-fade-in"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSuccessMessage(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="demand-success-title"
                        aria-describedby="demand-success-message"
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                                closeButtonRef.current?.focus();
                            }
                        }}
                        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center flex flex-col items-center"
                    >
                        <div
                            aria-hidden="true"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                focusable="false"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h3 id="demand-success-title" className="text-lg font-semibold text-neutral-900 mb-2">
                            Success!
                        </h3>
                        <p id="demand-success-message" className="text-sm text-neutral-600 mb-6">
                            {successMessage}
                        </p>

                        <button
                            ref={closeButtonRef}
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
