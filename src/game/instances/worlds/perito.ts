import { Ending, Stat, State, Trait } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { StudyEvent, TrainingEvent } from '../events';

export default class Perito extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'search_for_clues',
        5,
        {
          completeRule: (host, world) => host.stats.values[Stat.Intelligence] >= 10 || host.hasTrait(Trait.Courious), 
          completeEffect: (host, world) => {
            world.resources += 10;
            world.trust += 20;
          },
          failEffect: (host, world) => (world.trust = 0),
        },
      ),
      new Milestone(
        'rescue_the_princess_dog',
        10,
        {
          completeRule: (host, world) => host.hasTrait(Trait.NatureHater),
          failRule: (host, world) => host.hasTrait(Trait.NatureLover),
          completeEffect: (host, world) => world.setEnding(Ending.DogDefeated),
          failEffect: (host, world) => {
            if (host.hasTrait(Trait.NatureLover)) world.setEnding(Ending.DefeatedByDog);
            else world.setEnding(Ending.DogDominatedTheWorld);
          },
        },
      ),
    ];

    super('perito', milestones, [], State.Peace, 85);

    this.eventPool = [new TrainingEvent(this), new StudyEvent(this)];
  }
}
