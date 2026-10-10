// cider press pressings - minimal program, node26
const ciderPressPressingsCarried26 = 97;

class CiderPressPressingsRecord26 {
  readonly #total = ciderPressPressingsCarried26;

  read(): string {
    return `cider press pressings: ${this.#total}`;
  }
}

console.log(new CiderPressPressingsRecord26().read());
