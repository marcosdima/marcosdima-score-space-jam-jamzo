import { Stat, State, Ending } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { HelpVillagers, ResearchEvent, StudyEvent } from '../events';

export default class Veijo extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'save_the_village',
        5,
        {
          completeRule: (host, world) => host.stats.values[Stat.Strength] >= 10, 
          failRule: (_host, world) => world.trust < 50,
          completeEffect: (host, world) => {
            world.resources += 10;
            world.trust += 20;
          },
          failEffect: (host, world) => {
            world.consumeResources(10);
            world.trust -= 20;
          },
        },
      ),
      new Milestone(
        'identify_pathogen',
        25,
        {
          completeRule: (host, world) => host.stats.values[Stat.Intelligence] >= 20,
          failRule: (_host, world) => world.trust < 30,
          completeEffect: (host, world) => {
            world.resources += 15;
            world.trust += 10;
          },
          failEffect: (host, world) => (world.setEnding(Ending.EveryoneDied)),
        },
      ),
      new Milestone(
        'cure_illness',
        45,
        {
          completeRule: (host, world) => host.stats.values[Stat.Intelligence] >= 40,
          completeEffect: (host, world) => (world.resources += 10),
          failEffect: (host, world) => (world.setEnding(Ending.EveryoneDied)),
        },
      ),
    ];

    super('veijo', milestones, [], State.Peace, 85);

    this.eventPool = [new ResearchEvent(this), new HelpVillagers(this), new StudyEvent(this)];
  }
}
