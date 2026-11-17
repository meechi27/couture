/**
 * Builds a /products URL with encoded query values, so user input can never
 * inject extra parameters or break the query string.
 */
export function buildProductsHref(page: number, search: string): string {
    const params = new URLSearchParams({ page: String(page) });

    if (search) {
        params.set("search", search);
    }

    return `/products?${params.toString()}`;
}
