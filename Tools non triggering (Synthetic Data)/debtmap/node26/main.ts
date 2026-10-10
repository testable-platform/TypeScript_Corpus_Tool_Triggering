// hop kiln loads - minimal program, node26
const hopKilnLoadsCarried26 = 94;

class HopKilnLoadsRecord26 {
  readonly #total = hopKilnLoadsCarried26;

  read(): string {
    return `hop kiln loads: ${this.#total}`;
  }
}

console.log(new HopKilnLoadsRecord26().read());
