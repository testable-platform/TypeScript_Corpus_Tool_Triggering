// ice house packings - minimal program, node20
const iceHousePackingsOpening20 = 89;

class IceHousePackingsTally20 {
  readonly total = iceHousePackingsOpening20;

  summary(): string {
    return `ice house packings: ${this.total}`;
  }
}

console.log(new IceHousePackingsTally20().summary());
