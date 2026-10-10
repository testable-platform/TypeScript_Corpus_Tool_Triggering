# debtmap

Domain: hop kiln loads

Keys on: source files in a language it supports, found by extension

Shape: real source, because this tool scores debt per function, which needs a parse.

Nothing to report on it: Debt scoring is per function, and function extraction needs a parse. No
  file here reaches the parser.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
