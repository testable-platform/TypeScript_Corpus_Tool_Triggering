// peat cutting allocations - minimal program, node20
const peatCuttingAllocationsOpening20 = 29;

class PeatCuttingAllocationsTally20 {
  readonly total = peatCuttingAllocationsOpening20;

  summary(): string {
    return `peat cutting allocations: ${this.total}`;
  }
}

console.log(new PeatCuttingAllocationsTally20().summary());
