import { Stat, State } from '../../core/enums';
import Host from '../../core/host';
import { Event } from '../../core/world/event';
import World from '../../core/world/world';

class TrainingEvent extends Event {
  constructor(world: World) {
    super('training', world, [State.Peace, State.Tension]);
  }

  trigger(host: Host) {
    super.trigger(host);
    host.applyGrowth(Stat.Strength, 2);
    host.applyGrowth(Stat.Endurance, 1);
    this.world.resources = Math.max(0, this.world.resources - 2);
  }
}

export default TrainingEvent;