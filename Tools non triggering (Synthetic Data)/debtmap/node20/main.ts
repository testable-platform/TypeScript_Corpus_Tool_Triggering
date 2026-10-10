// hop kiln loads - minimal program, node20
const hopKilnLoadsOpening20 = 80;

class HopKilnLoadsTally20 {
  readonly total = hopKilnLoadsOpening20;

  summary(): string {
    return `hop kiln loads: ${this.total}`;
  }
}

console.log(new HopKilnLoadsTally20().summary());
