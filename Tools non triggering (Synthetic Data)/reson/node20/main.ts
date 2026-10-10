// flour bolting cloths - minimal program, node20
const flourBoltingClothsOpening20 = 134;

class FlourBoltingClothsTally20 {
  readonly total = flourBoltingClothsOpening20;

  summary(): string {
    return `flour bolting cloths: ${this.total}`;
  }
}

console.log(new FlourBoltingClothsTally20().summary());
