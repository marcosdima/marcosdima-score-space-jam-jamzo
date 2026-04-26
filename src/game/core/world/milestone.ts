import Host from "../host";
import World from "./world";

export class Milestone {
  name: string;
  deadline: number;
  private completeRule: (host: Host, world: World) => boolean;
  private failRule: (host: Host, world: World) => boolean;
  private completeEffect?: (host: Host, world: World) => void;
  private failEffect?: (host: Host, world: World) => void;
  private spareTime: number;

  constructor(
    name: string,
    deadline: number,
    completeRule: (host: Host, world: World) => boolean = () => false,
    failRule: (host: Host, world: World) => boolean = () => false,
    completeEffect?: (host: Host, world: World) => void,
    failEffect?: (host: Host, world: World) => void
  ) {
    this.name = name;
    this.deadline = deadline;
    this.completeRule = completeRule;
    this.failRule = failRule;
    this.completeEffect = completeEffect;
    this.failEffect = failEffect;
    this.spareTime = 0;
  }

  isCompleted(host: Host, world: World): boolean {
    const completed = this.completeRule(host, world);

    if (completed) {
      this.spareTime = this.deadline - world.time;
      if (this.completeEffect) {
        this.completeEffect(host, world);
      }
    }

    return completed;
  }

  isFailed(host: Host, world: World): boolean {
    const ended = this.failRule(host, world) || world.time >= this.deadline;

    if (ended && this.failEffect) {
      this.failEffect(host, world);
    }

    return ended;
  }

  getSpareTime(): number {
    return this.spareTime;
  }
}