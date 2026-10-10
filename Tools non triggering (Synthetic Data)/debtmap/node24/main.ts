// hop kiln loads - minimal program, node24
const hopKilnLoadsReading24 = {
  carried: 91,
  total: 87,
};

const renderHopKilnLoads24 = (): string =>
  `hop kiln loads holds ${hopKilnLoadsReading24.total} of ${hopKilnLoadsReading24.carried}`;

console.log(renderHopKilnLoads24());
