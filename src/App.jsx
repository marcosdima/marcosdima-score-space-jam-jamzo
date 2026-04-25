import { useTheme } from '@hooks';
import { Base } from '@styles';
import { ThemeProvider } from 'styled-components';
import MainMenu from './components/MainMenu';


const App = () => {
  const { theme } = useTheme();
  console.log('Current theme:', theme);
  return (
    <ThemeProvider theme={theme}>
      <Base>
        <MainMenu />
      </Base>
    </ThemeProvider>
  );
};

export default App;
