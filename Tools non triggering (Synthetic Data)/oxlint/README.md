# oxlint

Domain: vinegar souring casks

Keys on: files matching its extension list beneath the scanned path

Shape: real source, because this tool lints parsed source.

Nothing to report on it: Measured: oxlint reports `Finished in 11ms on 0 files with 89 rules`. The
  rule set loaded in full and then had nothing to apply itself to, which
  is precisely the state this folder is built to produce.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
