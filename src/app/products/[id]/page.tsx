import Link from "next/link";
import { mockProducts } from "../mock-products";
import { notFound } from "next/navigation";
import { DemandForm } from "@/components/demand-form";

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
                <DemandForm productId={product.id} />
            </div>
        </main>
    );
}
