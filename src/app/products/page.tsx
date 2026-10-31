
import { mockProducts } from "./mock-products";
import { filterProducts } from "../lib/products/filter-products";
import { paginateProducts } from "../lib/products/paginate-products";





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

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Products</h1>

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
            <p className="mt-4 font-medium text-neutral-900">${product.price}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
