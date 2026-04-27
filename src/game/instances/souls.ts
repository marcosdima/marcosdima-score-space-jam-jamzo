import { Rarity, Trait } from '../core/enums';
import { Potential, Stats, Traits } from '../core/modules';
import Soul from '../core/soul';

export class Aren extends Soul {
  constructor() {
    super(
      'Aren',
      new Potential(Rarity.Uncommon, Rarity.Common, Rarity.Uncommon),
      new Stats(8, 7, 9, 8, 6, 10),
      new Traits([Trait.Reckless])
    );
  }
}


export class Reo extends Soul {
  constructor() {
    super(
      'Reo',
      new Potential(Rarity.Common, Rarity.Legendary, Rarity.Common),
      new Stats(1, 3, 4, 5, 6, 7),
      new Traits([Trait.Loner])
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

export class Laura extends Soul {
  constructor() {
    super(
      'Laura',
      new Potential(Rarity.Rare, Rarity.Common, Rarity.Rare),
      new Stats(
        2,  // Strength.
        9,  // Agility.
        7,  // Intelligence.
        3,  // Endurance.
        8,  // Luck.
        4,  // Mana.
        10,  // Charm.
      ),
      new Traits([Trait.Impulsive]),
    );
  }
}

export class Max extends Soul {
  constructor() {
    super(
      'Max',
      new Potential(Rarity.Legendary, Rarity.Common, Rarity.Rare),
      new Stats(
        9,  // Strength.
        4,  // Agility.
        3,  // Intelligence.
        10,  // Endurance.
        2,  // Luck.
        5,  // Mana.
        1,  // Charm.
      ),
      new Traits([Trait.Hyperactive]),
    );
  }
}