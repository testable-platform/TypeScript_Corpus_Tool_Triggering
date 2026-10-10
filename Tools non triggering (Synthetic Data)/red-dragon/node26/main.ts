// herring salting barrels - minimal program, node26
const herringSaltingBarrelsCarried26 = 145;

class HerringSaltingBarrelsRecord26 {
  readonly #total = herringSaltingBarrelsCarried26;

  read(): string {
    return `herring salting barrels: ${this.#total}`;
  }
}

console.log(new HerringSaltingBarrelsRecord26().read());
