export function buildProductsHref(page: number, search: string): string {
    const params = new URLSearchParams({ page: String(page) });

    if (search) {
        params.set("search", search);
    }

    return `/products?${params.toString()}`;
}
