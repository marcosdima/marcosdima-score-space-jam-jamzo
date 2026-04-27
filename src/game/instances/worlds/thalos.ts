import { Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, TrainingEvent } from '../events';

export default class Thalos extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'train_the_vanguard',
        8,
        {
          completeRule: (host) =>
          host.stats.values[Stat.Strength] + host.stats.values[Stat.Endurance] >=
          28,
          failRule: (_host, world) => world.resources < 20 && world.time > 5,
          completeEffect: (host, world) => (world.resources += 10),
          failEffect: (host, world) => (host.receiveDamage(100)),
        },
      ),
      new Milestone(
        'kill_the_beast',
        14,
        {
          completeRule: (host) =>
            host.stats.values[Stat.Strength] >= 20 &&
            host.stats.values[Stat.Luck] >= 10,
          failRule: (_host, world) => world.resources < 10,
          completeEffect: (host, world) => (world.resources += 10),
          failEffect: (host, world) => (host.receiveDamage(100)),
        },
      ),
    ];

    super('thalos', milestones, [], State.Tension, 70);

    this.eventPool = [new TrainingEvent(this), new StudyEvent(this)];
  }
}
