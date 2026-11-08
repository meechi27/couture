"use client";

interface PhoneInputProps {
    name?: string;
    id?: string;
    hasError?: boolean;
}

export function PhoneInput({ name = "phone", id = "phone", hasError = false }: PhoneInputProps) {
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        // Strip non-digits
        let val = input.value.replace(/\D/g, "");

        // If it starts with 0: allow up to 10 digits; otherwise allow up to 9 digits
        if (val.length > 0) {
            const max = val[0] === "0" ? 10 : 9;
            if (val.length > max) {
                val = val.slice(0, max);
            }
        }

        input.value = val;
    };

    return (
        <div
            className={`flex items-center w-full max-w-xs rounded-md border bg-white focus-within:ring-2 focus-within:ring-neutral-900 focus-within:border-transparent ${
                hasError ? "border-red-500" : "border-neutral-300"
            }`}
        >
            <span className="inline-flex items-center px-3 text-sm font-medium text-neutral-600 border-r border-neutral-200 select-none">
                +213
            </span>
            <input
                id={id}
                name={name}
                type="tel"
                maxLength={10}
                onInput={handleInput}
                placeholder="550 12 34 56"
                className="w-full px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
        </div>
    );
}
