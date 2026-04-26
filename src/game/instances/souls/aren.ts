import { Rarity } from '../../core/enums';
import { Potential, Stats, Traits } from '../../core/modules';
import Soul from '../../core/soul';

const Aren = new Soul(
  'Aren',
  new Potential(Rarity.Uncommon, Rarity.Common, Rarity.Uncommon),
  new Stats(8, 7, 9, 8, 6, 10),
  new Traits(true, false, false, false),
);

export default Aren;
