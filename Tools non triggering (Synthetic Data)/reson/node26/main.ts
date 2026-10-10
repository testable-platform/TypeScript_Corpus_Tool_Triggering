// flour bolting cloths - minimal program, node26
const flourBoltingClothsCarried26 = 148;

class FlourBoltingClothsRecord26 {
  readonly #total = flourBoltingClothsCarried26;

  read(): string {
    return `flour bolting cloths: ${this.#total}`;
  }
}

console.log(new FlourBoltingClothsRecord26().read());
