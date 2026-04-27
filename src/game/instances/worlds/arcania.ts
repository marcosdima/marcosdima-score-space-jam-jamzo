import { Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, TrainingEvent } from '../events';

const arcaniaMilestones: Milestone[] = [
  new Milestone(
    'train_mana_arts',
    6,
    {
      completeRule: (host) =>
        host.stats.values[Stat.Strength] + host.stats.values[Stat.Intelligence] >=
        20,
      failRule: (_host, world) => world.resources < 20 && world.time > 5,
      completeEffect: (host, world) => (world.resources += 10),
      failEffect: (host, world) => (world.resources -= 10),
    },
  ),
  new Milestone(
    'stabilize_mana_flow',
    12,
    {
      completeRule: (host, world) => host.stats.values[Stat.Mana] >= 18,
      failRule: (_host, world) => world.resources < 15,
      completeEffect: (host, world) => (world.resources += 10),
      failEffect: (host, world) => (host.receiveDamage(100)),
    },
  ),
];

const arcania = new World('arcania', arcaniaMilestones, [], State.Peace, 85);

arcania.eventPool = [new TrainingEvent(arcania), new StudyEvent(arcania)];

export default arcania;
