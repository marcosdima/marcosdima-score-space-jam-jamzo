import { Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';

class ManaChargeEvent extends Event {
  constructor(world: World) {
    super('mana_charge', world, [State.Peace, State.Tension]);
  }

  trigger(host: Host) {
    super.trigger(host);
    host.applyGrowth(Stat.Intelligence, 2);
    host.applyGrowth(Stat.Mana, 5);
    this.world.consumeResources(1);
  }
}

export default ManaChargeEvent;