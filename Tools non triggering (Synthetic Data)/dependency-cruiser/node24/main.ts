// cider press pressings - minimal program, node24
const ciderPressPressingsReading24 = {
  carried: 94,
  total: 90,
};

const renderCiderPressPressings24 = (): string =>
  `cider press pressings holds ${ciderPressPressingsReading24.total} of ${ciderPressPressingsReading24.carried}`;

console.log(renderCiderPressPressings24());
