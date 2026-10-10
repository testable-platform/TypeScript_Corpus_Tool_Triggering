// reed cutting beds - minimal program, node26
const reedCuttingBedsCarried26 = 115;

class ReedCuttingBedsRecord26 {
  readonly #total = reedCuttingBedsCarried26;

  read(): string {
    return `reed cutting beds: ${this.#total}`;
  }
}

console.log(new ReedCuttingBedsRecord26().read());
