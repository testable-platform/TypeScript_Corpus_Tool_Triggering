# CVE Lite CLI

Domain: kiln drying schedules

Keys on: the direct dependency block of package.json, or a lockfile when one exists

Shape: no source, because this tool resolves a dependency set; a program declares none. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: With neither manifest nor lockfile there is no dependency set to resolve,
  so the advisory lookup has an empty input and is never issued.

Expected: NOT TRIGGERED, no input discovered.
