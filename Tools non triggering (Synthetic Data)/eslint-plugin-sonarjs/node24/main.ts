// lime burning draws - minimal program, node24
const limeBurningDrawsReading24 = {
  carried: 103,
  total: 99,
};

const renderLimeBurningDraws24 = (): string =>
  `lime burning draws holds ${limeBurningDrawsReading24.total} of ${limeBurningDrawsReading24.carried}`;

console.log(renderLimeBurningDraws24());
