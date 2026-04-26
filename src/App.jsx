import { useTheme } from '@hooks';
import { Base } from '@styles';
import { ThemeProvider } from 'styled-components';
import Game from './components/game/Game';

const App = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Base>
        <Game />
      </Base>
    </ThemeProvider>
  );
};

export default App;
