import { Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';

class ResearchEvent extends Event {
  constructor(world: World) {
    super('research', world, [State.Peace]);
  }

  trigger(host: Host) {
    super.trigger(host);

    const mod = host.hasTrait(Trait.Loner)
      ? 0.7
      : (
        host.hasTrait(Trait.SocialButterfly)
          ? 1.5
          : 1
      );

    host.applyGrowth(Stat.Intelligence, 1, mod);
    host.applyGrowth(Stat.Charm, 1, mod);

    this.world.trust += 1 * mod;
  }
}

export default ResearchEvent;