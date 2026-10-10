# reson

Domain: flour bolting cloths

Keys on: source files to tokenise when looking for duplicate blocks

Shape: real source, because this tool tokenises source looking for duplicate blocks.

Nothing to report on it: Duplicate detection needs a token stream per file. Nothing here is
  tokenised, so the comparison set is empty before any pair is considered.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
