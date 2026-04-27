import { useI18n } from '@hooks';
import { useState } from 'react';
import {
  ActionPanel,
  Button,
  Text,
  Title,
  EmptyState,
  OptionCard,
  SelectionList,
  SelectionPanel,
  SelectionScreenLayout,
  SelectionSplitRow,
} from '../../styles';
import { SoulCard } from './sub-components';

const SelectionScreen = ({ worlds, souls, onSelect }) => {
  const [selectedWorldName, setSelectedWorldName] = useState('');
  const [selectedSoulName, setSelectedSoulName] = useState('');
  const { worldText, buttonText, t } = useI18n();

  const handleSelect = (soul) => {
    setSelectedSoulName(
      selectedSoulName === soul.name ? '' : soul.name,
    );
  };

  const handleWorldSelect = (world) => {
    setSelectedWorldName(
      selectedWorldName === world.name ? '' : world.name,
    );
  };

  const handleConfirm = () => {
    const world = worlds.find((w) => w.name === selectedWorldName);
    const soul = souls.find((s) => s.name === selectedSoulName);
    if (!world || !soul) return;

    onSelect(world, soul);
    setSelectedSoulName('');
    setSelectedWorldName('');
  };

  if (worlds.length === 0) {
    return <EmptyState>{t('game.labels.no_worlds_available')}</EmptyState>;
  }

  return (
    <SelectionScreenLayout>
      <Title>{t('game.labels.revival_selection')}</Title>

      <SelectionSplitRow>
        <SelectionPanel>
          <Title>{t('game.labels.available_worlds')}</Title>
          <SelectionList>
            {worlds.map((world, index) => (
              <OptionCard
                key={world.name + index}
                onClick={() => handleWorldSelect(world)}
                $active={selectedWorldName === world.name}
              >
                <div>
                  <Title>{worldText(world.name, 'name')}</Title>
                </div>
                <Text>{worldText(world.name, 'description')}</Text>
                <Text>{t('game.labels.mission')}: {worldText(world.name, 'mission')}</Text>
                <Text>{t('game.labels.resources')}: {world.resources}</Text>
              </OptionCard>
            ))}
          </SelectionList>
        </SelectionPanel>

        <SelectionPanel>
          <Title>{t('game.labels.available_souls')}</Title>
          <SelectionList>
            {souls.map((soul, index) => (
              <OptionCard
                key={soul.name + index}
                onClick={() => handleSelect(soul)}
                $active={selectedSoulName === soul.name}
              >
                <SoulCard soul={soul} selected={selectedSoulName === soul.name} />
              </OptionCard>
            ))}
          </SelectionList>
        </SelectionPanel>
      </SelectionSplitRow>

      <ActionPanel>
        <Button
          disabled={!selectedWorldName || !selectedSoulName}
          onClick={handleConfirm}
        >
          {buttonText('revive_selected_soul')}
        </Button>
      </ActionPanel>
    </SelectionScreenLayout>
  );
};

export default SelectionScreen;
