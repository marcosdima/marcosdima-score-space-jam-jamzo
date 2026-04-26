import { useState } from 'react';
import {
  Button,
  EmptyState,
  OptionCard,
  Panel,
  SectionTitle,
  SelectionScreenLayout,
  SelectionTitle,
  SoulsList,
} from '../../styles';
import { SoulCard } from './sub-components';

const SelectionScreen = ({ worlds, souls, onSelect }) => {
  const [selectedWorldName, setSelectedWorldName] = useState('');
  const [selectedSoulName, setSelectedSoulName] = useState('');

  const handleSelect = (soul) => {
    setSelectedSoulName(soul.name);
  };

  const handleWorldSelect = (world) => {
    setSelectedWorldName(world.mission);
  };

  const handleConfirm = () => {
    const world = worlds.find((w) => w.mission === selectedWorldName);
    const soul = souls.find((s) => s.name === selectedSoulName);
    if (!world || !soul) return;

    onSelect(world, soul);
  };

  if (worlds.length === 0) {
    return <EmptyState>No worlds available for revival.</EmptyState>;
  }

  return (
    <SelectionScreenLayout>
      <SelectionTitle>REVIVAL SELECTION</SelectionTitle>

      <Panel>
        <SectionTitle>Available Worlds</SectionTitle>
        {worlds.map((world, index) => (
          <OptionCard
            key={world.mission + index}
            onClick={() => handleWorldSelect(world)}
            $active={selectedWorldName === world.mission}
          >
            <div>
              <strong>{world.mission}</strong>
            </div>
            <div>Resources: {world.resources}</div>
          </OptionCard>
        ))}
      </Panel>

      <Panel>
        <SectionTitle>Available Souls</SectionTitle>

        <SoulsList>
          {souls.map((soul, index) => (
            <OptionCard
              key={soul.name + index}
              onClick={() => handleSelect(soul)}
              $active={selectedSoulName === soul.name}
            >
              <SoulCard soul={soul} selected={selectedSoulName === soul.name} />
            </OptionCard>
          ))}
        </SoulsList>
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
