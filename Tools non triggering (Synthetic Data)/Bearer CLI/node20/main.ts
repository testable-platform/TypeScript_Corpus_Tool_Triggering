// saltworks evaporation pans - minimal program, node20
const saltworksEvaporationPansOpening20 = 26;

class SaltworksEvaporationPansTally20 {
  readonly total = saltworksEvaporationPansOpening20;

  summary(): string {
    return `saltworks evaporation pans: ${this.total}`;
  }
}

console.log(new SaltworksEvaporationPansTally20().summary());
