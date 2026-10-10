// reed cutting beds - minimal program, node24
const reedCuttingBedsReading24 = {
  carried: 112,
  total: 108,
};

const renderReedCuttingBeds24 = (): string =>
  `reed cutting beds holds ${reedCuttingBedsReading24.total} of ${reedCuttingBedsReading24.carried}`;

console.log(renderReedCuttingBeds24());
