// grist milling stones - minimal program, node20
const gristMillingStonesOpening20 = 137;

class GristMillingStonesTally20 {
  readonly total = gristMillingStonesOpening20;

  summary(): string {
    return `grist milling stones: ${this.total}`;
  }
}

console.log(new GristMillingStonesTally20().summary());
