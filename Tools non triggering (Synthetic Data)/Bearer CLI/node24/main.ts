// saltworks evaporation pans - minimal program, node24
const saltworksEvaporationPansReading24 = {
  carried: 37,
  total: 33,
};

const renderSaltworksEvaporationPans24 = (): string =>
  `saltworks evaporation pans holds ${saltworksEvaporationPansReading24.total} of ${saltworksEvaporationPansReading24.carried}`;

console.log(renderSaltworksEvaporationPans24());
