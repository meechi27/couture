
import Link from "next/link";
import { mockProducts } from "./mock-products";
import { filterProducts } from "../lib/products/filter-products";
import { paginateProducts } from "../lib/products/paginate-products";
import { SearchForm } from "@/components/search-form";





interface ProductsPageProps {
  searchParams: Promise<{
    search?: string | string[];
    page?: string | string[];
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    
  const resolvedParams = await searchParams;
    // if we encounter multiple search we take the first 
  const rawSearch = Array.isArray(resolvedParams.search)
    ? resolvedParams.search[0]
    : resolvedParams.search;
    // SAFE SEARCH :if search in undefined we take ""
  const search = rawSearch ? rawSearch.trim().slice(0, 30) : "";


    // if we encounter multiple search we take the first 
  const pageParam = Array.isArray(resolvedParams.page)
    ? resolvedParams.page[0]
    : resolvedParams.page;
    
    // turn into a number
  const rawPage = Number(pageParam);

    // SAFE PAGE : if it is satifiable we take it otherwise default 1
  const isValidPage =
    Number.isFinite(rawPage) && Number.isInteger(rawPage) && rawPage > 0;
  const page = isValidPage ? rawPage : 1;

    // FILTER PRODUCTS : based on search title
  const searchedProducts = filterProducts(mockProducts,search);
  const paginatedProducts = paginateProducts(searchedProducts, page);

    // navigation btn activation conditions
    // we check next page if it has any elements
    const hasNext  = paginateProducts(searchedProducts,page + 1).length > 0;
    // we check if we are on page 1 (it has not previous page)
    const hasPrev = page > 1;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Products</h1>

      <SearchForm defaultValue={search} />

      {/* if not products match show empty state otherwise the products */}
      {paginatedProducts.length === 0 ? (
        <section className="text-center py-16">
          <h2 className="text-xl font-semibold text-neutral-900">No products found</h2>
          <p className="mt-2 text-neutral-500">Try a different search term.</p>
        </section>
      ) : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                className="border rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-neutral-200 rounded-md mb-4" />
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-sm text-neutral-500">{product.category}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-medium text-neutral-900">${product.price}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <nav className="flex justify-center items-center gap-4 mt-10">
        {hasPrev ? (
          <a
            href={`/products?page=${page - 1}${search ? `&search=${search}` : ""}`}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-neutral-100"
          >
            ← Previous
          </a>
        ) : (
          <span className="px-4 py-2 border rounded-md text-sm font-medium text-neutral-300 cursor-not-allowed">
            ← Previous
          </span>
        )}

        <span className="text-sm text-neutral-600">Page {page}</span>

        {hasNext ? (
          <a
            href={`/products?page=${page + 1}${search ? `&search=${search}` : ""}`}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-neutral-100"
          >
            Next →
          </a>
        ) : (
          <span className="px-4 py-2 border rounded-md text-sm font-medium text-neutral-300 cursor-not-allowed">
            Next →
          </span>
        )}
      </nav>
        </>
      )}
    </main>
  );
}
