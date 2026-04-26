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
