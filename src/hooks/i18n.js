import { useState } from 'react';

const translations = {
  en: {
    menu: {
      play: 'Play',
      exit: 'Exit',
    },
    game: {
      worlds: {
        arcania: {
          name: 'Arcania',
          description: 'A world of magic and mystery.',
          mission: 'Restore the balance of magic.',
        },
        thalos: {
          name: 'Thalos',
          description: 'A world where the strong survive.',
          mission: 'Conquer the rival factions.',
        },
      },
      stats: {
        strength: 'Strength',
        agility: 'Agility',
        intelligence: 'Intelligence',
        endurance: 'Endurance',
        luck: 'Luck',
        mana: 'Mana',
      },
      traits: {
        obsessive: 'Obsessive',
        impulsive: 'Impulsive',
        reckless: 'Reckless',
        courious: 'Curious',
      },
      endings: {
        killed: {
          title: 'Killed',
          description: 'You were not strong enough to survive.',
        },
        exiled: {
          title: 'Exiled',
          description: 'You were not up to the challenge.',
        },
        not_enough_resources: {
          title: 'Not Enough Resources',
          description: 'You failed to gather the necessary resources to survive.',
        },
        victory: {
          title: 'Victory',
          description: 'Congratulations! You have triumphed in your mission.',
        },  
      },
    },
  },
  es: {
    menu: {
      play: 'Jugar',
      exit: 'Salir',
    },
    game: {
      worlds: {
        arcania: {
          name: 'Arcania',
          description: 'Un mundo de magia y misterio.',
          mission: 'Restaurar el equilibrio de la magia.',
        },
        thalos: {
          name: 'Thalos',
          description: 'Un mundo donde sobreviven los fuertes.',
          mission: 'Conquistar las facciones rivales.',
        },
      },
      stats: {
        strength: 'Fuerza',
        agility: 'Agilidad',
        intelligence: 'Inteligencia',
        endurance: 'Resistencia',
        luck: 'Suerte',
        mana: 'Maná',
      },
      traits: {
        obsessive: 'Obsesivo',
        impulsive: 'Impulsivo',
        reckless: 'Temerario',
        courious: 'Curioso',
      },
      endings: {
        killed: {
          title: 'Asesinado',
          description: 'No fuiste lo suficientemente fuerte para sobrevivir.',
        },
        exiled: {
          title: 'Exiliado',
          description: 'No estabas a la altura.',
        },
        not_enough_resources: {
          title: 'Recursos Insuficientes',
          description: 'No pudiste reunir los recursos necesarios para sobrevivir.',
        },
        victory: {
          title: 'Victoria',
          description: '¡Felicidades! Has triunfado en tu misión.',
        },
      },
    },
  },
};

export function useI18n(defaultLang = 'en') {
  const [lang, setLang] = useState(defaultLang);

  const t = (key) => {
    const parsedKey = key
      .split('.')
      .reduce((acc, part) => acc && acc[part], translations[lang]);

    if (!parsedKey) {
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
    }

    return parsedKey;
  };

  const worldText = (worldName, key) => {
    return t('game.worlds.' + worldName + '.' + key);
  };

  return { t, lang, setLang, worldText };
}
