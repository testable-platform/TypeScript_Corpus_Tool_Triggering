# TypeScript Corpus -- Tool Triggering (Synthetic Data)

`main` carries only this overview -- it holds no project code. Every other
branch in this repository is one cell of `testable-platform/typescript-corpus`, split out to carry
only the `Tool Triggering (Synthetic Data)/` folder (plus that branch's own build scaffolding).

This repository was produced by splitting `testable-platform/typescript-corpus` by task folder.
`testable-platform/typescript-corpus` itself was not modified by this split and still holds the
full combined corpus.

## Scope

This repo covers every family/bundler/package-manager/architecture combination (216 branches).

## Branch naming

Branch names are unchanged from `testable-platform/typescript-corpus`:

```
TS_V{family}_{BUNDLER}_{PACKAGE_MANAGER}_{ARCHITECTURE}
```

## Finding a branch

Each branch's own `README.md` describes its exact cell (Node family, bundler,
package manager, architecture) and its tool roster, trimmed to the parts
relevant to `Tool Triggering (Synthetic Data)/`. `dataset.json` on each branch is the
machine-readable answer key for that cell (unmodified by this split -- it
still describes the branch's original full tool/5-folder state).

## History

Each branch's commit history is carried over unchanged from `testable-platform/typescript-corpus`,
with one additional commit on top that removes the folders not relevant to
this repo. Nothing was squashed or rewritten.
