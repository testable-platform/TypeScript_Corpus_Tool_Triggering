# ts-morph

Domain: grist milling stones

Keys on: a tsconfig.json project, or explicit source file paths handed to it

Shape: real source, because this tool operates on source files handed to it directly.

Nothing to report on it: Its Project object is constructed from a tsconfig. There is none here, and
  no path in this folder would be accepted as a source file if one were
  supplied.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
