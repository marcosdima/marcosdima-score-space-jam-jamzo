import { Ending, State } from "../enums";
import Host from "../host";
import { Event } from "./event";
import { Milestone } from "./milestone";

export default class World {
  mission: string;

  milestones: Milestone[];
  currentMilestoneIndex: number = 0;
  milestoneRecord: { [milestoneName: string]: "complete" | "fail" } = {};

  worldState: State;
  resources: number;
  ending: Ending;

  time: number = 0;

  eventPool: Event[];

  constructor(
    mission: string,
    milestones: Milestone[],
    eventPool: Event[],
    initialState: State = State.Peace,
    initialResources: number = 100
  ) {
    this.mission = mission;
    this.milestones = milestones;
    this.eventPool = eventPool;
    this.worldState = initialState;
    this.resources = initialResources;
    this.ending = Ending.OnGoing;
  }

  tick(host: Host) {
    this.time++;

    const event = this.getEvent();
    if (event) {
      event.trigger(host);
    }

    this.updateState();
  }

  getEvent(): Event | null {
    const validEvents = this.eventPool.filter((event) => event.canTrigger());
    if (validEvents.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * validEvents.length);
    return validEvents[randomIndex];
  }

  getCurrentMilestone(): Milestone | null {
    return this.milestones[this.currentMilestoneIndex] ?? null;
  }

  checkMilestone(host: Host): "complete" | "fail" | "pending" {
    const milestone = this.getCurrentMilestone();
    if (!milestone) return "complete";

    if (milestone.isCompleted(host, this)) {
      this.currentMilestoneIndex++;
      this.milestoneRecord[milestone.name] = "complete";
      return "complete";
    }

    if (milestone.isFailed(host, this) || this.time > milestone.deadline) {
      this.milestoneRecord[milestone.name] = "fail";
      return "fail";
    }

    return "pending";
  }

  updateState() {
    if (this.resources < 30 || this.time > 10) {
      this.worldState = State.Tension;
    }

    if (this.resources < 10 || this.time > 20) {
      this.worldState = State.Conflict;
    }
  }

  consumeResources(amount: number) {
    this.resources = Math.max(0, this.resources - amount);
  }
}