// grist milling stones - minimal program, node24
const gristMillingStonesReading24 = {
  carried: 148,
  total: 144,
};

const renderGristMillingStones24 = (): string =>
  `grist milling stones holds ${gristMillingStonesReading24.total} of ${gristMillingStonesReading24.carried}`;

console.log(renderGristMillingStones24());
