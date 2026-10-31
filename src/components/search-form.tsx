interface SearchFormProps {
  defaultValue?: string;
}

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <form
      action="/products"
      method="GET"
      className="flex justify-center items-center gap-3 mb-8"
    >
      <input type="hidden" name="page" value="1" />
      <input
        type="text"
        name="search"
        defaultValue={defaultValue}
        placeholder="Search products..."
        className="w-full max-w-sm px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800"
      >
        Search
      </button>
    </form>
  );
}

