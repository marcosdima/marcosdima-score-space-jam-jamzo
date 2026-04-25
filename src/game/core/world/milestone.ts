import Host from "../host";
import World from "./world";

export class Milestone {
  name: string;
  deadline: number;

  constructor(
    name: string,
    deadline: number,
  ) {
    this.name = name;
    this.deadline = deadline;
  }

  isCompleted(host: Host, world: World): boolean {
    return false;
  }

  isFailed(host: Host, world: World): boolean {
    return false;
  }
}