import { Potential, Stats, Traits } from './modules';

export default class Soul {
  name: string;
  potential: Potential;
  stats: Stats;
  traits: Traits;

  constructor(
    name: string,
    potential: Potential,
    stats: Stats,
    traits: Traits,
  ) {
    this.name = name;
    this.potential = potential;
    this.stats = stats;
    this.traits = traits;
  }
}