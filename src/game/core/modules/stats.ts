import { Stat } from '../enums';

const MIN = 0;
const MAX = 99;

export default class Stats {
  values: Record<Stat, number>;

  constructor(
    strength: number = 0,
    agility: number = 0,
    intelligence: number = 0,
    endurance: number = 0,
    luck: number = 0,
    mana: number = 0,
  ) {
    this.values = {
      [Stat.Strength]: strength,
      [Stat.Agility]: agility,
      [Stat.Intelligence]: intelligence,
      [Stat.Endurance]: endurance,
      [Stat.Luck]: luck,
      [Stat.Mana]: mana,
    };
  }

  copy() {
    return new Stats(
      this.values[Stat.Strength],
      this.values[Stat.Agility],
      this.values[Stat.Intelligence],
      this.values[Stat.Endurance],
      this.values[Stat.Luck],
      this.values[Stat.Mana],
    );
  }

  modifyStat(stat: Stat, amount: number) {
    this.values[stat] = Math.max(
      MIN,
      Math.min(this.values[stat] + amount, MAX)
    );
  }

  getStat(stat: Stat): number {
    return this.values[stat];
  }

  static isPhysical(stat: Stat): boolean {
    return [Stat.Strength, Stat.Agility, Stat.Endurance].includes(stat);
  }

  static isMagical(stat: Stat): boolean {
    return [Stat.Mana].includes(stat);
  }

  static isMental(stat: Stat): boolean {
    return [Stat.Intelligence].includes(stat);
  }
}