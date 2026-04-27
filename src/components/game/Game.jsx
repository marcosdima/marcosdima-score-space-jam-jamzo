import { useState } from 'react';
import GameController from '../../game/controller';
import { Aren, Reo, Arianna, Jorge  } from '../../game/instances/souls';
import { arcania, thalos, veijo, perito } from '../../game/instances/worlds';
import SelectionScreen from './SelectionScreen';
import WorldSimulation from './WorldSimulation';

const WORLDS = [arcania, thalos, veijo, perito];
const SOULS = [Aren, Reo, Arianna, Jorge];

const Game = () => {
  const [controllers, setController] = useState([]);
  const [availableWorlds, setWorlds] = useState([...WORLDS]);
  const [availableSouls, setSouls] = useState([...SOULS]);

  const createController = (world, soul) => {
    const c = new GameController(world, soul);

    // Remove world and soul from available lists.
    setWorlds((prev) => prev.filter((w) => w !== world));
    setSouls((prev) => prev.filter((s) => s !== soul));

    // Add new controller to the list.
    setController((prev) => [...prev, c]);
  };

  const deleteController = (controller) => {
    // Remove controller from the list.
    setController((prev) => prev.filter((c) => c !== controller));

    // Add world and soul back to available lists.
    setWorlds((prev) => [...prev, controller.getState().world]);
    setSouls((prev) => [...prev, controller.getState().host.soul]);
  };

  const gameStyle = {
    padding: 16,
    width: '100%',
    maxWidth: 1200,
    height: '82vh',
    minHeight: 560,
    alignItems: 'stretch',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ccc',
    borderRadius: 8,
    gap: 24,
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const selectionStyle = {
    flex: 1.4,
    minWidth: 0,
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    paddingRight: 4,
  };

  const simulationStyle = {
    flex: 0.6,
    minWidth: 0,
    height: '100%',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  return (
    <div style={gameStyle}>
      <div style={selectionStyle}>
        <SelectionScreen
          worlds={availableWorlds}
          souls={availableSouls}
          onSelect={(world, soul) => createController(world, soul)}
        />
      </div>
      <div style={simulationStyle}>
        {
          controllers.map((controller, idx) => (
            <WorldSimulation
              key={idx}
              controller={controller}
              onDelete={(controller) => deleteController(controller)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Game;
