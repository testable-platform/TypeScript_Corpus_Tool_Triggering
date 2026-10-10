# Bearer CLI

Domain: saltworks evaporation pans

Keys on: source files in a language it supports, found by walking the tree and
  matching extensions

Shape: real source, because this tool builds its data-flow view from parsed source.

Nothing to report on it: Bearer builds its data-flow view from parsed source. Walking this folder
  it enumerates two plain records and recognises neither as a parseable
  unit, so no flow graph is ever constructed.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
