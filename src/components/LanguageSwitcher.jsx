import { useI18n } from '@hooks';
import { LanguageSwitcherContainer, LanguageButton, Text } from '@styles';

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();

  return (
    <LanguageSwitcherContainer>
      <LanguageButton $active={lang === 'en'} onClick={() => setLang('en')}>
        <Text>EN</Text>
      </LanguageButton>
      <LanguageButton $active={lang === 'es'} onClick={() => setLang('es')}>
        <Text>ES</Text>
      </LanguageButton>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher;
