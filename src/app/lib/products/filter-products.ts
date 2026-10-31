import { Product } from "@/app/products/mock-products";



export function filterProducts(mockProducts : Product[],search : string):Product[]{
    
    return mockProducts.filter((product)=>product.name.toLowerCase().trim().includes(search.toLowerCase().trim()));
}