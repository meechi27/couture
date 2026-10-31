import { Product } from "@/app/products/mock-products";

const limit = 8

export function paginateProducts(products:Product[],page:number):Product[]{
    // page starting index
    const offset = (page - 1) * limit;
    

    return products.slice(offset ,offset + limit);
}