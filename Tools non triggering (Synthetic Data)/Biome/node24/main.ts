// peat cutting allocations - minimal program, node24
const peatCuttingAllocationsReading24 = {
  carried: 40,
  total: 36,
};

const renderPeatCuttingAllocations24 = (): string =>
  `peat cutting allocations holds ${peatCuttingAllocationsReading24.total} of ${peatCuttingAllocationsReading24.carried}`;

console.log(renderPeatCuttingAllocations24());
