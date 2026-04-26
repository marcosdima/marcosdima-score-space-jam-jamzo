import { Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, TrainingEvent } from '../events';


const arcaniaMilestones: Milestone[] = [
  new Milestone(
    'Train to master the arcane arts',
    6,
    (host) => host.stats.values[Stat.Strength] + host.stats.values[Stat.Intelligence] >= 20,
  ),
  new Milestone(
    'Stabilize the mana wells',
    12,
    (host, world) => host.stats.values[Stat.Mana] >= 18,
    (_host, world) => world.resources < 15,
  ),
];

const arcania = new World(
  'Restore balance to Arcania',
  arcaniaMilestones,
  [],
  State.Peace,
  85,
);

arcania.eventPool = [
  new TrainingEvent(arcania),
  new StudyEvent(arcania),
];

export default arcania;
