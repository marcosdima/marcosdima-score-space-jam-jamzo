import { Ending, Stat, State } from '../../core/enums';
import { Milestone } from '../../core/world/milestone';
import World from '../../core/world/world';
import { Negotiation, Chat, Gamble } from '../events';

export default class Timbia extends World {
  constructor() {
    const milestones: Milestone[] = [
      new Milestone(
        'learn_language',
        10,
        {
          completeRule: (host) => host.sumStats([Stat.Intelligence, Stat.Charm]) > 15,
          completeEffect: (host, world) => (world.trust += 10),
          failEffect: (host, world) => (world.trust -= 10),
        },
      ),
      new Milestone(
        'gain_influence',
        14,
        {
          completeRule: (host) => host.getStat(Stat.Charm) > 10,
          failRule: (_host, world) => world.resources < 10,
          completeEffect: (host, world) => world.worldState = State.Tension,
          failEffect: (host, world) => (host.receiveDamage(100)),
        },
      ),
      new Milestone(
        'unite_factions',
        29,
        {
          completeRule: (host) => host.sumStats([Stat.Strength, Stat.Intelligence]) > 25,
          failRule: (_host, world) => world.resources < 20,
          completeEffect: (host, world) => (world.trust += 20),
          failEffect: (host, world) => world.setEnding(Ending.Exiled),
        },
      ),
    ];

    super('timbia', milestones, [], State.Peace, 70);

    this.eventPool = [new Chat(this), new Negotiation(this), new Gamble(this)];
  }
}
