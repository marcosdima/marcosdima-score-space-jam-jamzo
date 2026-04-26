import { Ending } from './core/enums';
import Host from './core/host';
import Soul from './core/soul';
import World from './core/world/world';

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

  getState() {
    return {
      world: this.world,
      host: this.host,
    };
  }
}

export default GameController;
