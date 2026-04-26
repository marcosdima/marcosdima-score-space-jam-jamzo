import { useI18n } from '@hooks';
import { useState } from 'react';
import {
  Button,
  EmptyState,
  OptionCard,
  Panel,
  SectionTitle,
  SelectionList,
  SelectionScreenLayout,
  SelectionTitle,
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
      <SelectionTitle>Revival Selection</SelectionTitle>

      <Panel>
        <SectionTitle>Available Worlds</SectionTitle>
        <SelectionList>
          {worlds.map((world, index) => (
            <OptionCard
              key={world.name + index}
              onClick={() => handleWorldSelect(world)}
              $active={selectedWorldName === world.name}
            >
              <div>
                <strong>{worldText(world.name, 'name')}</strong>
              </div>
              <div>Description: {worldText(world.name, 'description')}</div>
              <div>Mission: {worldText(world.name, 'mission')}</div>
              <div>Resources: {world.resources}</div>
            </OptionCard>
          ))}
        </SelectionList>
      </Panel>

      <Panel>
        <SectionTitle>Available Souls</SectionTitle>
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
      </Panel>

      <Panel>
        <Button
          disabled={!selectedWorldName || !selectedSoulName}
          onClick={handleConfirm}
        >
          Revive Selected Soul
        </Button>
      </Panel>
    </SelectionScreenLayout>
  );
};

export default SelectionScreen;
