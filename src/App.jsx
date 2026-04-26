import { useTheme } from '@hooks';
import { Base } from '@styles';
import { ThemeProvider } from 'styled-components';
import Game from './game/game';

const App = () => {
  const { theme } = useTheme();
  console.log('Current theme:', theme);
  return (
    <ThemeProvider theme={theme}>
      <Base>
        <Game />
      </Base>
    </ThemeProvider>
  );
};

export default App;
