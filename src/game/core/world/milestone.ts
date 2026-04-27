import Host from "../host";
import World from "./world";

type MilestoneActions = {
  completeRule: (host: Host, world: World) => boolean;
  failRule?: (host: Host, world: World) => boolean;
  completeEffect?: (host: Host, world: World) => void;
  failEffect?: (host: Host, world: World) => void;
}

export class Milestone {
  name: string;
  deadline: number;
  private actions: MilestoneActions;
  private spareTime: number;

  constructor(
    name: string,
    deadline: number,
    actions: MilestoneActions,
  ) {
    this.name = name;
    this.deadline = deadline;
    
    this.actions = actions;
    this.spareTime = 0;
  }

  isCompleted(host: Host, world: World): boolean {
    const completed = this.actions.completeRule(host, world);

    if (completed) {
      this.spareTime = this.deadline - world.time;
      if (this.actions.completeEffect) {
        this.actions.completeEffect(host, world);
      }
    }

    return completed;
  }

  isFailed(host: Host, world: World): boolean {
    const ended = this.actions.failRule?.(host, world) || world.time >= this.deadline;

    if (ended && this.actions.failEffect) {
      this.actions.failEffect(host, world);
    }

    return ended;
  }

  getSpareTime(): number {
    return this.spareTime;
  }
}