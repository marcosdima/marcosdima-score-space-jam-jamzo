import { Potential, Stat, Trait } from "./enums";
import { Stats } from "./modules";
import Soul from "./soul";

class Host {
  soul: Soul;
  stats: Stats;
  private health: number = 100;

  constructor(soul: Soul) {
    this.soul = soul;
    this.stats = soul.stats.copy();
    this.health = 100;
  }

  applyGrowth(
    target: Stat,
    amount: number,
    external_modifier: number = 1
  ) {
    // Check if the target stat has a corresponding potential type.
    const potential_type =
      Stats.isMagical(target)
        ? Potential.Magical
          : (
            Stats.isPhysical(target)
            ? Potential.Physical
              : (
                Stats.isMental(target)
                  ? Potential.Mental
                : null
              )
          );
    
    // Calculate the potential modifier based on the soul's potential.
    const potential_modifier = potential_type
      ? this.soul.potential.getPotentialModifier(potential_type)
      : 1;

    const growth = amount * external_modifier * potential_modifier;
    this.stats.modifyStat(target, Math.round(growth));
  }

  receiveDamage(amount: number) {
    this.health = Math.max(0, this.health - amount);
  }

  isDead() {
    return this.health <= 0;
  }

  hasTrait(trait: Trait) {
    return this.soul.traits.has(trait);
  }
}

export default Host;
