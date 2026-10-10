// dye vat batches - minimal program, node26
const dyeVatBatchesCarried26 = 73;

class DyeVatBatchesRecord26 {
  readonly #total = dyeVatBatchesCarried26;

  read(): string {
    return `dye vat batches: ${this.#total}`;
  }
}

console.log(new DyeVatBatchesRecord26().read());
