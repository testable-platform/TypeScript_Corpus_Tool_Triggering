// saltworks evaporation pans - minimal program, node26
const saltworksEvaporationPansCarried26 = 40;

class SaltworksEvaporationPansRecord26 {
  readonly #total = saltworksEvaporationPansCarried26;

  read(): string {
    return `saltworks evaporation pans: ${this.#total}`;
  }
}

console.log(new SaltworksEvaporationPansRecord26().read());
