import { Rarity } from '../../core/enums';
import { Potential, Stats, Traits } from '../../core/modules';
import Soul from '../../core/soul';

const Reo = new Soul(
  'Reo',
  new Potential(Rarity.Common, Rarity.Legendary, Rarity.Common),
  new Stats(1, 3, 4, 5, 6, 7),
  new Traits(true, false, false, false),
);

export default Reo;
