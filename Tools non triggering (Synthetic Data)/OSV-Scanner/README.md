# OSV-Scanner

Domain: wool fulling cycles

Keys on: a lockfile, an SBOM, or a directory containing manifests it recognises

Shape: no source, because this tool queries advisories for resolved packages, not for code. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Scanning this directory yields zero recognised inputs, so no querybatch is
  sent and no package count is produced.

Expected: NOT TRIGGERED, no input discovered.
