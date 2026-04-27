import { useEffect, useState, createContext, useContext, createElement } from 'react';
import { localStorageService } from '@services';

const translations = {
  en: {
    menu: {
      play: 'Play',
      leaderboard: 'Leaderboard',
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
        veijo: {
          name: 'Veijo',
          description: 'A virus is killing young people, it needs a cure NOW!',
          mission: 'Find a cure.',
        },
        perito: {
          name: 'Perito',
          description: 'The princess dog has been kidnapped!',
          mission: 'Save the princess dog.',
        },
      },
      stats: {
        strength: 'Strength',
        agility: 'Agility',
        intelligence: 'Intelligence',
        endurance: 'Endurance',
        luck: 'Luck',
        mana: 'Mana',
        charm: 'Charm',
      },
      traits: {
        obsessive: 'Obsessive',
        impulsive: 'Impulsive',
        reckless: 'Reckless',
        courious: 'Curious',
        weakwilled: 'Weakwilled',
        nature_hater: 'Nature Hater',
        nature_lover: 'Nature Lover',
        social_butterfly: 'Social Butterfly',
        loner: 'Loner',
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
        everyone_died: {
          title: 'Everyone Died',
          description: 'How could you save a world if there are no one to save?',
        },
        dog_defeated: {
          title: 'Dog Defeated',
          description: 'Who would suspect a dog... thank god you did.',
        },
        defeated_by_dog: {
          title: 'Defeated by Dog',
          description: 'You could not hurt a dog... sadly he could hurt you.',
        },
        dog_dominated_the_world: {
          title: 'Dog Dominated the World',
          description: 'No one expected the dog to be the real threat... If only you had distrusted dogs from the start.',
        },
      },
      milestones: {
        train_mana_arts: 'Train to master the arcane arts',
        stabilize_mana_flow: 'Stabilize the mana wells',
        search_for_clues: 'Search for clues about the virus',
        train_the_vanguard: 'Train the vanguard',
        kill_the_beast: 'Kill the shadow beast',
        rescue_the_princess_dog: 'Rescue the princess dog',
        find_a_cure: 'Find a cure',
        save_the_village: 'Save the village',
        identify_pathogen: 'Identify the pathogen',
        cure_illness: 'Cure the illness',
      },
    },
    leaderboard: {
      title: 'Leaderboard',
      date: 'Date',
      score: 'Score',
    },
    buttons: {
      go_back_to_menu: 'Go back to menu',
      clear_leaderboard: 'Clear leaderboard',
      revive_selected_soul: 'Revive selected soul',
      start_simulation: 'Start simulation',
      delete_simulaton: 'Delete simulation',
      see_the_results: 'See the results',
      try_again: 'Try again',
    },
  },
  es: {
    menu: {
      play: 'Jugar',
      leaderboard: 'Tabla de clasificación',
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
        veijo: {
          name: 'Veijo',
          description: 'Un virus está matando a los jóvenes ¡Necesitan una cura YA!',
          mission: 'Encuentra una cura.',
        },
        perito: {
          name: 'Perito',
          description: '¡El perro de la princesa ha sido secuestrado!',
          mission: 'Salva al perro de la princesa.',
        },
      },
      stats: {
        strength: 'Fuerza',
        agility: 'Agilidad',
        intelligence: 'Inteligencia',
        endurance: 'Resistencia',
        luck: 'Suerte',
        mana: 'Maná',
        charm: 'Carisma',
      },
      traits: {
        obsessive: 'Obsesivo',
        impulsive: 'Impulsivo',
        reckless: 'Temerario',
        courious: 'Curioso',
        weakwilled: 'Débil de voluntad',
        nature_lover: 'Amante de la naturaleza',
        nature_hater: 'Anti-naturaleza',
        social_butterfly: 'Extrovertido',
        loner: 'Solitario',
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
        everyone_died: {
          title: 'Todos Murieron',
          description: '¿Cómo podrías salvar un mundo si no hay nadie a quien salvar?',
        },
        dog_defeated: {
          title: 'Perro Derrotado',
          description: 'Quien sospecharía de un perro... solo vos por suerte.',
        },
        defeated_by_dog: {
          title: 'Derrotado por un Perro',
          description: 'No pudiste lastimar a un perro... lamentablemente él pudo lastimarte a vos.',
        },
        dog_dominated_the_world: {
          title: 'El Perro Dominó el Mundo',
          description: 'Nadie esperaba que el perro fuera la verdadera amenaza... Si tan solo hubieses desconfiado de los perros desde el principio.',
        },
      },
      milestones: {
        train_mana_arts: 'Entrenar para dominar las artes arcanas',
        stabilize_mana_flow: 'Estabilizar el flujo del maná',
        search_for_clues: 'Buscar pistas sobre el virus',
        train_the_vanguard: 'Entrenar a la vanguardia',
        kill_the_beast: 'Matar a la bestia',
        rescue_the_princess_dog: 'Rescatar al perro de la princesa',
        find_a_cure: 'Encontrar una cura',
        save_the_village: 'Salvar la aldea',
        identify_pathogen: 'Identificar el patógeno',
        cure_illness: 'Curar la enfermedad',
      },
    },
    leaderboard: {
      title: 'Tabla de clasificación',
      date: 'Fecha',
      score: 'Puntaje',
    },
    buttons: {
      go_back_to_menu: 'Volver al menú',
      clear_leaderboard: 'Limpiar tabla',
      revive_selected_soul: 'Revivir alma',
      start_simulation: 'Iniciar simulación',
      delete_simulaton: 'Eliminar simulación',
      see_the_results: 'Ver resultados',
      try_again: 'Intentar de nuevo',
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorageService.getElement('lang', 'en');

    return translations[savedLang] ? savedLang : 'en';
  });

  useEffect(() => {
    localStorageService.saveElement('lang', lang);
  }, [lang]);

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

  const buttonText = (buttonKey) => {
    return t('buttons.' + buttonKey);
  };

  return createElement(
    I18nContext.Provider,
    {
      value: {
        t,
        lang,
        setLang,
        worldText,
        buttonText,
      },
    },
    children,
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
