// net mending gauges - minimal program, node20
const netMendingGaugesOpening20 = 41;

class NetMendingGaugesTally20 {
  readonly total = netMendingGaugesOpening20;

  summary(): string {
    return `net mending gauges: ${this.total}`;
  }
}

console.log(new NetMendingGaugesTally20().summary());
