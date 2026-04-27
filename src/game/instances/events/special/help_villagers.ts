import { Ending, Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';

class HelpVillagers extends Event {
  constructor(world: World) {
    super('help_villagers', world, [State.Peace]);
  }

  trigger(host: Host) {
    super.trigger(host);
    this.world.trust += 20;
    this.world.resources += 15;
  }
}

export default HelpVillagers;