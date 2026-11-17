# `couture` — Project Inspection Report

Generated: 2026-11-15 · Repository root: `couture/` · Branch: `main` (clean tree, 26 commits, remote `origin`)

---

## 1. What this project is

A **Next.js 16 App Router** e-commerce prototype for a clothing / tailoring shop ("couture"). It currently ships:

1. A product catalog read from an in-memory mock array (100 items).
2. Server-side search + pagination driven by URL query parameters.
3. A product detail page.
4. A **"customer demand" (order request) form** per product, validated with Zod inside a **Server Action**.

There is **no database, no ORM, no API routes, no auth and no persistence** — see [§5](#5-database--persistence).

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | `16.4.6` |
| UI runtime | React / React DOM | `19.3.0` |
| Language | TypeScript (strict) | `5.9.3` |
| Styling | Tailwind CSS v4 + `@tailwindcss/turbopack` | `4.3.3` |
| Validation | Zod | `4.6.7` |
| Tests | Vitest | `5.0.5` |
| Lint | ESLint 9 (flat) + `eslint-config-next` | `9.39.5` / `16.4.3` |

> `AGENTS.md` carries an auto-generated block from `next dev` warning that this Next.js major has breaking changes vs. older knowledge and that the local docs in `node_modules/next/dist/docs/` are the source of truth. This report was cross-checked against those local docs (`cacheComponents`, `partialPrefetching`, `LayoutProps`, `global-error`).

---

## 2. Structure

```
couture/
├── .freebuff/                     # Freebuff Desktop metadata (project-id; excluded via its own .gitignore)
├── .git/, .gitignore, .gitattributes
├── .next/                         # build output (gitignored)
├── node_modules/                  # 306 entries
├── public/                        # default create-next-app SVGs (file, globe, next, vercel, window)
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── demand.ts                     # "use server" — submitDemand()
│   │   ├── lib/
│   │   │   ├── products/
│   │   │   │   ├── filter-products.ts        # pure search helper
│   │   │   │   ├── filter-products.test.ts   # 6 tests
│   │   │   │   ├── paginate-products.ts      # pure pagination helper (PAGE_SIZE = 8)
│   │   │   │   ├── paginate-products.test.ts # 6 tests
│   │   │   │   ├── build-products-href.ts    # encodes ?page & ?search into a URL
│   │   │   │   └── build-products-href.test.ts # 6 tests (incl. injection cases)
│   │   │   └── validations/
│   │   │       └── demand-schema.ts          # Zod schema + DEMAND_SIZES + DemandInput type
│   │   ├── products/
│   │   │   ├── mock-products.ts              # Product interface + 100 hardcoded products
│   │   │   ├── page.tsx                      # /products (server component: search + pagination)
│   │   │   └── [id]/page.tsx                 # /products/[id] (detail + demand form)
│   │   ├── favicon.ico
│   │   ├── globals.css                       # Tailwind import + theme tokens
│   │   ├── layout.tsx                        # root layout (Geist fonts, metadata)
│   │   └── page.tsx                          # "/" — empty placeholder
│   └── components/
│       ├── demand-form.tsx                   # client form orchestrator (state, errors, modal)
│       ├── phone-input.tsx                   # client masked phone field (+213 prefix)
│       ├── search-form.tsx                   # server-rendered GET form
│       └── submit-demand-button.tsx          # client submit button using useFormStatus()
├── AGENTS.md                      # auto-generated Next.js agent rules
├── README.md                      # default create-next-app README (not project-specific)
├── eslint.config.mjs              # flat config: next core-web-vitals + typescript
├── next.config.ts                 # cacheComponents, partialPrefetching, Turbopack CSS loader
├── next-env.d.ts
├── package.json / package-lock.json
├── tsconfig.json                  # strict, path alias "@/*" -> "./src/*"
├── tsconfig.tsbuildinfo           # incremental TS cache (gitignored)
└── vitest.config.ts               # defines "@" alias only (no jsdom env)
```

**Layering convention:** route folders (`src/app/**/page.tsx`) → presentational/client components (`src/components`) → framework-agnostic helpers (`src/app/lib`). There is no `services/`, `db/`, `api/`, `hooks/` or `types/` layer yet.

---

## 3. `package.json` and installed dependencies

```json
{
  "name": "couture",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest"
  },
  "dependencies": {
    "next": "16.4.6",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^26.6.6",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.3",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^5.0.5"
  }
}
```

### Resolved top-level tree (`npm ls --depth=0`)

| Package | Installed | Role |
|---|---|---|
| `next` | 16.4.6 | Framework, App Router, Server Actions, Turbopack build (security patch from 16.4.3) |
| `react` | 19.3.0 | UI runtime (deduped, single copy) |
| `react-dom` | 19.3.0 | DOM renderer + `useFormStatus` |
| `zod` | 4.6.7 | Schema validation for the demand form |
| `tailwindcss` | 4.3.3 | Utility CSS (v4, CSS-first config) |
| `@tailwindcss/turbopack` | 4.3.3 | Tailwind loader wired in `next.config.ts` |
| `typescript` | 5.9.3 | Type checking |
| `@types/node` | 26.6.6 | Node typings |
| `@types/react` / `@types/react-dom` | 19.3.0 | React typings |
| `eslint` | 9.39.5 | Linter |
| `eslint-config-next` | 16.4.3 | Next rules (core-web-vitals + TS) |
| `vitest` | 5.0.5 | Unit test runner |

Notes:
- **No database driver, ORM, auth, form, state, icon, or UI-component library is installed.** Everything visual is hand-written Tailwind.
- `npm ls` reports a handful of `extraneous` WASM helper packages (`@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, `@img/sharp-wasm32`). These are leftovers from optional/native resolution (image pipeline), not declared dependencies — harmless, but a `npm prune`/fresh install would clean them.
- `node_modules` contains 306 top-level entries, all transitively pinned by `package-lock.json`.
- No `.env*` file exists; the app needs no secrets or external services.

### Configuration highlights

| File | Setting | Effect |
|---|---|---|
| `next.config.ts` | `cacheComponents: true` | Enables Next 16 Cache Components (`use cache`, static shells). App doesn't use `use cache` yet. |
| | `experimental.agentUpgrade: "security"` | Pins the `next upgrade --agent` policy used for reminders and future agent upgrades. |
| | `partialPrefetching: true` | `<Link>` prefetches one shared "App Shell" per route instead of per-link payloads. |
| | `turbopack.rules["*.css"]` | Routes CSS through `@tailwindcss/turbopack`. |
| `tsconfig.json` | `strict: true`, `paths: { "@/*": ["./src/*"] }` | Strict TS + `@/` alias used everywhere. |
| `vitest.config.ts` | only `resolve.alias` | No `environment: "jsdom"`, so component/DOM tests aren't possible as configured. |
| `eslint.config.mjs` | `defineConfig([...nextVitals, ...nextTs, globalIgnores([...])])` | Standard Next flat config. |

---

## 4. Functionality inventory

### 4.1 App shell — `src/app/layout.tsx`

- Loads **Geist** and **Geist Mono** via `next/font/google`, exposed as `--font-geist-sans` / `--font-geist-mono`.
- `<html>` gets `h-full antialiased`; `<body>` is `min-h-full flex flex-col`.
- Uses the globally generated **`LayoutProps<"/">`** type (Next 16 typed routes) instead of a hand-written `{ children }` type.
- Global `<Metadata>` is still `"Create Next App"` / `"Generated by create next app"` — placeholder.

`src/app/globals.css`: `@import "tailwindcss";` plus `--background` / `--foreground` tokens (light `#fff/#171717`, dark `#0a0a0a/#ededed` via `prefers-color-scheme`), an `@theme inline` mapping for `color-background`, `color-foreground`, `font-sans`, `font-mono`, and a `body` rule that sets background/foreground but falls back to `Arial, Helvetica, sans-serif` for the font family (overriding the Geist tokens for plain text).

### 4.2 Home route `/` — `src/app/page.tsx`

An intentionally empty centered `<div className="flex min-h-screen items-center justify-center">`. It is a placeholder landing page; no navigation to the catalog exists from here.

### 4.3 Catalog `/products` — `src/app/products/page.tsx`

Async **Server Component** that receives `searchParams` as a `Promise` (Next 16 convention) and:

1. **Awaits** `searchParams` and de-duplicates array values (takes the first).
2. **Sanitizes search**: `trim()` and hard-caps to **30 characters**; `undefined` → `""`.
3. **Parses the page number**: accepts only finite positive integers, otherwise falls back to `1` (rejects `0`, negatives, `NaN`, `1.5`, arrays).
4. **Filters** the 100 mock products by name (`filterProducts`).
5. **Paginates** the filtered list, **8 per page** (`paginateProducts`).
6. Computes `hasNext` by probing page `page + 1` and `hasPrev` from `page > 1`.
7. Renders a responsive grid (`grid-cols-2 / md:3 / lg:4`) of cards (placeholder square, name, category, price, "View Details" link) or an empty state ("No products found / Try a different search term.").
8. Renders Previous/Next controls as `next/link` `<Link>` elements whose href comes from `buildProductsHref(page, search)` — encoded, with `search` omitted when empty.
9. Bolds the page number (`Page {page}`).

**Edge behavior:** an out-of-range page (e.g. `?page=99`) is *valid* and renders the empty state rather than a 404; a search matching nothing renders the same empty state with pagination hidden (inside the `else` branch).

### 4.4 Search — `src/components/search-form.tsx`

- A **server-rendered** `<form action="/products" method="GET">` — no JavaScript required.
- Hidden `page=1` input resets pagination on every search.
- Text input `name="search"` is populated with `defaultValue` from the URL (uncontrolled).
- Submitting performs a full navigation with `?page=1&search=…`.

### 4.5 Pagination helpers — `src/app/lib/products/`

| Function | Signature | Behavior |
|---|---|---|
| `filterProducts` | `(products: Product[], search: string) => Product[]` | Case-insensitive `includes` on `product.name` only, trimming both sides. Does **not** search `category`. |
| `paginateProducts` | `(products: Product[], page: number) => Product[]` | `offset = (page - 1) * limit`, then `slice(offset, offset + limit)`. Module-level `const limit = 8`. |
| `buildProductsHref` | `(page: number, search: string) => string` | Builds `/products?page=…&search=…` with `URLSearchParams`, so the search value is percent-encoded and cannot inject extra query params; `search` is omitted when empty. |

Both are pure functions, which is why they're the only unit-tested code. The helpers import the `Product` type from the mock-data module, so data and types are coupled.

### 4.6 Product detail `/products/[id]` — `src/app/products/[id]/page.tsx`

- Async Server Component; `params` is a `Promise<{ id: string }>` and is awaited.
- Looks the product up with `mockProducts.find(p => p.id === id)`; if absent calls `notFound()` (renders the built-in Next 404 — there is **no custom `not-found.tsx`**).
- Layout: a "Back to Products" link with an inline SVG arrow, then a two-column grid (`lg:grid-cols-2`) with:
  - **Left:** product card — placeholder image block, name, uppercased category, price (`$` prefix).
  - **Right:** `<DemandForm productId={product.id} />`.

### 4.7 Customer demand flow (the core feature)

```
DemandForm (client)                    submitDemand (server action)
──────────────────                     ───────────────────────────
onSubmit → preventDefault
         → new FormData(form)   ──────▶  read 6 fields
         → await submitDemand()         demandSchema.safeParse()
         ◀────────────────────────────  { success: true, message }
         success: modal + form.reset()  or { success: false, errors }
         failure: per-field messages
```

**`src/components/demand-form.tsx`** — `"use client"`

- Holds two pieces of state: `errors: DemandFormErrors` and `successMessage: string | null`.
- `handleSubmit` clears both, prevents the default submission, builds a `FormData`, calls the server action, then either:
  - writes `response.errors` into state (field-level messages under each input), or
  - shows a **success modal** and calls `form.reset()` (clearing all fields, including the radio selection).
- Form is `noValidate` — **browser validation is deliberately disabled**; the server action is the single source of truth (this is the theme of recent commits: "server action only source of validation").
- Fields: hidden `productId`; `customerName` (text, `maxLength={50}`); `phone` (`PhoneInput`); `size` (7 radio chips `XS…XXXL`, styled with `peer-checked`); `measurements` (textarea, `maxLength={100}`, 3 rows); `notes` (textarea, `maxLength={100}`, 2 rows).
- Error UI: red border + `<p className="text-xs text-red-500">` per field; an extra `errors.form` slot renders a banner (currently never populated by the action).
- Success modal: fixed full-screen overlay (`bg-black/50`) with `motion-safe:animate-fade-in` (keyframes defined in `globals.css` via a Tailwind v4 `--animate-fade-in` theme token, so it is skipped under `prefers-reduced-motion`), white card, decorative check icon, message, and a **Close** button.
- Modal accessibility: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby`, focus moved to Close on open and restored to the trigger on close, Escape closes it, backdrop click closes it, Tab is trapped on the single focusable control, and page scroll is locked while open.
- Field accessibility: inputs get `required`, `aria-invalid` and `aria-describedby` pointing at their error paragraph; on a failed submit focus moves to the first invalid field; the size chips are a `<fieldset>`/`<legend>` radio group with visible `peer-focus-visible` rings; decorative `*` markers are `aria-hidden`.
- `DemandFormErrors` (exported interface) is imported by the server action file for its return type.

**`src/app/actions/demand.ts`** — `"use server"`

- `submitDemand(formData: FormData): Promise<DemandActionResult>` where
  `DemandActionResult = { success: true; message } | { success: false; errors: DemandFormErrors }`.
- Extracts exactly six keys with `formData.get(...)`, runs `demandSchema.safeParse`, and on failure maps `error.flatten().fieldErrors[X]?.[0]` into the error object (only the **first** message per field is returned). On success it returns the fixed message `"Your demand information passed validation."`.
- **It stores nothing** — no DB write, no email, no queue, no logging.

**`src/app/lib/validations/demand-schema.ts`** — Zod 4

| Field | Rules |
|---|---|
| `productId` | string, trimmed, min 1 ("Product ID cannot be empty.") |
| `customerName` | string, trimmed, 2–50 chars |
| `phone` | string, trimmed → **transform strips all non-digits** (note: `trim()` runs before `.transform()`), then must match `^(0[0-9]{9}\|[1-9][0-9]{8})$` → 10 digits starting with `0`, or 9 digits starting with 1–9 (Algerian numbering) |
| `size` | enum of `DEMAND_SIZES` = `XS, S, M, L, XL, XXL, XXXL` |
| `measurements` | optional string, trimmed, **max 100** chars, or `""` |
| `notes` | optional string, trimmed, **max 100** chars, or `""` |
| exports | `DEMAND_SIZES`, `demandSchema`, `type DemandInput` (the inferred type is currently unused) |

**`src/components/phone-input.tsx`** — `"use client"`

- Visual `+213` prefix (static text, **not** part of the submitted value) + `<input type="tel">`.
- `onInput` strips every non-digit and clamps length: **10 digits if it starts with `0`, otherwise 9** — mirroring the schema, but enforced while typing.
- Accepts `name`, `id`, `hasError` props; `hasError` swaps the border to red.

**`src/components/submit-demand-button.tsx`** — `"use client"`

- Uses `useFormStatus()` from `react-dom` to disable itself and swap the label to "Submitting Demand…" while the action is pending. Note: for `useFormStatus` to fire, the button must be inside the `<form>` — it is, but the form uses `onSubmit` rather than an `action` prop, so pending state only appears if the action is invoked inside a transition; with a plain `await` in `onSubmit`, `pending` may never flip (see findings).

### 4.8 Mock catalog data — `src/app/products/mock-products.ts`

- `export interface Product { id: string; name: string; category: string; price: number }`.
- `mockProducts: Product[]` — **100 deterministic records**, ids `"1"…"100"`.
- Names cycle through 10 garment types (Shirt, Trousers, Jacket, Coat, Dress, Scarf, Boots, Sneakers, Watch, Bag) × 10 prefixes (Classic, Tailored, Modern, Vintage, Minimalist, Silk, Wool, Linen, Leather, Cashmere).
- Categories cycle `Clothing → Footwear → Accessories → Jewelry → Outerwear` (so category does not match the garment type — e.g. "Classic Boots" is `Clothing`).
- Prices walk `48 → 394` in +17 steps and wrap.
- No images, descriptions, sizes, colors, or stock.

### 4.9 Tests

| File | Environment | Covers |
|---|---|---|
| `filter-products.test.ts` | Vitest, node | match, multi-match, no-match, empty search, case-insensitivity, whitespace trimming |
| `paginate-products.test.ts` | Vitest, node | page 1 / page 2 slices, last partial page, out-of-range page, fewer items than a page, empty input |
| `build-products-href.test.ts` | Vitest, node | empty search omitted, page+search together, encoding of `&`/`#`/`+`, and a crafted `x&page=9` search cannot add parameters |

`vitest.config.ts` only maps `@` → `./src`; there is no `jsdom`/`happy-dom`, so React components and Server Actions are **untested**.

`paginate-products.test.ts` was originally written for **12 items per page** while the implementation uses **8**. The tests were updated to match the 8-per-page rule (pages of 8, last page `13` → ids `97–100`, page `14` → empty). Current result of `npx vitest run`:

```
Test Files  3 passed (3)
     Tests  18 passed (18)
```

### 4.10 Tooling & workflow

| Command | What it does | Current status |
|---|---|---|
| `npm run dev` | `next dev` (Turbopack) | Starts, prints `Cache Components enabled` / `Partial Prefetching enabled` |
| `npm run build` | Production build | **Fails** — see findings |
| `npm run start` | Serve a production build | Requires a successful build |
| `npm run lint` | `eslint` (whole repo) | 0 errors, 0 warnings |
| `npm run test` | `vitest` (watch mode) | 18/18 passing |

Git history (26 commits) shows the build-up: project init → mock data + URL search/pagination → pure helpers + tests → detail page + back link → demand form (client) → Zod schema → form hardening + error UI → FormData → server action → *server-action-only validation* → success modal/reset.

---

## 5. Database / persistence

### Verdict: **there is no database implementation of any kind.**

Evidence gathered:

| Check | Result |
|---|---|
| `package.json` dependencies | no `prisma`, `drizzle-orm`, `kysely`, `typeorm`, `sequelize`, `mongoose`, `better-sqlite3`, `pg`, `mysql2`, `redis`, `@vercel/postgres`, `supabase`, … |
| Source imports | no driver/ORM import anywhere in `src/` |
| Schema / migration files | none (`prisma/`, `drizzle/`, `migrations/`, `*.sql` all absent) |
| Route handlers | no `app/api/**/route.ts`, no `actions/*` other than `submitDemand` |
| Storage/data dir | no `data/`, `db/`, `*.db`, `*.sqlite`, JSON store |
| Environment | no `.env*` file, no connection-string usage |
| Persistence call in the action | none — `submitDemand` returns a message and discards the data |

**All data is ephemeral and hardcoded:**

| Data | Where it actually lives | Lifetime |
|---|---|---|
| Products (100) | `src/app/products/mock-products.ts` (in-memory array, bundled into the server) | Static; survives only because it's source code |
| Search / page state | URL query string (`?search=&page=`) | Browser history / shareable URL |
| Customer name, phone, size, measurements, notes | `FormData` → Zod parse → **thrown away** | Lives only for the duration of one request; the UI then resets the form |
| Validation rules | `src/app/lib/validations/demand-schema.ts` | Source code |

So the "Submit a Demand" feature is **validation-only**: a user gets a green success modal, but the order is never stored, emailed, queued, or listed anywhere. Reloading the page loses everything; there is no admin/inbox view to read demands from.

### Where a database would plug in

1. **Write path** — `src/app/actions/demand.ts`, after `result.success`, replace the `return { success: true, … }` with an insert. The action already returns a discriminated union, so failure handling can stay field-shaped (`errors.form` is already reserved for a form-level message such as "Could not save your demand").
2. **Read path** — `src/app/products/page.tsx` and `[id]/page.tsx` currently read `mockProducts` directly; a repository function (e.g. `getProducts({ search, page })`, `getProductById(id)`) would slot in without touching the components.
3. **Server-side pagination** — `paginateProducts` currently slices in memory; with a DB it becomes `LIMIT/OFFSET` (and `hasNext` becomes a count query).
4. **Validation** — `demandSchema` is already the contract; a DB schema would mirror it (`customer_name varchar(50)`, `phone varchar(10)`, `size enum`, `measurements varchar(100)`, `notes varchar(100)`, `product_id` FK).
5. **Product existence check** — the action validates `productId` as a non-empty string but never verifies the product exists (`mockProducts` is not consulted), so any arbitrary id passes.

---

## 6. Findings (verified)

### 6.1 `npm run build` currently fails

```
✓ Compiled successfully in 5.1s
✓ Finished TypeScript in 4.4s
Error occurred prerendering page "/_global-error".
TypeError: Cannot read properties of null (reading 'useContext')
digest: '3253688162'
⨯ Next.js build worker exited with code: 1
```

Reproduced on a clean, unmodified tree at **16.4.3 and again at 16.4.6** after the security upgrade (same digest). It is Next's auto-generated `_global-error` page (not app code) that fails to prerender, so `npm start`/deploy is blocked even though dev mode boots and serves `/products?page=2&search=boots` and `/products/5` with HTTP 200.

Ruled out during the upgrade: duplicate React copies (single deduped 19.3.0), `cacheComponents`/`partialPrefetching` (fails with both disabled), the custom Turbopack CSS rule, `next/font/google`, and `experimental.agentUpgrade`. The patch upgrade did **not** fix it, so it is not a version-specific bug fixed upstream yet. Next steps: add an explicit `src/app/global-error.tsx` client component and, if that does not help, look for an upstream `_global-error` prerender bug on this Next/React pair (or a Windows-only prerender issue).

### 6.2 Pagination test / implementation drift (resolved)

`paginate-products.ts` uses `limit = 8`; `paginate-products.test.ts` asserted 12 per page (ids `1–12`, `13–24`, `97–100` on page 9, empty on page 10). The suite now matches the implementation: 8 per page, 13 pages total, page 13 holds ids `97–100`, page 14 is empty. All 12 tests pass. Recommendation: export the page size as a constant (e.g. `export const PAGE_SIZE = 8`) so tests and UI copy can reference the same value instead of hardcoding it.

### 6.3 UI limits now match the schema (resolved)

| Field | Schema | UI |
|---|---|---|
| `customerName` | max **50** | `maxLength={50}` |
| `measurements` | max **100** | `maxLength={100}` |
| `notes` | max **100** | `maxLength={100}` |

All three fields now cap typing/pasting at the server limit, so the Zod "cannot exceed N characters" messages are no longer reachable through normal input. The server action remains the source of truth (HTML limits can be bypassed by crafted requests). The name cap was raised from 20 to 50 (schema message and input attribute together) so real full names such as "Abdelkader Benmohamed" fit.

### 6.4 `useFormStatus` cannot work with the current submit pattern

`SubmitDemandButton` relies on `useFormStatus().pending`, but `DemandForm` submits via `onSubmit` + `await submitDemand(formData)` — no `<form action={…}>`, no `startTransition`. The pending flag is tied to form actions/transitions, so the "Submitting Demand…" state will not reliably appear. (Also, `action={submitDemand}` would be impossible as-is because the action returns a value the form doesn't consume.)

### 6.5 No progressive enhancement

The form is client-only (`onSubmit`), `noValidate`, with no `action` prop. With JavaScript disabled, the form posts nowhere and errors cannot be shown.

### 6.6 Search links (resolved)

- Pagination hrefs are built by `buildProductsHref` with `URLSearchParams`, so `&`, `#`, `%`, `+` and spaces stay inside the `search` value and cannot inject parameters (covered by tests).
- Pagination uses `next/link`, so page changes are client navigations with prefetching (`partialPrefetching` in `next.config.ts` is exercised).

### 6.7 Phone handling is inconsistent

- The `+213` prefix is decorative text, not submitted; the stored value is the **local** number (leading `0`, 10 digits) or a 9-digit local number. There is no normalization to E.164, and both accepted shapes coexist for the same number.
- The input has `maxLength={10}` while the validator accepts 9-digit numbers that don't start with `0`; the JS clamp handles it, but the HTML attribute is only correct for one of the two shapes.
- Server-side transform strips digits, so `"55 012 34 56"` and `"550123456"` converge — good — but `+213550123456` becomes `213550123456` and is **rejected** (12 digits), even though it is the number's real international form.

### 6.8 Minor / cosmetic

- `src/app/lib/validations/demand-schema.ts` exports `DemandInput`, never imported.
- `src/app/actions/demand.ts` imports `DemandFormErrors` from a `"use client"` module. It's type-only so it compiles, but types shared by client and server belong in a neutral file (`lib/types.ts`).
- The error slot `errors.form` is rendered but the action never sets it (no message for infrastructure failures).
- `src/app/page.tsx` is an empty screen; there is no nav to `/products` anywhere except direct URL.
- `metadata` still says "Create Next App"; `README.md` is the untouched create-next-app boilerplate.
- No `loading.tsx`, `error.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`.
- `notFound()` on the detail page renders the framework default 404 with no route back to the catalog.
- `filterProducts` matches on `name` only — searching "Boots" works, searching "Footwear" does not.
- The over-fetch pattern `paginateProducts(searchedProducts, page + 1).length > 0` is fine at 100 items but would be wasteful against a DB.
- Simulated product imagery is an `aspect-square bg-neutral-200` div; no images, no `next/image` usage (so `sharp`/`@img/*` packages are only transitive Next internals).

---

## 7. How to run / verify

```bash
npm install          # deps already present
npm run dev          # http://localhost:3000  → /products, /products/1 … /products/100
npm run test         # vitest (watch); use `npx vitest run` for one-shot
npm run lint         # 0 errors, 0 warnings
npm run build        # ⚠ currently fails at /_global-error prerender
```

Manual smoke paths:
- `/products` → 13 pages of 8 items, page 1 shows ids 1–8.
- `/products?page=2` → ids 9–16.
- `/products?search=kaftan` → empty state (mock names are "Shirt/Trousers/…", no "Kaftan").
- `/products?search=boots` → 10 matches, 2 pages.
- `/products?page=abc` / `?page=0` / `?page=-4` → falls back to page 1.
- `/products/5` → detail + demand form; `/products/999` → 404.
- Submit with empty fields → 4 field errors (name, phone, size) from the server action; note that the empty measurements/notes pass.
- Valid submit → success modal, form resets, **nothing is persisted**.

---

## 8. Suggested next steps (ordered)

1. Fix or work around the `_global-error` build failure (add `src/app/global-error.tsx`, then try a Next patch upgrade).
2. Reconcile the page size: update `paginate-products.test.ts` to 8, or set `PAGE_SIZE = 12` in `paginate-products.ts` and export the constant.
3. ~~Align HTML `maxLength` values with `demandSchema`~~ — done (`customerName` 50, `measurements` 100, `notes` 100).
4. Add a real persistence layer (e.g. SQLite + Drizzle or Postgres + Prisma) and write the validated demand in `submitDemand`, plus a product-existence check and an admin/inbox route.
5. Make the demand form progressively enhanced (`<form action={…}>` + `useActionState`) so pending state and no-JS submission work.
6. ~~Encode `search` in pagination links~~ — done via `buildProductsHref`. Remaining: extend filtering to category.
7. Replace placeholders: real product image/description fields, home page with navigation, project metadata/README.
8. ~~Add accessibility polish (`fieldset`/`legend`, `aria-invalid`/`aria-describedby`, dialog semantics, focus handling)~~ — done. Remaining: add component-level tests with `jsdom` (the Vitest config still has no DOM environment), and consider a shared `PAGE_SIZE` constant. (Pagination already uses `next/link`; the remaining gap is URL-encoding the `search` value.)
