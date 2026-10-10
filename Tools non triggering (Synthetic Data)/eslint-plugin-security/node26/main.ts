// ice house packings - minimal program, node26
const iceHousePackingsCarried26 = 103;

class IceHousePackingsRecord26 {
  readonly #total = iceHousePackingsCarried26;

  read(): string {
    return `ice house packings: ${this.#total}`;
  }
}

console.log(new IceHousePackingsRecord26().read());
