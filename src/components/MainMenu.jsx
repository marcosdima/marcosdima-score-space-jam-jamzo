import { useI18n } from '@hooks';
import { useState } from 'react';
import { getUsername, saveUsername } from '@services';
import { MainMenuContainer, MainMenuContent, ButtonContainer, Button, Title, Text, TextInput } from '@styles';
import Game from './game/Game';
import Leaderboard from './LeaderBoard';

const MainMenu = () => {
  const { t } = useI18n();
  const [target, setTarget] = useState('');
  const [username, setUsername] = useState(() => getUsername());

  const comeBack = () => setTarget('');

  const handleSaveUsername = () => {
    const nextUsername = saveUsername(username);
    setUsername(nextUsername);
  };

  if (target === 'play') return (<Game onExit={comeBack} />);
  else if (target === 'leaderboard') return (<Leaderboard onExit={comeBack} />);

  return (
    <MainMenuContainer>
      <MainMenuContent>
        <Title>La Selección ⋆⋆⋆</Title>
        
        <ButtonContainer>
          <Button onClick={() => setTarget('play')}>
            {t('menu.play')}
          </Button>
          <Button onClick={() => setTarget('leaderboard')}>
            {t('menu.leaderboard')}
          </Button>
        </ButtonContainer>

        <div style={{ width: '100%', maxWidth: 420, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text style={{ flexShrink: 0 }}>{t('menu.username')}:</Text>
          <div style={{ display: 'flex', gap: 8, width: '100%', minWidth: 0 }}>
            <TextInput
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="User1234"
            />
            <Button onClick={handleSaveUsername} disabled={username.trim() === '' || username === getUsername()}>
              {t('buttons.save_username')}
            </Button>
          </div>
        </div>
      </MainMenuContent>
    </MainMenuContainer>
  );
};

export default MainMenu;
