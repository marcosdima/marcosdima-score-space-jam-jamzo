import { Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, TrainingEvent } from '../events';


const thalosMilestones: Milestone[] = [
  new Milestone(
    'Train the vanguard',
    8,
    (host) => host.stats.values[Stat.Strength] + host.stats.values[Stat.Endurance] >= 28,
    (_host, world) => world.resources < 20 && world.time > 5,
  ),
  new Milestone(
    'Archive ancient tactics',
    14,
    (host) => host.stats.values[Stat.Intelligence] >= 20 && host.stats.values[Stat.Luck] >= 10,
    (_host, world) => world.resources < 10,
  ),
];

const thalos = new World(
  'Unite the citadels of Thalos',
  thalosMilestones,
  [],
  State.Tension,
  70,
);

thalos.eventPool = [
  new TrainingEvent(thalos),
  new StudyEvent(thalos),
];

export default thalos;
