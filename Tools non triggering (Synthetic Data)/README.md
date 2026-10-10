# TypeScript tools non-triggering corpus

40 tool-named folders, one per tool, matching the folder names in
`Tool Clean (Synthetic Data)` and `Tool Invalid (Synthetic Data)` so the three
data sets line up name-for-name.

Clean makes each tool run and report nothing wrong. Invalid makes it run and
report something. This folder holds data with nothing in it for any tool to
catch -- and, where the tool cannot be given a program at all, nothing for it
to start on.

## Why the folder is split two ways

A hello world, one class with one function, a `main` file -- that answers the
question for a tool that reads source. It answers nothing for a tool that reads
a lockfile, a coverage report, or the commit history: a dependency scanner
handed a program has no dependency set, so it does not run and find nothing,
it simply does not run. Shipping it a `main.ts` would state a verdict
this folder cannot support.

So each tool gets whichever shape is true for it.

### 16 tools get a minimal program

`node12` through `node26`, one program each, matching the family split in `Tool Clean`.
One class or one function, no branching, no duplication, no dependency, no
dead export, no magic number. No manifest, no tool config.

| Tool | Reads source because it |
| --- | --- |
| Bearer CLI | builds its data-flow view from parsed source |
| Biome | lints and formats parsed source |
| ESLint | lints parsed source |
| Lizard | counts functions and complexity from its own tokeniser |
| Opengrep | matches rule patterns against parsed source |
| cccc | parses C, C++ and Java - so its program here is C |
| debtmap | scores debt per function, which needs a parse |
| dependency-cruiser | walks a module graph built from source |
| eslint-plugin-security | rules evaluated over parsed source by a host run |
| eslint-plugin-sonarjs | rules evaluated over parsed source by a host run |
| jscpd | tokenises files and compares token runs |
| oxlint | lints parsed source |
| red-dragon | lowers source into its intermediate representation |
| reson | tokenises source looking for duplicate blocks |
| ts-morph | operates on source files handed to it directly |
| ts-unused-exports | checks exports across a set of source files |

### 24 tools get an inert record instead

| Tool | No program would help because it |
| --- | --- |
| CVE Lite CLI | resolves a dependency set; a program declares none |
| DepScout | ages declared versions; a program declares none |
| Dependabot | needs an ecosystem manifest and a schedule file |
| GitHub API | queries the remote over the network |
| Grype | matches package coordinates from an SBOM or lockfile |
| ORT | its analyzer phase opens by locating definition files |
| OSV-Scanner | queries advisories for resolved packages, not for code |
| SonarJS | the analyzer engine needs a Sonar server and project key |
| StrykerJS | needs a test suite to re-run per mutant |
| TraceGraph | assembles spans emitted by a running process |
| cdxgen | an SBOM is a transformation of a manifest |
| covgate | reads a coverage report it did not produce |
| diff-cover | needs a coverage report and a diff to intersect |
| fast-check | properties must be written and executed by a runner |
| git-hot | computes churn from commit history |
| knip | needs package.json entry and project globs to define a boundary |
| license-checker-rseidelsohn | reads licences from an installed node_modules tree |
| mewt | shells out to vitest in a real project |
| monocart-coverage-reports | a reporter; it formats a coverage object |
| npm-check-updates | compares declared ranges against the registry |
| opentelemetry-sdk-node | attaches at require time inside a live process |
| oxc-coverage-instrument | instruments for a runner that must then execute |
| pydriller | iterates the repository's commits, not a directory |
| vitest | collects files matching a test glob, then runs them |

## What the code deliberately avoids, and why

The first draft used plain hello worlds. Run against oxlint with its style,
suspicious and correctness categories enabled, those produced **42 errors**:
`no-magic-numbers` x18, `func-style` x18, `prefer-template` x6. Nothing was
wrong with the code -- a bare `12`, a `function` declaration and string
concatenation are all ordinary, and all things some rule set has an opinion
about. "A hello world triggers nothing" is true of the default configs and
false of stricter ones.

Each fix then exposed the next rule, which is the part worth knowing:

| Round | Change | What it then produced |
| --- | --- | --- |
| 1 | plain hello worlds | 42 errors |
| 2 | named every constant | 60 x `no-inferrable-types` |
| 3 | dropped the restating type annotations | 15 x `sort-keys` |
| 4 | sorted the object keys | **0 across all 201 rules** |

Two defects found the same way, both of which would have scaled to every
branch: the arrow-function draft declared `tally` and `main` at global scope,
so all 40 folders would have collided, and `node12`/`node14` within one folder
shared an identifier. Every identifier now carries its family digits, and the
whole set compiles as one program under `tsc --strict`.

### Measured

tsc --strict over all 75 files together: clean. oxlint: 0 on defaults and 0
across all 201 rules. lizard: 76 functions, average CCN 1.0, 0 warnings. jscpd:
0 clones. semgrep with a security ruleset: 0 findings over 75 files.
detect-secrets: 0. gcc syntax-check on the cccc C program: clean.

## Invariants

| # | Invariant |
| --- | --- |
| G2 | No manifest and no lockfile anywhere, so the folder adds no discovered project and no task. |
| G3 | No tool configuration file. |
| G4 | No coverage report, SBOM or other consumed artifact. |
| G5 | Pure ASCII. |
| G6 | No secret-shaped strings. |
| G7 | Zero duplicate blocks at 5 lines / 30 tokens, across both shapes. |

`verify.py` checks all of them. G1 of the earlier draft -- no source extension
anywhere -- is gone by design: the CODE folders now carry real source.

## Layout

```text
Tools non triggering (Synthetic Data)/
  README.md
  <Tool Name>/              CODE
    README.md
    <first family>/main.ts  ...  <last family>/main.ts
  <Tool Name>/              INERT
    README.md
    record.txt
```

## Verifying

```bash
python3 verify.py "<path to this folder>"
python3 measure.py "<path to this folder>" --bin <node_modules/.bin>
```
