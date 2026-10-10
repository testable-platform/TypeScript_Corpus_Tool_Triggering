// ice house packings - minimal program, node24
const iceHousePackingsReading24 = {
  carried: 100,
  total: 96,
};

const renderIceHousePackings24 = (): string =>
  `ice house packings holds ${iceHousePackingsReading24.total} of ${iceHousePackingsReading24.carried}`;

console.log(renderIceHousePackings24());
