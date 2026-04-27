import { Ending } from './core/enums';
import Host from './core/host';
import Soul from './core/soul';
import World from './core/world/world';

const GOOD_ENDING_BONUS: Partial<Record<Ending, number>> = {
  [Ending.Victory]: 500,
  [Ending.DogDefeated]: 400,
  [Ending.DogDominatedTheWorld]: 300,
  [Ending.SeventeenBlack]: 17,
  [Ending.Chill]: 200,
  [Ending.Baited]: 1,
};

class GameController {
  private world: World;
  private host: Host;

  constructor(world: World, soul: Soul) {
    this.world = world;
    this.host = new Host(soul);
  }

  tick() {
    this.world.tick(this.host);
  }

  isFinished() {
    return this.world.ending !== Ending.OnGoing;
  }

  getScore() {
    const endingBonus = GOOD_ENDING_BONUS[this.world.ending] ?? 0;

    const milestoneBonus = Array.from(this.world.milestones.entries()).reduce(
      (total, [milestone, state]) => {
        if (state !== 'complete') {
          return total;
        }

        return total + milestone.getSpareTime();
      },
      0,
    );

    const resourceBonus = Math.max(0, (this.world.resources - 50) * 1.5);

    return {
      endingBonus,
      milestoneBonus,
      resourceBonus,
      total: Math.round(endingBonus + milestoneBonus + resourceBonus),
    };
  }

  getState() {
    return {
      world: this.world,
      host: this.host,
      score: this.getScore(),
    };
  }
}

export default GameController;
