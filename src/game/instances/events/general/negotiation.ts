import { Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';

class NegotiationEvent extends Event {
  constructor(world: World) {
    super('negotiation', world, [State.Peace]);
  }

  trigger(host: Host) {
    super.trigger(host);

    if (host.getStat(Stat.Charm) > 12) {
      this.world.trust += 2;
      this.world.resources += 5;
    } else if (host.getStat(Stat.Intelligence) > 8) {
      this.world.trust += 1;
    } else {
      this.world.trust -= 10;
    }
  }
}

export default NegotiationEvent;