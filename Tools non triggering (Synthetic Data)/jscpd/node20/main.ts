// reed cutting beds - minimal program, node20
const reedCuttingBedsOpening20 = 101;

class ReedCuttingBedsTally20 {
  readonly total = reedCuttingBedsOpening20;

  summary(): string {
    return `reed cutting beds: ${this.total}`;
  }
}

console.log(new ReedCuttingBedsTally20().summary());
