import { Ending, State } from '../enums';
import Host from '../host';
import { Event } from './event';
import { Milestone } from './milestone';

type MilestoneState = 'pending' | 'complete' | 'failed';

export default class World {
  name: string;
  milestones: Map<Milestone, MilestoneState>;
  currentMilestone: Milestone;

  worldState: State;
  resources: number;
  trust: number;
  ending: Ending;

  time: number = 0;
  endsAt: number;

  eventPool: Event[];

  constructor(
    name: string,
    milestones: Milestone[],
    eventPool: Event[],
    initialState: State = State.Peace,
    initialResources: number = 100,
  ) {
    this.name = name;
    this.milestones = new Map(
      milestones.map((milestone) => [milestone, 'pending' as MilestoneState]),
    );
    this.eventPool = eventPool;
    this.worldState = initialState;
    this.resources = initialResources;
    this.ending = Ending.OnGoing;
    this.currentMilestone = milestones[0];
    this.endsAt = milestones[milestones.length - 1].deadline;
    this.trust = 100;
  }

  tick(host: Host) {
    // If the world has already reached an ending, do nothing.
    if (this.ending !== Ending.OnGoing) return;

    // Update state.
    this.updateState();

    // Advance time.
    this.time++;

    // Trigger a random event from the pool if possible.
    const event = this.getEvent();
    if (event) {
      event.trigger(host);
    }

    // Check milestones.
    const milestone = this.getCurrentMilestone();

    if (!milestone) {
      // NO more milestones means victory.
      this.ending = Ending.Victory;
    } else if (milestone.isCompleted(host, this)) {
      this.milestones.set(milestone, 'complete');
    } else if (milestone.isFailed(host, this)) {
      this.milestones.set(milestone, 'failed');
    }

    // Check death flags.
    if (this.resources <= 0) {
      this.ending = Ending.NotEnoughResources;
    } else if (host.isDead()) {
      this.ending = Ending.Killed;
    } else if (this.trust <= 0) {
      this.ending = Ending.Exiled;
    }
  }

  getEvent(): Event | null {
    const validEvents = this.eventPool.filter((event) => event.canTrigger());
    if (validEvents.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * validEvents.length);
    return validEvents[randomIndex];
  }

  getCurrentMilestone(): Milestone | null {
    for (const [milestone, state] of this.milestones.entries()) {
      if (state === 'pending') {
        this.currentMilestone = milestone;
        return milestone;
      }
    }
    return null;
  }

  updateState() {
    if (this.resources < 30 || this.time > (this.endsAt / 2)) {
      this.worldState = State.Tension;
    } else if (this.resources < 10 || this.time > (this.endsAt / 0.75)) {
      this.worldState = State.Conflict;
    }
  }

  consumeResources(amount: number) {
    this.resources = Math.max(0, this.resources - amount);
  }

  setEnding(ending: Ending) {
    this.ending = ending;
  }
}
