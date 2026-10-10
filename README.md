# TypeScript Order Platform -- Monolith (TS_V16_ESBUILD_YARNBERRY_MONO)

Tool-evaluation repository for **Node 16**, bundled with **esbuild**,
managed with **yarn (Berry)**, in a **Monolith** layout.

This is branch **TS_V16_ESBUILD_YARNBERRY_MONO** of the consolidated `typescript-corpus` repository, which holds all 216 TypeScript branches across every Node version, bundler, package manager and architecture combination in this corpus.

## Project type

- **Language:** TypeScript 5.5.4
- **Runtime:** Node 16 (verified against 16.20.2)
- **Scenario:** 1 - Monolithic
- **Architecture:** Monolith
- **Module layout:** flat
- **Bundler:** esbuild 0.21.5 (esbuild transform and linker)
- **Package manager:** yarn (Berry) 3.8.7
- **Source root:** `src`

Each tool is pinned to the release that was resolved for Node 16; `dataset.json`
records the tools that were skipped and why. Every version in this
repository was resolved against the live npm registry and then executed on a
real Node 16.20.2 interpreter. None was written from memory.

## Supported tools

47 tool families are wired. Each has a folder under `Tool Triggering (Synthetic Data)/` containing a
`trigger.yaml` manifest, a runner, and its configuration.

| Family | Pinned | Family | Pinned |
|---|---|---|---|
| TypeScript (tsc) | 5.5.4 | ts-morph | 23.0.0 |
| esbuild | 0.21.5 | ts-prune | 0.10.3 |
| mocha | 10.8.2 | madge | 7.0.0 |
| c8 (coverage, primary) | 9.1.0 | dependency-cruiser | 13.1.5 |
| nyc + ts-node (cross-check) | 15.1.0 | Stryker | 7.3.0 |
| eslint | 8.57.1 | fast-check | 4.9.0 |
| @typescript-eslint | 7.2.0 | cdxgen | 9.11.6 |
| eslint-plugin-sonarjs | 1.0.4 | ORT (cdxgen licence proxy) | n/a |
| eslint-plugin-security | 2.1.1 | npm-check-updates | 16.14.20 |
| eslint-scope | 7.2.2 | yarn (Berry) audit / ls | 3.8.7 |
| jscpd | 3.2.1 | OpenTelemetry sdk-node | 0.57.2 |
| Grype | v0.110.0 (binary) | Lizard | pip |
| pydriller | pip | GitHub Advisories + API | REST |
| knip | 2.43.0 | vitest + @vitest/coverage-v8 | 0.34.6 |
| @biomejs/biome | 2.5.11 | cccc | 3.2.0 (apt) |
| debtmap | 0.24.1 (cargo) | oxlint | 1.16.0 |
| Bearer CLI | v2.1.1 (binary) | license-checker-rseidelsohn | 3.3.0 |
| OSV-Scanner | OSV API v1 (CLI v2.6.0) | oxc-coverage-instrument | 0.13.0 |
| mewt | 4.0.0 (cargo) | diff-cover | 10.6.0 (pip) |
| ts-unused-exports | 11.0.1 | red-dragon | c287bb2 (git) |
| Opengrep | v1.30.1 (binary) | covgate | 0.2.0 (cargo) |
| reson | v1.4.1 (cargo) | DepScout | 1.0.0 |
| TraceGraph (@tracegraph/trace-js) | 0.3.1 | git-hot | 0.11.1 (pip) |
| npm downloads API | api.npmjs.org |  |  |

### Tools deliberately NOT wired

Skipping these is a finding, not an omission. See [`dataset.json`](dataset.json).

| Tool | Reason |
|---|---|
| npm-check-updates 19.6.6 | requires Node >=18; pinned to 16.14.20 instead |
| CVE Lite CLI | cve-lite-cli declares Node >=18 in every release (oldest 1.0.0); no release runs on Node 16 or older |
| monocart-coverage-reports | monocart-coverage-reports 2.13.2 does not load on Node 18 or older (the mcr CLI needs commander 14 / a Node 20 regular-expression flag); older releases ship no mcr CLI |

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


## Tool test-data folders

Three sibling folders sit at the repo root, alongside this branch's own
`Tool Triggering (Synthetic Data)/` (above).

### `Tool Triggering (Tool Github Test data)/`
Each of the 39 tool subfolders is that tool's own real upstream code and test
suite, pulled as-is from its actual GitHub project -- not generated. `covgate/`
is the clearest case: it's genuinely Rust, not TypeScript -- `cli_interface.rs`,
`coverage_parse.rs`, `gate.rs`, `git_module.rs`, `metrics.rs`,
`render_console.rs`, `render_markdown.rs` plus its own `fixtures/`, `helpers/`
and `support/` test directories, straight from the covgate project. `ESLint/`,
`StrykerJS/`, `Opengrep/`, `pydriller/` and the rest are each that project's
own real test suite. A correct run finds whatever that upstream project's own
tests genuinely contain. `TraceGraph/` is the exception: it holds only a note, because that project publishes no public repository.

### `Tool Clean (Synthetic Data)/`
25 of the 40 tools each carry 5 generated fixture packages, one per Node
family (12, 14, 20, 24, 26), engineered to be clean so the tool should report
zero findings: the **Tool Clean (100% pass)** condition. `covgate` is the
exception within the exception: because it builds a native binary per Node
family, each of its 5 node-version folders (`node12/`...`node26/`) is itself a
full self-contained package with its own git history, plus a 6th git history
at the `covgate/` root -- 6 separate repositories in total. `diff-cover` and
`pydriller` operate on git history rather than language syntax, so each
carries one real git repository's worth of history instead of 5 per-version
copies. 13 other tools (`Bearer CLI`, `CVE Lite CLI`, `DepScout`, `Dependabot`, `GitHub API`, `Grype`, `ORT`, `OSV-Scanner`, `SonarJS`, `TraceGraph`, `git-hot`, `red-dragon`, `reson`) carry a single flat `src/` fixture rather than per-Node copies. All 8 of these git histories (6 covgate + diff-cover + pydriller) are
restored from `_git-bundles/` via `restore-git.ps1` rather than kept as live
`.git` folders, so a plain file copy never silently drops their content as a
submodule-style gitlink.

### `Tool Invalid (Synthetic Data)/`
Same shape as Clean -- 40 tools, the same 5-Node-version pattern, and the same
covgate exception -- but engineered so every fixture makes the tool flag or
fail rather than pass: the **Tool Invalid** condition. Only covgate's 6 git
histories needed bundling here (`_git-bundles/` + `restore-git.ps1`, alongside
an earlier `restore-covgate-git.ps1` left in place from a prior pass);
`diff-cover`'s and `pydriller`'s Invalid fixtures were already plain,
git-free copies.

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

## Layout

```
typescript-corpus/  (TS_V16_ESBUILD_YARNBERRY_MONO)
|-- .github/  (1 files)
|-- src/  (15 files)
|-- tests/  (5 files)
|-- Tool Clean (Synthetic Data)/  (652 files)
|-- Tool Invalid (Synthetic Data)/  (864 files)
|-- Tool Triggering (Synthetic Data)/  (112 files)
|-- Tool Triggering (Tool Github Test data)/  (22088 files)
|-- .editorconfig
|-- .eslintrc.cjs
|-- .gitattributes
|-- .gitignore
|-- .jscpd.json
|-- .madgerc
|-- .nvmrc
|-- .yarnrc.yml
|-- README.md
|-- biome.json
|-- dataset.json
|-- knip.json
|-- package.json
|-- tsconfig.build.json
|-- tsconfig.json
|-- vitest.config.ts
|-- yarn.lock
```

## Verification

Every claim in this README is checked by `ts-node "Tool Triggering (Synthetic Data)/full_check.ts"`, which
reads its expectations **from the repository** rather than from a hard-coded
list -- including that `.nvmrc`, `package.json` engines, `dataset.json`, the CI
workflow and all 26 `trigger.yaml` manifests agree on the Node version, the
branch, and the architecture.

<!-- tools-non-triggering -->
## Tools non triggering (Synthetic Data)

A fifth per-branch data folder, beside `Tool Clean (Synthetic Data)`,
`Tool Invalid (Synthetic Data)`, `Tool Triggering (Synthetic Data)` and
`Tool Triggering (Tool Github Test data)`.

Clean makes each tool run and report nothing wrong. Invalid makes it run and
report something. This folder holds data with nothing in it for any tool to
catch -- and, where no program would reach the tool at all, nothing for it to
start on. It is the negative control that tells *correctly detected nothing*
apart from *the scan never ran*.

`Tools non triggering (Synthetic Data)/` holds 40 tool-named folders, matching the names in Clean
and Invalid so the data sets line up name-for-name:

* **16 tools read source**, so they get a minimal program per boundary
  family (node12, node14, node20, node24, node26) -- one class or one function, no branching, no
  duplication, no dependency, no dead export, no magic number.
* **24 tools cannot be answered by a program** -- they read a lockfile,
  a coverage report, compiled bytecode or the commit history -- so they carry
  the subject matter as a plain record instead, with the reason stated in that
  folder's own README.

**No manifest, no lockfile, no tool configuration, no runner and no
`trigger.yaml` anywhere in it**, so the folder adds no discovered project and
no task to a run.

See `Tools non triggering (Synthetic Data)/README.md` for the per-tool table, the mechanism each tool is
inert by, and what was measured.
