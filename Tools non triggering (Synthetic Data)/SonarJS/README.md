# SonarJS

Domain: glass annealing ramps

Keys on: a Sonar project configuration plus an analysable source set

Shape: no source, because this tool the analyzer engine needs a Sonar server and project key. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: No sonar-project.properties means no project key, and no analysable source
  means nothing to submit even if one existed.

Expected: NOT TRIGGERED, no input discovered.
