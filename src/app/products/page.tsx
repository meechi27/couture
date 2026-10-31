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

  return (
    <div>
      <p>Search: {search}</p>
      <p>Page: {page}</p>
    </div>
  );
}
