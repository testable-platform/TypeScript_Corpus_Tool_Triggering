# TypeScript Order Platform -- Microservices (TS_V14_ROLLUP_BUN_MICRO)

Tool-evaluation repository for **Node 14**, bundled with **rollup**,
managed with **bun**, in a **Microservices** layout.

This is branch **TS_V14_ROLLUP_BUN_MICRO** of the consolidated `typescript-corpus` repository, which holds all 216 TypeScript branches across every Node version, bundler, package manager and architecture combination in this corpus.

## Project type

- **Language:** TypeScript 5.1.6
- **Runtime:** Node 14 (verified against 14.21.3)
- **Scenario:** 2 - Microservices
- **Architecture:** Microservices
- **Module layout:** workspace
- **Bundler:** Rollup 3.30.0 (Rollup linker + tsc 5.1.6 transform)
- **Package manager:** bun 1.4.0
- **Source root:** `packages/domain/src`

Node 14 is end-of-life, and that is deliberate: it pins the entire toolchain to
the last release of each tool that still supports it. Every version in this
repository was resolved against the live npm registry and then executed on a
real Node 14.21.3 interpreter. None was written from memory.

## Supported tools

46 tool families are wired. Each has a folder under `Tool Triggering (Synthetic Data)/` containing a
`trigger.yaml` manifest, a runner, and its configuration.

| Family | Pinned | Family | Pinned |
|---|---|---|---|
| TypeScript (tsc) | 5.1.6 | ts-morph | 19.0.0 |
| rollup | 3.30.0 | ts-prune | 0.10.3 |
| mocha | 10.8.2 | madge | 7.0.0 |
| c8 (coverage, primary) | 9.1.0 | dependency-cruiser | 12.12.2 |
| nyc + ts-node (cross-check) | 15.1.0 | Stryker | 6.4.2 |
| eslint | 8.57.1 | fast-check | 4.9.0 |
| @typescript-eslint | 5.62.0 | cdxgen | 8.6.3 |
| eslint-plugin-sonarjs | 0.23.0 | ORT (cdxgen licence proxy) | n/a |
| eslint-plugin-security | 2.1.1 | npm-check-updates | 16.14.20 |
| eslint-scope | 7.2.2 | bun audit / ls | 1.4.0 |
| jscpd | 3.2.1 | OpenTelemetry sdk-node | 0.57.2 |
| Grype | v0.110.0 (binary) | Lizard | pip |
| pydriller | pip | GitHub Advisories + API | REST |
| vitest + @vitest/coverage-v8 | 0.34.6 | @biomejs/biome | 2.5.11 |
| cccc | 3.2.0 (apt) | debtmap | 0.24.1 (cargo) |
| oxlint | 1.16.0 | Bearer CLI | v2.1.1 (binary) |
| license-checker-rseidelsohn | 3.3.0 | OSV-Scanner | OSV API v1 (CLI v2.6.0) |
| oxc-coverage-instrument | 0.13.0 | mewt | 4.0.0 (cargo) |
| diff-cover | 10.6.0 (pip) | ts-unused-exports | 11.0.1 |
| red-dragon | c287bb2 (git) | Opengrep | v1.30.1 (binary) |
| covgate | 0.2.0 (cargo) | reson | v1.4.1 (cargo) |
| DepScout | 1.0.0 | TraceGraph (@tracegraph/trace-js) | 0.3.1 |
| git-hot | 0.11.1 (pip) | npm downloads API | api.npmjs.org |

### Tools deliberately NOT wired

Skipping these is a finding, not an omission. See [`dataset.json`](dataset.json).

| Tool | Reason |
|---|---|
| knip | no published version supports Node 14 either -- current major needs ^20.19 || >=22.12 |
| npm-check-updates 19.6.6 | requires Node >=18; pinned to 16.14.20 instead |
| CVE Lite CLI | cve-lite-cli declares Node >=18 in every release (oldest 1.0.0); no release runs on Node 16 or older |
| monocart-coverage-reports | monocart-coverage-reports 2.13.2 does not load on Node 18 or older (the mcr CLI needs commander 14 / a Node 20 regular-expression flag); older releases ship no mcr CLI |

Declaring any of these would have produced a metric that cannot be computed.

## Build

```bash
# bun is a standalone binary, not an npm package -- see Tool Triggering (Synthetic Data)/npm-audit/run_npm_audit.sh
bun install --frozen-lockfile
bun run build
bun run bundle
```

`bun run build` type-checks with `tsc --noEmit` and emits CommonJS + declarations to
`dist/`; `bun run bundle` then bundles with **Rollup 3.30.0 (Rollup linker + tsc 5.1.6 transform)** and **executes the bundle**.
Emitting is not proof; running it is.

## Run

```bash
node dist/packages/domain/src/index.js
```

Each service is independently runnable:

```bash
node dist/services/gateway-service/src/index.js
node dist/services/pricing-service/src/index.js
```

## Test

```bash
bun run test        # mocha over tests/
bun run coverage    # c8 (primary) AND nyc + ts-node (cross-check)
```

Both coverage tools must report non-zero. They deliberately disagree: c8 reads
V8 coverage of the emitted output and remaps it, while nyc instruments the
TypeScript AST directly through `ts-node/register`. Identical numbers would mean
one of them is not an independent second opinion.

`nyc` here never reports through a source-map remap. Doing so silently yields
0% -- the file is remapped to `.ts`, an `--include` written against `dist/**`
stops matching, and the report empties while the process still exits 0.

## Architecture

**Microservices.** Three independently deployable services over a shared domain
package, wired through a workspace root.

```
packages/
  domain/         @orderkit/domain     -- models, services, analysis fixtures
  contracts/      @orderkit/contracts  -- inter-service message types
services/
  gateway-service/    accepts payloads, emits order.submitted
  order-service/      validates and prices, emits order.priced / order.rejected
  pricing-service/    owns tier and volume rates (leaf -- calls no one)
```

Each service has its own `package.json`, its own `src/index.ts` entry point and
its own start script. The workspace root lists them under `workspaces`.

**Documented inter-service call path:**

```
http.request -> gateway-service -> order.submitted
                order-service   -> pricing.quote -> pricing-service
                pricing-service -> pricing.rate  -> order-service
                order-service   -> order.priced | order.rejected
```

This matters because of what the JavaScript corpus got wrong: FlintAtlas's sheet
said `Microservices` while the repository was a flat monolith with no
workspaces, and its own README and `dataset.json` both said "monolith". Nothing
in that repo compared the two. Here `Tool Triggering (Synthetic Data)/full_check.ts` fails the build if the
declared architecture and the actual layout disagree.


## Planted fixtures

Nothing in `packages/domain/src/analysis/` is production code. Each file exists so exactly one
tool family has something real to find, **using the committed configuration,
with no extra flags**.

| Fixture | Found by |
|---|---|
| `packages/domain/src/services/retail-order-processor.ts` + `wholesale-order-processor.ts` | jscpd -- a duplicate pair, at default thresholds |
| [`packages/domain/src/analysis/complexity-sample.ts`](packages/domain/src/analysis/complexity-sample.ts) | eslint + sonarjs -- cyclomatic 27, cognitive 74 |
| [`packages/domain/src/analysis/sast-fixture.ts`](packages/domain/src/analysis/sast-fixture.ts) | eslint-plugin-security |
| [`packages/domain/src/analysis/taint-fixture.ts`](packages/domain/src/analysis/taint-fixture.ts) | 4 taint flows + 1 sanitised control |
| [`packages/domain/src/analysis/dead-code.ts`](packages/domain/src/analysis/dead-code.ts) | ts-prune, eslint-scope |
| [`packages/domain/src/analysis/call-graph-sample.ts`](packages/domain/src/analysis/call-graph-sample.ts) | madge, dependency-cruiser -- depth 5, fan-out 6 |
| Five pinned dependencies | npm audit, Grype, GitHub Advisories -- see [`Tool Triggering (Synthetic Data)/grype/PLANTED-CVES.md`](<Tool Triggering (Synthetic Data)/grype/PLANTED-CVES.md>) |

The duplicate pair sits in real service code, not in `analysis/`, because
duplication inside a fixtures folder is trivially dismissed.


## Tool entry points

```bash
ts-node "Tool Triggering (Synthetic Data)/tool_integration.ts"             # wiring banner
ts-node "Tool Triggering (Synthetic Data)/tool_integration.ts" --list      # machine-readable list
ts-node "Tool Triggering (Synthetic Data)/tool_integration.ts" --verify    # folder + manifest + runner for every tool
ts-node "Tool Triggering (Synthetic Data)/tool_integration.ts" --run jscpd # one tool
ts-node "Tool Triggering (Synthetic Data)/tool_integration.ts" --run-all   # every tool, in order
ts-node "Tool Triggering (Synthetic Data)/full_check.ts"                   # cross-file consistency audit
```

Every tool can also be run directly: `bash "Tool Triggering (Synthetic Data)/<tool>/run_<tool>.sh"`.

CI runs **every one of these runners** and uploads their output as artifacts.
A CI file that only installs and tests would leave the declared tools unproven.

## Verification

Every claim in this README is checked by `ts-node "Tool Triggering (Synthetic Data)/full_check.ts"`, which
reads its expectations **from the repository** rather than from a hard-coded
list -- including that `.nvmrc`, `package.json` engines, `dataset.json`, the CI
workflow and all 26 `trigger.yaml` manifests agree on the Node version, the
branch, and the architecture.

