// lime burning draws - minimal program, node20
const limeBurningDrawsOpening20 = 92;

class LimeBurningDrawsTally20 {
  readonly total = limeBurningDrawsOpening20;

  summary(): string {
    return `lime burning draws: ${this.total}`;
  }
}

console.log(new LimeBurningDrawsTally20().summary());
