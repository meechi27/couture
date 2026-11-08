"use client";

import { useFormStatus } from "react-dom";

export function SubmitDemandButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${
                pending
                    ? "cursor-not-allowed bg-neutral-400"
                    : "bg-neutral-900 hover:bg-neutral-800"
            }`}
        >
            {pending ? "Submitting Demand..." : "Submit Demand"}
        </button>
    );
}

