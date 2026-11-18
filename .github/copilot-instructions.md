# Better Eng — AI Coding Constitution

## Purpose

These rules make AI-assisted development predictable, safe, understandable, and scalable.

The goal is not to make every project identical. The goal is to make important decisions explicit and prevent AI from applying familiar patterns that do not fit the project.

## Core idea

**AI may be creative inside a known boundary. AI may not change the boundary without approval.**

The boundary includes:

- the requested behavior
- the existing architecture
- the project's framework and version
- the public contracts
- the test and validation expectations
- the files that are in scope

When the boundary is unclear, AI must ask instead of guessing.

## Human-readable decision hierarchy

When rules conflict, use this order:

1. Explicit user requirements.
2. Existing behavior and public contracts.
3. Existing project conventions.
4. Installed framework documentation and version-specific guidance.
5. These constitution rules.
6. General AI or ecosystem best practices.

Generic AI habits never override the project's actual code or the user's direction.

## Architecture: feature-first, with fixed internal lanes

Organize code primarily by feature or business capability.

Each feature may contain predictable internal lanes:

```text
feature/
├── page or route entrypoint
├── components/
├── domain or application logic
├── validation/
├── contracts or types/
└── *.test.ts
```

Use only the lanes that the feature needs. Do not create empty folders or layers for theoretical future use.

### Placement rules

- Route files own routing and composition.
- UI components own rendering and user interaction.
- Domain/application functions own business decisions.
- Validation modules own input rules.
- Contracts/types describe boundaries and data shapes.
- Tests stay close to the behavior they protect.
- Infrastructure access belongs behind a named boundary, such as a repository or client.
- Shared code belongs in a shared location only after at least two real consumers exist.

### Architecture constraints

- Do not put database, network, or filesystem access directly in presentational components.
- Do not make a shared utility merely because two pieces of code look similar.
- Do not introduce a service, hook, store, repository, or abstraction without a concrete responsibility and consumer.
- Do not move code across feature boundaries as part of an unrelated task.
- If a feature becomes too large, propose a split before performing it.
- If a new cross-feature dependency is needed, explain the dependency direction first.

## AI operating procedure

### Before coding

AI must:

1. Restate the requested outcome in concrete terms.
2. Inspect the relevant files, tests, configuration, and nearby patterns.
3. Identify the smallest set of files likely to change.
4. Check for existing helpers, types, validators, and tests before adding new ones.
5. Read installed framework guidance before changing framework-specific behavior.
6. State assumptions that could affect behavior.
7. Ask before choosing a meaningful architecture, behavior, dependency, refactor, or testing option.

### During coding

- Make the smallest coherent change.
- Preserve unrelated behavior.
- Follow existing names, formatting, imports, and conventions.
- Prefer explicit code over clever generic abstractions.
- Keep server/client, async/sync, and side-effect boundaries visible.
- Keep inputs and outputs typed.
- Surface errors instead of hiding them.
- Do not add compatibility code for hypothetical callers.
- Do not update dependencies unless the task requires it and the reason is stated.

### After coding

AI must report:

- files changed
- behavior changed
- assumptions made
- risks or unresolved questions
- validation commands run and their results

AI must not claim success when a relevant check failed.

## When AI must stop and ask

AI must ask before:

- changing the public API, route shape, data shape, or user-visible behavior
- selecting between multiple reasonable architecture patterns
- adding a dependency
- introducing a new state-management system
- changing persistence, caching, authentication, authorization, or error semantics
- performing a refactor beyond the requested change
- deciding what tests should be added when the user has not specified the expected behavior
- changing a framework configuration with runtime or deployment impact
- changing a naming convention or folder convention

Small implementation details may use existing project conventions without asking.

## TypeScript rules

- Keep strict typing enabled where the project supports it.
- Do not use `any` to bypass a type problem.
- Do not use unsafe casts when a type guard, schema, overload, or better type can express the truth.
- Type public function parameters and return values.
- Use discriminated unions for success/error results.
- Validate data at external boundaries: forms, requests, URL parameters, files, environment variables, and third-party responses.
- Keep inferred types when they are already clear and local.
- Do not duplicate a type that already represents the same contract.
- Keep runtime validation and compile-time types aligned.
- Treat `undefined`, `null`, empty strings, and invalid values as distinct cases unless the contract says otherwise.

### Bad

```ts
const value = response.data as any;
```

### Better

```ts
const result = responseSchema.safeParse(response.data);

if (!result.success) {
  return { success: false, error: "Invalid response" };
}
```

## React rules

- Keep components focused on rendering and interaction.
- Keep business decisions in named functions that can be tested without rendering.
- Keep side effects in explicit effects, event handlers, actions, or infrastructure boundaries.
- Do not add state when derived values are sufficient.
- Do not add global state for local component behavior.
- Do not use an effect to calculate a value that can be calculated during render.
- Keep server/client boundaries explicit and framework-correct.
- Preserve stable keys, controlled input behavior, loading states, error states, and empty states.
- Preserve keyboard access, labels, focus behavior, semantic HTML, and screen-reader relationships.
- Do not change visible text or interaction behavior without treating it as a product decision.

## Error handling and security

- Validate all untrusted input at the boundary.
- Return or throw errors according to the existing project convention.
- Never silently swallow an exception.
- Never use a broad catch that converts failures into success-shaped results.
- Do not expose secrets, tokens, internal stack traces, or sensitive data to users.
- Do not log passwords, tokens, personal data, or full request bodies unless explicitly required and safely redacted.
- Preserve authorization checks when moving or reusing code.
- Prefer explicit error states over silent defaults.

## Dependencies

Before adding a package, AI must explain:

- why existing code or dependencies cannot solve the need
- what behavior the package provides
- its effect on bundle size, runtime, security, and maintenance
- why its version fits the installed framework
- how it will be tested

Do not add a package for a small helper that can be safely implemented with existing platform APIs.

## Tests and verification

Testing is for behavior, not for satisfying a coverage number.

- Add or update focused tests for new behavior and fixed bugs.
- Test boundary cases and failure paths when they matter.
- Reuse the project's existing test runner and style.
- Run the smallest relevant test command first.
- Run lint and type-check/build checks when the change affects them.
- Run runtime or browser validation for routing, forms, accessibility, or user-visible interaction changes.
- If the user has not defined expected behavior for a test-sensitive change, ask before inventing assertions.

## Comments and documentation

Keep comments minimal.

Add a comment only when it explains:

- why a non-obvious choice is required
- a business rule that code alone cannot communicate
- a framework or browser workaround
- an invariant future code must preserve

Do not add comments that merely repeat the code. Do not remove useful existing comments without checking whether they document an invariant or operational requirement.

Public contracts, setup instructions, and non-obvious decisions belong in documentation when future contributors need them.

## Refactoring policy

Refactoring is not automatically included.

- Do not perform unrelated cleanup.
- Allow only the smallest cleanup required to make the requested change correct and clear.
- If nearby code needs a larger improvement, report it separately and ask first.
- Do not rename public symbols, move folders, or change abstractions only for style.
- Never combine a feature change with a broad formatting or architecture rewrite.

## Predictability checklist

Before accepting AI-generated code, verify:

- Does it use an existing pattern where one exists?
- Is every changed file necessary?
- Is the behavior explicit at the boundary?
- Are inputs, outputs, and errors typed?
- Are server/client and side-effect boundaries clear?
- Are loading, empty, invalid, and failure states handled?
- Is accessibility preserved?
- Did it add a dependency or abstraction unnecessarily?
- Did it change behavior outside the request?
- Are focused tests or validation checks present?
- Can another human explain the code without knowing AI's assumptions?

## Short AI instruction

> Inspect first. Follow the project's patterns and installed framework guidance. Make the smallest focused change. Keep types, boundaries, errors, and accessibility explicit. Ask before meaningful choices or refactors. Do not invent dependencies or abstractions. Verify the exact requested behavior and report changed files, assumptions, risks, and failed checks honestly.
