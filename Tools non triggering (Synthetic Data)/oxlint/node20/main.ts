// vinegar souring casks - minimal program, node20
const vinegarSouringCasksOpening20 = 125;

class VinegarSouringCasksTally20 {
  readonly total = vinegarSouringCasksOpening20;

  summary(): string {
    return `vinegar souring casks: ${this.total}`;
  }
}

console.log(new VinegarSouringCasksTally20().summary());
