// cider press pressings - minimal program, node20
const ciderPressPressingsOpening20 = 83;

class CiderPressPressingsTally20 {
  readonly total = ciderPressPressingsOpening20;

  summary(): string {
    return `cider press pressings: ${this.total}`;
  }
}

console.log(new CiderPressPressingsTally20().summary());
