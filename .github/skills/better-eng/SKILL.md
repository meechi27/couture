---
name: better-eng
description: Apply the Better Eng AI coding constitution when planning, implementing, reviewing, or validating changes in this repository.
---

# Better Eng — AI Coding Constitution

Use this skill to make AI-assisted development predictable, safe, understandable, and scalable in this repository.

## Core idea

**AI may be creative inside a known boundary. AI may not change the boundary without approval.**

The boundary includes the requested behavior, existing architecture, framework and version, public contracts, test and validation expectations, and files in scope. When the boundary is unclear, ask instead of guessing.

## Operating procedure

### Before coding

1. Restate the requested outcome in concrete terms.
2. Inspect relevant files, tests, configuration, and nearby patterns.
3. Identify the smallest set of files likely to change.
4. Check for existing helpers, types, validators, and tests before adding new ones.
5. Read installed framework guidance before changing framework-specific behavior.
6. State assumptions that could affect behavior.
7. Ask before choosing a meaningful architecture, behavior, dependency, refactor, or testing option.

### During coding

- Make the smallest coherent change and preserve unrelated behavior.
- Follow existing names, formatting, imports, and conventions.
- Prefer explicit code over clever generic abstractions.
- Keep server/client, async/sync, and side-effect boundaries visible.
- Keep inputs and outputs typed.
- Surface errors instead of hiding them.
- Do not add compatibility code for hypothetical callers.
- Do not update dependencies unless the task requires it and the reason is stated.

### After coding

Report files changed, behavior changed, assumptions made, risks or unresolved questions, and validation commands with their results. Never claim success when a relevant check failed.

## Architecture

Organize code primarily by feature or business capability. Use only the internal lanes a feature needs:

```text
feature/
├── page or route entrypoint
├── components/
├── domain or application logic
├── validation/
├── contracts or types/
└── *.test.ts
```

- Route files own routing and composition.
- UI components own rendering and interaction.
- Domain/application functions own business decisions.
- Validation modules own input rules.
- Contracts/types describe boundaries and data shapes.
- Tests stay close to the behavior they protect.
- Infrastructure access belongs behind a named boundary.
- Shared code belongs in a shared location only after at least two real consumers exist.
- Do not put database, network, or filesystem access directly in presentational components.
- Do not introduce abstractions without a concrete responsibility and consumer.
- Do not move code across feature boundaries during unrelated work.
- Propose a split before restructuring an oversized feature.
- Explain dependency direction before adding a new cross-feature dependency.

## Stop and ask before

- changing public APIs, routes, data shapes, or user-visible behavior
- selecting between multiple reasonable architecture patterns
- adding dependencies or a new state-management system
- changing persistence, caching, authentication, authorization, or error semantics
- performing a refactor beyond the request
- inventing test expectations for unspecified behavior
- changing framework configuration with runtime or deployment impact
- changing naming or folder conventions

## TypeScript and React

- Keep strict typing enabled where supported.
- Do not use `any` or unsafe casts to bypass type problems.
- Type public function parameters and return values.
- Use discriminated unions for success/error results.
- Validate forms, requests, URL parameters, files, environment variables, and third-party responses at boundaries.
- Keep runtime validation and compile-time types aligned.
- Keep components focused on rendering and interaction.
- Keep business decisions in named, independently testable functions.
- Keep side effects in explicit effects, handlers, actions, or infrastructure boundaries.
- Do not add state when derived values are sufficient.
- Keep server/client boundaries explicit and framework-correct.
- Preserve stable keys, controlled inputs, loading/error/empty states, keyboard access, labels, focus behavior, semantic HTML, and screen-reader relationships.

## Errors, security, and dependencies

- Validate all untrusted input at the boundary.
- Follow existing error conventions and never silently swallow exceptions.
- Never use broad catches that convert failures into success-shaped results.
- Never expose secrets, tokens, internal stack traces, or sensitive data.
- Never log passwords, tokens, personal data, or full request bodies unless explicitly required and safely redacted.
- Preserve authorization checks when moving or reusing code.
- Before adding a package, explain why existing code cannot solve the need, its behavior, bundle/runtime/security/maintenance impact, framework compatibility, and test plan.
- Do not add a package for a small helper that platform APIs can safely provide.

## Tests and verification

- Test behavior, including important boundary and failure cases.
- Reuse the existing test runner and style.
- Run the smallest relevant test command first.
- Run lint and type-check/build checks when the change affects them.
- Run runtime or browser validation for routing, forms, accessibility, or user-visible interaction changes.
- Ask before inventing assertions when expected behavior is unspecified.

## Scope and refactoring

- Do not perform unrelated cleanup.
- Allow only the smallest cleanup required for correctness and clarity.
- Report larger nearby improvements separately and ask first.
- Do not rename public symbols, move folders, or change abstractions only for style.
- Never combine a feature change with a broad formatting or architecture rewrite.

## Final checklist

Verify that the change:

- follows an existing pattern where one exists
- changes only necessary files
- keeps behavior explicit at boundaries
- types inputs, outputs, and errors
- preserves server/client and side-effect boundaries
- handles loading, empty, invalid, and failure states
- preserves accessibility
- avoids unnecessary dependencies and abstractions
- does not change behavior outside the request
- includes focused tests or validation checks
- is explainable without knowing AI's assumptions
