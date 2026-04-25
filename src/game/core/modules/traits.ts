import { Trait } from '../../enums';

export default class Traits {
  values: Record<Trait, boolean>;

  constructor(
    courious: boolean = false,
    impulsive: boolean = false,
    reckless: boolean = false,
    obsessive: boolean = false,
  ) {
    this.values = {
      [Trait.Courious]: courious,
      [Trait.Impulsive]: impulsive,
      [Trait.Reckless]: reckless,
      [Trait.Obsessive]: obsessive,
    };
  }

  has(trait: Trait) {
    return this.values[trait];
  }
}