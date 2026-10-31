import { describe, expect, it } from "vitest";
import { paginateProducts } from "./paginate-products";
import { mockProducts } from "@/app/products/mock-products";

describe("paginateProducts", () => {
  it("returns the first 12 products on page 1", () => {
    const result = paginateProducts(mockProducts, 1);

    expect(result).toHaveLength(12);
    expect(result[0].id).toBe("1");
    expect(result[11].id).toBe("12");
  });

  it("returns products 13 to 24 on page 2", () => {
    const result = paginateProducts(mockProducts, 2);

    expect(result).toHaveLength(12);
    expect(result[0].id).toBe("13");
    expect(result[11].id).toBe("24");
  });

  it("returns the remaining products on the last page", () => {
    // 100 products with 12 per page: pages 1-8 have 12 (96 total), page 9 has remaining 4
    const result = paginateProducts(mockProducts, 9);

    expect(result).toHaveLength(4);
    expect(result[0].id).toBe("97");
    expect(result[3].id).toBe("100");
  });

  it("returns an empty array when the page has no products", () => {
    // Beyond the last page (page 10 has no items)
    const result = paginateProducts(mockProducts, 10);

    expect(result).toEqual([]);
  });

  it("returns all products when there are fewer than 12", () => {
    const fewProducts = mockProducts.slice(0, 5);

    const result = paginateProducts(fewProducts, 1);

    expect(result).toHaveLength(5);
    expect(result).toEqual(fewProducts);
  });

  it("returns an empty array when the product list is empty", () => {
    const result = paginateProducts([], 1);

    expect(result).toEqual([]);
  });
});
