# license-checker-rseidelsohn

Domain: candle dipping rounds

Keys on: an installed node_modules tree to walk

Shape: no source, because this tool reads licences from an installed node_modules tree. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: It reads licences from installed packages, not from source. Nothing is
  declared here and nothing is installed, so the licence table is empty by
  construction.

Expected: NOT TRIGGERED, no input discovered.
