# TypeScript Order Platform -- Monolith (TS_V12_ESBUILD_YARNBERRY_MONO)

Tool-evaluation repository for **Node 12**, bundled with **esbuild**,
managed with **yarn (Berry)**, in a **Monolith** layout.

This is branch **TS_V12_ESBUILD_YARNBERRY_MONO** of the consolidated `typescript-corpus` repository, which holds all 216 TypeScript branches across every Node version, bundler, package manager and architecture combination in this corpus.

## Project type

- **Language:** TypeScript 5.0.4
- **Runtime:** Node 12 (verified against 12.22.12)
- **Scenario:** 1 - Monolithic
- **Architecture:** Monolith
- **Module layout:** flat
- **Bundler:** esbuild 0.21.5 (esbuild transform and linker)
- **Package manager:** yarn (Berry) 3.8.7
- **Source root:** `src`

Node 12 is end-of-life, and that is deliberate: it pins the entire toolchain to
the last release of each tool that still supports it. Every version in this
repository was resolved against the live npm registry and then executed on a
real Node 12.22.12 interpreter. None was written from memory.

## Supported tools

42 tool families are wired. Each has a folder under `Tool Triggering (Synthetic Data)/` containing a
`trigger.yaml` manifest, a runner, and its configuration.

| Family | Pinned | Family | Pinned |
|---|---|---|---|
| TypeScript (tsc) | 5.0.4 | ts-morph | 18.0.0 |
| esbuild | 0.21.5 | ts-prune | 0.10.3 |
| mocha | 9.2.2 | madge | 5.0.2 |
| c8 (coverage, primary) | 8.0.1 | dependency-cruiser | 11.18.0 |
| nyc + ts-node (cross-check) | 15.1.0 | Stryker | 5.6.1 |
| eslint | 8.57.1 | fast-check | 4.9.0 |
| @typescript-eslint | 5.62.0 | cdxgen | 8.6.3 |
| eslint-plugin-sonarjs | 0.15.0 | ORT (cdxgen licence proxy) | n/a |
| eslint-plugin-security | 2.1.1 | npm-check-updates | 12.5.12 |
| eslint-scope | 7.2.2 | yarn (Berry) audit / ls | 3.8.7 |
| jscpd | 3.2.1 | OpenTelemetry sdk-node | 0.29.2 |
| Grype | v0.110.0 (binary) | Lizard | pip |
| pydriller | pip | GitHub Advisories + API | REST |
| cccc | 3.2.0 (apt) | debtmap | 0.24.1 (cargo) |
| oxlint | 1.16.0 | Bearer CLI | v2.1.1 (binary) |
| license-checker-rseidelsohn | 1.2.2 | OSV-Scanner | OSV API v1 (CLI v2.6.0) |
| oxc-coverage-instrument | 0.13.0 | mewt | 4.0.0 (cargo) |
| diff-cover | 10.6.0 (pip) | ts-unused-exports | 11.0.1 |
| red-dragon | c287bb2 (git) | Opengrep | v1.30.1 (binary) |
| covgate | 0.2.0 (cargo) | reson | v1.4.1 (cargo) |
| git-hot | 0.11.1 (pip) | npm downloads API | api.npmjs.org |

### Tools deliberately NOT wired

Skipping these is a finding, not an omission. See [`dataset.json`](dataset.json).

| Tool | Reason |
|---|---|
| knip | no published version supports Node 12 |
| vitest + @vitest/coverage-v8 | no published version supports Node 12 |
| @biomejs/biome | oldest published version requires Node >=14.21.3 |
| npm-check-updates 19.6.6 | requires Node >=18; pinned to 12.5.12 instead |
| CVE Lite CLI | cve-lite-cli declares Node >=18 in every release (oldest 1.0.0); no release runs on Node 16 or older |
| monocart-coverage-reports | monocart-coverage-reports 2.13.2 does not load on Node 18 or older (the mcr CLI needs commander 14 / a Node 20 regular-expression flag); older releases ship no mcr CLI |
| DepScout | deps-scout 1.0.0 uses optional-call syntax that Node 12 cannot parse |
| TraceGraph (@tracegraph/trace-js) | @tracegraph/trace-js 0.3.1 uses the ?? operator, which Node 12 cannot parse |

Declaring any of these would have produced a metric that cannot be computed.

## Build

```bash
corepack enable && corepack prepare yarn@3.8.7 --activate
yarn install --immutable
yarn run build
yarn run bundle
```

`yarn run build` type-checks with `tsc --noEmit` and emits CommonJS + declarations to
`dist/`; `yarn run bundle` then bundles with **esbuild 0.21.5 (esbuild transform and linker)** and **executes the bundle**.
Emitting is not proof; running it is.

## Run

```bash
node dist/src/index.js
```

## Test

```bash
yarn run test        # mocha over tests/
yarn run coverage    # c8 (primary) AND nyc + ts-node (cross-check)
```

Both coverage tools must report non-zero. They deliberately disagree: c8 reads
V8 coverage of the emitted output and remaps it, while nyc instruments the
TypeScript AST directly through `ts-node/register`. Identical numbers would mean
one of them is not an independent second opinion.

`nyc` here never reports through a source-map remap. Doing so silently yields
0% -- the file is remapped to `.ts`, an `--include` written against `dist/**`
stops matching, and the report empties while the process still exits 0.

## Architecture

**Monolith.** One deployable package. `package.json` declares **no**
`workspaces` field, the module tree under `src/` is flat, and there is no
`services/` directory. Those are exactly the properties an auditor reads to
classify a repository, so they are the ones held true here.

```
src/
  index.ts            public surface + sample runner
  models/             domain records and tax table (leaf layer)
  services/           pricing rules, order service, the duplicate pair
  platform/           integrations that use the planted dependency pins
  analysis/           planted fixtures -- never imported by real code
```

`dependency-cruiser` enforces the layering: `models/` may not import
`services/`, and nothing outside `analysis/` may import `analysis/`.


## Planted fixtures

Nothing in `src/analysis/` is production code. Each file exists so exactly one
tool family has something real to find, **using the committed configuration,
with no extra flags**.

| Fixture | Found by |
|---|---|
| `src/services/retail-order-processor.ts` + `wholesale-order-processor.ts` | jscpd -- a duplicate pair, at default thresholds |
| [`src/analysis/complexity-sample.ts`](src/analysis/complexity-sample.ts) | eslint + sonarjs -- cyclomatic 27, cognitive 74 |
| [`src/analysis/sast-fixture.ts`](src/analysis/sast-fixture.ts) | eslint-plugin-security |
| [`src/analysis/taint-fixture.ts`](src/analysis/taint-fixture.ts) | 4 taint flows + 1 sanitised control |
| [`src/analysis/dead-code.ts`](src/analysis/dead-code.ts) | ts-prune, eslint-scope |
| [`src/analysis/call-graph-sample.ts`](src/analysis/call-graph-sample.ts) | madge, dependency-cruiser -- depth 5, fan-out 6 |
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

