// net mending gauges - minimal program, node24
const netMendingGaugesReading24 = {
  carried: 52,
  total: 48,
};

const renderNetMendingGauges24 = (): string =>
  `net mending gauges holds ${netMendingGaugesReading24.total} of ${netMendingGaugesReading24.carried}`;

console.log(renderNetMendingGauges24());
