import { Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';

class Spar extends Event {
  constructor(world: World) {
    super('spar', world, [State.Tension]);
  }

  trigger(host: Host) {
    super.trigger(host);
    
    // Weakwilled trait cause damage.
    if (host.hasTrait(Trait.Weakwilled)) {
      host.receiveDamage(30);
    } else if (host.hasTrait(Trait.Impulsive)) {
      host.receiveDamage(15);
    } else if (host.hasTrait(Trait.Reckless)) {
      host.receiveDamage(100);
    }

    // If the host is dead, do not apply growth or consume resources.
    if (host.isDead()) {
      return;
    }

    host.applyGrowth(Stat.Strength, 3);
    host.applyGrowth(Stat.Agility, 1);
    host.applyGrowth(Stat.Endurance, 2);
    this.world.consumeResources(1);
  }
}

export default Spar;