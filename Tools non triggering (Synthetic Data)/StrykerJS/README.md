# StrykerJS

Domain: tin smelting charges

Keys on: stryker.conf.* plus a test runner and mutable source files

Shape: no source, because this tool needs a test suite to re-run per mutant. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Mutation testing needs something to mutate and something to re-run. This
  folder supplies neither, so the initial test run that precedes mutation
  never starts.

Expected: NOT TRIGGERED, no input discovered.
