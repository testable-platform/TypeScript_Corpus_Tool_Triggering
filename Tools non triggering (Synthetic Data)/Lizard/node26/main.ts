// charcoal burning stacks - minimal program, node26
const charcoalBurningStacksCarried26 = 64;

class CharcoalBurningStacksRecord26 {
  readonly #total = charcoalBurningStacksCarried26;

  read(): string {
    return `charcoal burning stacks: ${this.#total}`;
  }
}

console.log(new CharcoalBurningStacksRecord26().read());
