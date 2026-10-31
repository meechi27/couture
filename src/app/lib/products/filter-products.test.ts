import { describe, expect, it } from "vitest";
import { filterProducts } from "./filter-products";

const products = [
  { id: "1", name: "Gold Kaftan", category: "Kaftan", price: 150 },
  { id: "2", name: "Blue Kaftan", category: "Kaftan", price: 140 },
  { id: "3", name: "Embroidered Dress", category: "Dresses", price: 200 },
];

describe("filterProducts", () => {
  it("returns products whose names match the search", () => {
    const result = filterProducts(products, "gold");

    expect(
      result.every((product) =>
        product.name.toLowerCase().includes("gold"),
      ),
    ).toBe(true);

    expect(result.length).toBeGreaterThan(0);
  });

  it("returns all matching products when multiple products match", () => {
    const result = filterProducts(products, "kaftan");

    expect(
      result.every((product) =>
        product.name.toLowerCase().includes("kaftan"),
      ),
    ).toBe(true);

    expect(result.length).toBeGreaterThan(1);
  });

  it("returns an empty array when no products match", () => {
    const result = filterProducts(products, "xyz");

    expect(result).toEqual([]);
  });

  it("returns all products when the search is empty", () => {
    const result = filterProducts(products, "");

    expect(result).toEqual(products);
  });

  it("matches product names without case sensitivity", () => {
    const lowercaseResult = filterProducts(products, "gold");
    const uppercaseResult = filterProducts(products, "GOLD");

    expect(uppercaseResult).toEqual(lowercaseResult);
  });

  it("ignores whitespace around the search", () => {
    const result = filterProducts(products, " gold ");
    const normalResult = filterProducts(products, "gold");

    expect(result).toEqual(normalResult);
  });
});
