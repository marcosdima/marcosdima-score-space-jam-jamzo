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
  const { worldText } = useI18n();

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
  };

  if (worlds.length === 0) {
    return <EmptyState>No worlds available for revival.</EmptyState>;
  }

  return (
    <SelectionScreenLayout>
      <Title>Revival Selection</Title>

      <SelectionSplitRow>
        <SelectionPanel>
          <Title>Available Worlds</Title>
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
                <Text>Mission: {worldText(world.name, 'mission')}</Text>
                <Text>Resources: {world.resources}</Text>
              </OptionCard>
            ))}
          </SelectionList>
        </SelectionPanel>

        <SelectionPanel>
          <Title>Available Souls</Title>
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
          Revive Selected Soul
        </Button>
      </ActionPanel>
    </SelectionScreenLayout>
  );
};

export default SelectionScreen;
