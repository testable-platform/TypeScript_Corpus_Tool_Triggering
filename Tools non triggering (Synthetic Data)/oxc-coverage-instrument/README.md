# oxc-coverage-instrument

Domain: honey pressing combs

Keys on: source files to instrument, plus a runner to execute them

Shape: no source, because this tool instruments for a runner that must then execute. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Instrumentation rewrites parsed source. With nothing parseable here the
  rewrite pass has an empty work list.

Expected: NOT TRIGGERED, no input discovered.
