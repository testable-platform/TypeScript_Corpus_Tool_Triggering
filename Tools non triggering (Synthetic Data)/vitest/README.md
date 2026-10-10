# vitest

Domain: butter churning paddles

Keys on: vitest.config.* together with files matching its test name globs

Shape: no source, because this tool collects files matching a test glob, then runs them. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: No config and no file matching a test glob. Vitest exits having collected
  zero test files, which is a collection result, not a pass.

Expected: NOT TRIGGERED, no input discovered.
