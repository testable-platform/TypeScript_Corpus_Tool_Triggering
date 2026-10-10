// dye vat batches - minimal program, node20
const dyeVatBatchesOpening20 = 59;

class DyeVatBatchesTally20 {
  readonly total = dyeVatBatchesOpening20;

  summary(): string {
    return `dye vat batches: ${this.total}`;
  }
}

console.log(new DyeVatBatchesTally20().summary());
