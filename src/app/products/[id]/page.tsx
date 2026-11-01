import { mockProducts } from "../mock-products";
import { notFound } from "next/navigation";

interface ProductDetailsProps{
    params : Promise<{id : string}>
}



export default async function ProductDetails({params} : ProductDetailsProps){

    const {id} = await params;
    const product = mockProducts.find((product)=>product.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="aspect-square bg-neutral-200 rounded-lg w-full" />
                
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                        {product.category}
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-semibold text-neutral-900">
                        ${product.price}
                    </p>
                </div>
            </div>
        </main>
    );
}
