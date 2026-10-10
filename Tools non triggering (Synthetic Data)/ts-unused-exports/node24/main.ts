// cheese pressing moulds - minimal program, node24
const cheesePressingMouldsReading24 = {
  carried: 151,
  total: 147,
};

const renderCheesePressingMoulds24 = (): string =>
  `cheese pressing moulds holds ${cheesePressingMouldsReading24.total} of ${cheesePressingMouldsReading24.carried}`;

console.log(renderCheesePressingMoulds24());
