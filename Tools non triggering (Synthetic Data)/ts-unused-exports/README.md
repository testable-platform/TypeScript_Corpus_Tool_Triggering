# ts-unused-exports

Domain: cheese pressing moulds

Keys on: a tsconfig.json listing the files it should check

Shape: real source, because this tool checks exports across a set of source files.

Nothing to report on it: Measured: run here it exits reporting the tsconfig file could not be
  found. The file list it would check is never assembled.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
