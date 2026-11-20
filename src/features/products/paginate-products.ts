import type { Product } from "@/features/products/product.types";

const limit = 8

export function paginateProducts(products:Product[],page:number):Product[]{
    const offset = (page - 1) * limit;
    

    return products.slice(offset ,offset + limit );
}