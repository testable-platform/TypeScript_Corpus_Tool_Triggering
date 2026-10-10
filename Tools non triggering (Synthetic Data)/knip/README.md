# knip

Domain: bark tanning liquors

Keys on: knip.json together with the entry and project globs of package.json

Shape: no source, because this tool needs package.json entry and project globs to define a boundary. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Measured: knip run here reports it cannot find a package.json to read.
  Unused-export analysis needs a declared project boundary and there is
  none.

Expected: NOT TRIGGERED, no input discovered.
