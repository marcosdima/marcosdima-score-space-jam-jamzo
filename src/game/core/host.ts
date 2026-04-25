import { Potential, Stat } from "./enums";
import { Stats } from "./modules";
import Soul from "./soul";

class Host {
  soul: Soul;
  stats: Stats;

  constructor(soul: Soul) {
    this.soul = soul;
    this.stats = soul.stats.copy();
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
}

export default Host;
