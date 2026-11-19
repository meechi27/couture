"use client";

interface PhoneInputProps {
    name?: string;
    id?: string;
    hasError?: boolean;
    required?: boolean;
    describedBy?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function PhoneInput({
    name = "phone",
    id = "phone",
    hasError = false,
    required = false,
    describedBy,
    ref,
}: PhoneInputProps) {
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        let val = input.value.replace(/\D/g, "");

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
            <span
                aria-hidden="true"
                className="inline-flex items-center px-3 text-sm font-medium text-neutral-600 border-r border-neutral-200 select-none"
            >
                +213
            </span>
            <input
                ref={ref}
                id={id}
                name={name}
                type="tel"
                required={required}
                maxLength={10}
                onInput={handleInput}
                placeholder="550 12 34 56"
                aria-invalid={hasError ? true : undefined}
                aria-describedby={describedBy}
                className="w-full px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
        </div>
    );
}
