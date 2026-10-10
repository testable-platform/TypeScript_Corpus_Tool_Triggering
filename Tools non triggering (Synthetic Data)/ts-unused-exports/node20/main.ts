// cheese pressing moulds - minimal program, node20
const cheesePressingMouldsOpening20 = 140;

class CheesePressingMouldsTally20 {
  readonly total = cheesePressingMouldsOpening20;

  summary(): string {
    return `cheese pressing moulds: ${this.total}`;
  }
}

console.log(new CheesePressingMouldsTally20().summary());
