import { Ending, Stat, State, Trait } from '../../../core/enums';
import Host from '../../../core/host';
import { Event } from '../../../core/world/event';
import World from '../../../core/world/world';


class Gamble extends Event {
  constructor(world: World) {
    super('gamble', world, [State.Tension]);
  }

  trigger(host: Host) {
    super.trigger(host);

    const hostLuck = host.stats.getStat(Stat.Luck);

    if (host.hasTrait(Trait.Impulsive)) {
      this.world.setEnding(Ending.SeventeenBlack);  
      return;
    }
    else if (hostLuck < 5) {
      this.world.resources = 0;
      this.world.setEnding(Ending.Bankruptcy);
      return;
    } else if (hostLuck < 10) {
      this.world.resources = Math.floor(this.world.resources / 2);
      this.world.trust -= 20;
      return;
    }

    this.world.trust -= 10;
    this.world.resources *= (1.5 + hostLuck / 20);
  }
}

export default Gamble;