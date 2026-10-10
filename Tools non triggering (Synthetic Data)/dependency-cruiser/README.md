# dependency-cruiser

Domain: cider press pressings

Keys on: .dependency-cruiser.* plus an entry point from which to walk the module
  graph

Shape: real source, because this tool walks a module graph built from source.

Nothing to report on it: Measured: depcruise run here exits reporting it cannot open a config file
  at the default location. Without one it has neither rules nor an entry
  point.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
