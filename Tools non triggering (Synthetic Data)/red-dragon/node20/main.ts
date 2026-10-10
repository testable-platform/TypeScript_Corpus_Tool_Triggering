// herring salting barrels - minimal program, node20
const herringSaltingBarrelsOpening20 = 131;

class HerringSaltingBarrelsTally20 {
  readonly total = herringSaltingBarrelsOpening20;

  summary(): string {
    return `herring salting barrels: ${this.total}`;
  }
}

console.log(new HerringSaltingBarrelsTally20().summary());
