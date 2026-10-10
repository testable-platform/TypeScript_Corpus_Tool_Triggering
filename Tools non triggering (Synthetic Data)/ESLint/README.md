# ESLint

Domain: net mending gauges

Keys on: eslint.config.* or .eslintrc*, then files matching the configured
  extension globs

Shape: real source, because this tool lints parsed source.

Nothing to report on it: Measured: ESLint 10.1.0 run here exits reporting it could not find an
  eslint.config file. The lookup fails before any file is read, which is
  the clearest possible form of not firing.

Contents: one minimal program per boundary family (node12, node14, node20, node24, node26). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
