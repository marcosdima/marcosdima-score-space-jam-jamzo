import { useState } from 'react';

const lightTheme = {
  colors: {
    primary: '#697565',
    secondary: '#3C3D37',

    bg: '#ECDFCC',
    surface: '#ffffff',

    text: '#181C14',
    textMuted: '#3C3D37',

    hover: '#A9B18F',
  },

  typography: {
    font: '\'Roboto Mono\', monospace',
    size: {
      small: '12px',
      medium: '16px',
      large: '24px',
    },
  },
};

const darkTheme = {
  colors: {
    primary: '#697565',
    secondary: '#3C3D37',

    bg: '#181C14',
    surface: '#3C3D37',

    text: '#ECDFCC',
    textMuted: '#697565',

    hover: '#697565',
  },

  typography: {
    font: '\'Roboto Mono\', monospace',
    size: {
      small: '12px',
      medium: '16px',
      large: '24px',
    },
  },
};
 
const useTheme = () => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return { theme, toggleTheme };
};

export { useTheme };
