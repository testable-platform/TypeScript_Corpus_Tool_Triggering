// charcoal burning stacks - minimal program, node20
const charcoalBurningStacksOpening20 = 50;

class CharcoalBurningStacksTally20 {
  readonly total = charcoalBurningStacksOpening20;

  summary(): string {
    return `charcoal burning stacks: ${this.total}`;
  }
}

console.log(new CharcoalBurningStacksTally20().summary());
