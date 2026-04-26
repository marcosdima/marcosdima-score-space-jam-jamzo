import { Rarity, Trait } from '../core/enums';
import { Potential, Stats, Traits } from '../core/modules';
import Soul from '../core/soul';

export const Aren = new Soul(
  'Aren',
  new Potential(Rarity.Uncommon, Rarity.Common, Rarity.Uncommon),
  new Stats(8, 7, 9, 8, 6, 10),
  new Traits([Trait.Courious]),
);


export const Reo = new Soul(
  'Reo',
  new Potential(Rarity.Common, Rarity.Legendary, Rarity.Common),
  new Stats(1, 3, 4, 5, 6, 7),
  new Traits([Trait.Impulsive]),
);