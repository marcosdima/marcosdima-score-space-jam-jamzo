import { useState } from 'react';
import GameController from '../../game/controller';
import { Aren, Reo } from '../../game/instances/souls';
import { arcania, thalos } from '../../game/instances/worlds';
import SelectionScreen from './SelectionScreen';
import WorldSimulation from './WorldSimulation';

const Game = () => {
  const [controllers, setController] = useState([]);
  const [availableWorlds, setWorlds] = useState([arcania, thalos]);
  const [availableSouls, setSouls] = useState([Aren, Reo]);
  
  const createController = (world, soul) => {
    const c = new GameController(world, soul);

    // Remove world and soul from available lists.
    setWorlds((prev) => prev.filter((w) => w !== world));
    setSouls((prev) => prev.filter((s) => s !== soul));

    // Add new controller to the list.
    setController((prev) => [...prev, c]);
  };

  return (
    <div style={{ padding: 16 }}>
      <SelectionScreen
        worlds={availableWorlds}
        souls={availableSouls}
        onSelect={(world, soul) => createController(world, soul)}
      />
      {
        controllers.map((controller, idx) => (
          <div key={idx} style={{ marginTop: 16 }}>
            <h2>Simulation {idx + 1}</h2>
            <WorldSimulation controller={controller} />
          </div>
        ))
      }
    </div>
  );
};

export default Game;
