import { Trait } from '../enums';

export default class Traits {
  values: Trait[];

  constructor(
    has: Trait[]
  ) {
    this.values = has;
  }

  has(trait: Trait) {
    return this.values.includes(trait);
  }
}