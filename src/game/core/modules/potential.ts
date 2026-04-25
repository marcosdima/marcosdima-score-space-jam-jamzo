import { Potential as PotentialKey, Rarity } from "../enums";

export default class Potential {
  values: Record<PotentialKey, Rarity>;

  constructor(
    magical = Rarity.Common,
    physical = Rarity.Common,
    mental = Rarity.Common,
  ) {
    this.values = {
      [PotentialKey.Magical]: magical,
      [PotentialKey.Physical]: physical,
      [PotentialKey.Mental]: mental,
    };
  }

  getPotentialModifier(key: PotentialKey): number {
    const rarity = this.values[key];
    switch (rarity) {
      case Rarity.Common:
        return 1;
      case Rarity.Uncommon:
        return 1.1;
      case Rarity.Rare:
        return 1.25;
      case Rarity.Epic:
        return 1.5;
      case Rarity.Legendary:
        return 2;
      default:
        return 1;
    }
  }
}