import { useI18n } from '@hooks';
import { Button, Title } from '@styles';

const MainMenu = () => {
  const { t } = useI18n();

  return (
    <div className="main-menu">
      <Title>Score Jump Jam Jamzo</Title>
      <div>
        <Button>{t('menu.play')}</Button>
        <Button>{t('menu.exit')}</Button>
      </div>
    </div>
  );
};

export default MainMenu;
