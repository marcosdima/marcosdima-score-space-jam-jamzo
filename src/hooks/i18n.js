import { useState } from 'react';

const translations = {
  en: {
    'menu': {
      'play': 'Play',
      'exit': 'Exit',
    },
  },
  es: {
    'menu': {
      'play': 'Jugar',
      'exit': 'Salir',
    },
  },
};

export function useI18n(defaultLang = 'en') {
  const [lang, setLang] = useState(defaultLang);

  const t = (key) => {
    const parsedKey = key.split('.').reduce((acc, part) => acc && acc[part], translations[lang]);
    
    if (!parsedKey) {
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
    }

    return parsedKey;
  };

  return { t, lang, setLang };
}
