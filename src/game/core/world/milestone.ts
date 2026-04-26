import Host from "../host";
import World from "./world";

export class Milestone {
  name: string;
  deadline: number;
  private completeRule: (host: Host, world: World) => boolean;
  private failRule: (host: Host, world: World) => boolean;
  private spareTime: number;

  constructor(
    name: string,
    deadline: number,
    completeRule: (host: Host, world: World) => boolean = () => false,
    failRule: (host: Host, world: World) => boolean = () => false,
  ) {
    this.name = name;
    this.deadline = deadline;
    this.completeRule = completeRule;
    this.failRule = failRule;
    this.spareTime = 0;
  }

  isCompleted(host: Host, world: World): boolean {
    const completed = this.completeRule(host, world);
    if (completed) {
      this.spareTime = this.deadline - world.time;
    }
    return completed;
  }


  isFailed(host: Host, world: World): boolean {
    return this.failRule(host, world) || world.time > this.deadline;
  }

  getSpareTime(): number {
    return this.spareTime;
  }
}