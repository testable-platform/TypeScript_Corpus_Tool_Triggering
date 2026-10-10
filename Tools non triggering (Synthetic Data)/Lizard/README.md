# Lizard

Domain: charcoal burning stacks

Keys on: files whose extension maps to one of its seventeen tokenisers

Shape: real source, because this tool counts functions and complexity from its own tokeniser.

Nothing to report on it: Measured: lizard 1.24.1 run over this folder prints `0 file analyzed`. No
  extension here belongs to any tokeniser it carries, so the function
  table comes back empty.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
