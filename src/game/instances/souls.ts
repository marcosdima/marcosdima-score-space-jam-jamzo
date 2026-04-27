import { Rarity, Trait } from '../core/enums';
import { Potential, Stats, Traits } from '../core/modules';
import Soul from '../core/soul';

export class Aren extends Soul {
  constructor() {
    super(
      'Aren',
      new Potential(Rarity.Uncommon, Rarity.Common, Rarity.Uncommon),
      new Stats(8, 7, 9, 8, 6, 10),
      new Traits([Trait.Courious])
    );
  }
}


export class Reo extends Soul {
  constructor() {
    super(
      'Reo',
      new Potential(Rarity.Common, Rarity.Legendary, Rarity.Common),
      new Stats(1, 3, 4, 5, 6, 7),
      new Traits([Trait.Impulsive])
    );
  }
}

export class Arianna extends Soul {
  constructor() {
    super(
      'Arianna',
      new Potential(Rarity.Rare, Rarity.Rare, Rarity.Rare),
      new Stats(
        1,  // Strength.
        3,  // Agility.
        10,  // Intelligence.
        2,  // Endurance.
        6,  // Luck.
        6,  // Mana.
        15,  // Charm.
      ),
      new Traits([Trait.SocialButterfly, Trait.NatureLover]),
    );
  }
}

export class Jorge extends Soul {
  constructor() {
    super(
      'Jorge',
      new Potential(Rarity.Common, Rarity.Rare, Rarity.Legendary),
      new Stats(
        10,  // Strength.
        8,  // Agility.
        2,  // Intelligence.
        9,  // Endurance.
        4,  // Luck.
        1,  // Mana.
        3,  // Charm.
      ),
      new Traits([Trait.Courious]),
    );
  }
}