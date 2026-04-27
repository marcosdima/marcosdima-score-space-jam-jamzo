import { useTheme, I18nProvider } from '@hooks';
import { Base } from '@styles';
import { ThemeProvider } from 'styled-components';
import MainMenu from './components/MainMenu';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <I18nProvider>
        <LanguageSwitcher />
        <Base>
          <MainMenu />
        </Base>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
