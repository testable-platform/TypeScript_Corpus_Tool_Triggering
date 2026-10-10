# TraceGraph

Domain: bell founding moulds

Keys on: an instrumented process emitting trace events at runtime

Shape: no source, because this tool assembles spans emitted by a running process. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Traces come from execution, not from files at rest. Nothing here executes,
  so no span is ever emitted for the graph to assemble.

Expected: NOT TRIGGERED, no input discovered.
