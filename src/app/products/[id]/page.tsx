import Link from "next/link";
import { mockProducts } from "../mock-products";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
    const { id } = await params;
    const product = mockProducts.find((product) => product.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-6 flex justify-end">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Products
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Product Details */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="aspect-square bg-neutral-200 rounded-lg w-full mb-6" />

                    <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                            {product.name}
                        </h1>
                        <span className="text-sm font-medium uppercase tracking-wider text-neutral-500 shrink-0">
                            {product.category}
                        </span>
                    </div>

                    <p className="text-2xl font-semibold text-neutral-900">
                        ${product.price}
                    </p>
                </div>

                {/* Customer Demand Form */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
                        Submit a Demand
                    </h2>

                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="customerName" className="text-sm font-medium text-neutral-700">
                                Customer Name
                            </label>
                            <input
                                id="customerName"
                                name="customerName"
                                type="text"
                                placeholder="Enter your full name"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="e.g. +212 600 000 000"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="size" className="text-sm font-medium text-neutral-700">
                                Size
                            </label>
                            <input
                                id="size"
                                name="size"
                                type="text"
                                placeholder="e.g. S, M, L, XL or custom"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="measurements" className="text-sm font-medium text-neutral-700">
                                Measurements / Customization Details
                            </label>
                            <textarea
                                id="measurements"
                                name="measurements"
                                rows={3}
                                placeholder="Bust, waist, hips, length, fabric preferences…"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="notes" className="text-sm font-medium text-neutral-700">
                                Additional Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={2}
                                placeholder="Anything else we should know…"
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                        >
                            Submit Demand
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
