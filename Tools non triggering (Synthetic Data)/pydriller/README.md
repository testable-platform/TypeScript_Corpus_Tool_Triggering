# pydriller

Domain: sausage curing chambers

Keys on: the repository's own commit history

Shape: no source, because this tool iterates the repository's commits, not a directory. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: pydriller opens the repository and iterates commits; a directory inside it
  is not a filter on that. The folder's guarantee is narrower: it
  introduces no modification churn to be counted.

Expected: NOT TRIGGERED, no input discovered.
