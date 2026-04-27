import { Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, ManaChargeEvent } from '../events';

export default class Arcania extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'train_mana_arts',
        14,
        {
          completeRule: (host) =>
            host.stats.values[Stat.Mana] + host.stats.values[Stat.Intelligence] >=
            20,
          failRule: (_host, world) => world.resources < 20 && world.time > 5,
          completeEffect: (host, world) => (world.resources += 10),
          failEffect: (host, world) => (world.resources -= 10),
        },
      ),
      new Milestone(
        'stabilize_mana_flow',
        20,
        {
          completeRule: (host, world) => host.stats.values[Stat.Mana] >= 18,
          failRule: (_host, world) => world.resources < 15,
          completeEffect: (host, world) => (world.resources += 10),
          failEffect: (host, world) => (host.receiveDamage(100)),
        },
      ),
    ];

    super('arcania', milestones, [], State.Peace, 85);

    this.eventPool = [new StudyEvent(this), new ManaChargeEvent(this)];
  }
}
