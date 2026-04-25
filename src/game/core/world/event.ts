import { State } from "../enums";
import Host from "../host";
import World from "./world";

export class Event {
  name: string;
  world: World;
  works_with: State[];

  constructor(
    name: string,
    world: World,
    works_with: State[] = [State.Peace, State.Tension, State.Conflict],
  ) {
    this.name = name;
    this.world = world;
    this.works_with = works_with;
  }

  canTrigger(): boolean {
    return this.works_with.includes(this.world.state);
  }

  trigger(host: Host) {
    console.log('Event triggered: ', this.name, ' to host: ', host.soul.name);
  }
}