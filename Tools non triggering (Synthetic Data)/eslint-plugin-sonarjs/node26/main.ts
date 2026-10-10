// lime burning draws - minimal program, node26
const limeBurningDrawsCarried26 = 106;

class LimeBurningDrawsRecord26 {
  readonly #total = limeBurningDrawsCarried26;

  read(): string {
    return `lime burning draws: ${this.#total}`;
  }
}

console.log(new LimeBurningDrawsRecord26().read());
