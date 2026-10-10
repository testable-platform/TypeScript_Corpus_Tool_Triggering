// herring salting barrels - minimal program, node24
const herringSaltingBarrelsReading24 = {
  carried: 142,
  total: 138,
};

const renderHerringSaltingBarrels24 = (): string =>
  `herring salting barrels holds ${herringSaltingBarrelsReading24.total} of ${herringSaltingBarrelsReading24.carried}`;

console.log(renderHerringSaltingBarrels24());
