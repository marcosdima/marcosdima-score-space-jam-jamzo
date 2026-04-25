import { State } from "../enums";
import Host from "../host";
import { Event } from "./event";
import { Milestone } from "./milestone";

export default class World {
  mission: string;

  milestones: Milestone[];
  currentMilestoneIndex: number = 0;

  state: State; // "peace" | "tension" | "war"
  resources: number; // 0–100

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
    this.state = initialState;
    this.resources = initialResources;
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
      return "complete";
    }

    if (milestone.isFailed(host, this) || this.time > milestone.deadline) {
      return "fail";
    }

    return "pending";
  }

  updateState() {
    if (this.resources < 30 || this.time > 10) {
      this.state = State.Tension;
    }

    if (this.resources < 10 || this.time > 20) {
      this.state = State.Conflict;
    }
  }
}