import { Product } from "@/app/products/mock-products";



export function paginateProducts(products:Product[],page:number):Product[]{
    // page starting index
    const offset = (page - 1) * 12;
    
    return products.slice(offset ,offset + 12);
}