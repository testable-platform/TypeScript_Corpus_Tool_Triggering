// dye vat batches - minimal program, node24
const dyeVatBatchesReading24 = {
  carried: 70,
  total: 66,
};

const renderDyeVatBatches24 = (): string =>
  `dye vat batches holds ${dyeVatBatchesReading24.total} of ${dyeVatBatchesReading24.carried}`;

console.log(renderDyeVatBatches24());
