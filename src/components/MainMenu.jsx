import { useI18n } from '@hooks';
import { MainMenuContainer, MainMenuContent, ButtonContainer, Button, Title } from '@styles';
import { useState } from 'react';
import Game from './game/Game';
import Leaderboard from './LeaderBoard';

const MainMenu = () => {
  const { t } = useI18n();
  const [target, setTarget] = useState('');

  const comeBack = () => setTarget('');

  if (target === 'play') return (<Game onExit={comeBack} />);
  else if (target === 'leaderboard') return (<Leaderboard onExit={comeBack} />);

  return (
    <MainMenuContainer>
      <MainMenuContent>
        <Title>Score Jump Jam Jamzo</Title>
        <ButtonContainer>
          <Button onClick={() => setTarget('play')}>
            {t('menu.play')}
          </Button>
          <Button onClick={() => setTarget('leaderboard')}>
            {t('menu.leaderboard')}
          </Button>
        </ButtonContainer>
      </MainMenuContent>
    </MainMenuContainer>
  );
};

export default MainMenu;
