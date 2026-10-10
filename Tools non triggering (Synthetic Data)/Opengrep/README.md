# Opengrep

Domain: dye vat batches

Keys on: files matching the language of a loaded rule, discovered by extension

Shape: real source, because this tool matches rule patterns against parsed source.

Nothing to report on it: Rules are language-scoped. With no file in any rule's language, rule
  selection resolves to an empty target set before matching begins.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
