# Grype

Domain: eel trap placements

Keys on: an SBOM, a lockfile, or a container image reference

Shape: no source, because this tool matches package coordinates from an SBOM or lockfile. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Grype matches package coordinates against advisories. No SBOM and no
  lockfile means no coordinates, and it has nothing to match.

Expected: NOT TRIGGERED, no input discovered.
