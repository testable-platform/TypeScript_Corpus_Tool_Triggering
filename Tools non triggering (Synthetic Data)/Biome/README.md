# Biome

Domain: peat cutting allocations

Keys on: biome.json or biome.jsonc, then .ts/.tsx/.js files beneath the configured
  root

Shape: real source, because this tool lints and formats parsed source.

Nothing to report on it: Biome refuses to run without a configuration file unless given explicit
  paths, and there is none here; even supplied one, its file matcher
  claims no extension present in this folder.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
