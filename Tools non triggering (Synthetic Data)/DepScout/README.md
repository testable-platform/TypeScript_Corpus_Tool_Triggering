# DepScout

Domain: rope walk strand counts

Keys on: the dependency block of package.json, which it ages against registry
  release dates

Shape: no source, because this tool ages declared versions; a program declares none. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Release-age alerting needs declared versions to age. Nothing here declares
  one, so the scout has no package to look up.

Expected: NOT TRIGGERED, no input discovered.
