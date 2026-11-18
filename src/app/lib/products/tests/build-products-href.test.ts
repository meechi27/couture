import { describe, expect, it } from "vitest";
import { buildProductsHref } from "../build-products-href";

function queryOf(href: string): URLSearchParams {
  return new URLSearchParams(href.slice(href.indexOf("?") + 1));
}

describe("buildProductsHref", () => {
  it("omits the search parameter when the search is empty", () => {
    expect(buildProductsHref(1, "")).toBe("/products?page=1");
    expect(queryOf(buildProductsHref(1, "")).has("search")).toBe(false);
  });

  it("includes the page and the search when both are present", () => {
    const href = buildProductsHref(2, "boots");
    const params = queryOf(href);

    expect(href.startsWith("/products?")).toBe(true);
    expect(params.get("page")).toBe("2");
    expect(params.get("search")).toBe("boots");
  });

  it("encodes characters that would otherwise break the query string", () => {
    const href = buildProductsHref(2, "shirt & coat");

    expect(queryOf(href).get("search")).toBe("shirt & coat");
  });

  it("keeps a search containing a hash inside the query value", () => {
    const href = buildProductsHref(2, "coat #1");

    expect(href).not.toContain("#");
    expect(queryOf(href).get("search")).toBe("coat #1");
  });

  it("preserves plus signs instead of turning them into spaces", () => {
    expect(queryOf(buildProductsHref(2, "a+b")).get("search")).toBe("a+b");
  });

  it("does not allow a crafted search to inject extra parameters", () => {
    const href = buildProductsHref(2, "x&page=9");
    const params = queryOf(href);

    expect([...params.keys()]).toEqual(["page", "search"]);
    expect(params.get("page")).toBe("2");
    expect(params.get("search")).toBe("x&page=9");
  });
});
