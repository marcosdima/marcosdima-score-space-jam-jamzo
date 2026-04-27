import { Ending, Stat, State, Trait } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';


class Weakland extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'overcome_fear',
        10,
        {
          completeRule: (host) => !host.hasTrait(Trait.PlainWeak),
          failEffect: (host, world) => world.setEnding(Ending.Baited),
        },
      ),
      new Milestone(
        'enjoy_your_life',
        30,
        {
          completeRule: (host, world) => world.time === 29,
          failRule: (host, world) => host.hasTrait(Trait.Hyperactive) && world.time > 10,
          completeEffect: (host, world) => world.setEnding(Ending.Chill),
          failEffect: (host, world) => world.setEnding(Ending.Boredom),
        },
      ),
    ];

    super('weakland', milestones, [], State.Peace, 50);

    // No events for this world
    this.eventPool = [];
  }
}

export default Weakland;