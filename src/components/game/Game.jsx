import { useState } from 'react';
import { useI18n } from '@hooks';
import { localStorageService } from '@services';
import GameController from '../../game/controller';
import { Aren, Reo, Arianna, Jorge } from '../../game/instances/souls';
import { Arcania, Thalos, Veijo, Perito } from '../../game/instances/worlds';
import SelectionScreen from './SelectionScreen';
import WorldSimulation from './WorldSimulation';
import { Button, Subtitle } from '../../styles';
import { ControllerResult } from './sub-components';

const WORLD_CLASSES = [Arcania, Thalos, Veijo, Perito];
const SOUL_CLASSES = [Aren, Reo, Arianna, Jorge];

const Game = ({ onExit }) => {
  const { buttonText } = useI18n();
  const [controllers, setController] = useState([]);
  const [availableWorlds, setWorlds] = useState(WORLD_CLASSES.map((WorldClass) => new WorldClass()));
  const [availableSouls, setSouls] = useState(SOUL_CLASSES.map((SoulClass) => new SoulClass()));
  const [, setRefreshTick] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSimulationFinish = () => {
    setRefreshTick((value) => value + 1);
  };

  const saveResults = () => {
    const lastData = localStorageService.getElement('gameResults', []);

    localStorageService.saveElement('gameResults', [
      ...lastData,
      {
        date: new Date().toISOString(),
        result: controllers.reduce((acc, controller) => acc + controller.getScore().total, 0),
      },
    ]);
    setSaved(true);
  };

  const cleanUp = () => {
    setController([]);
    setWorlds(WORLD_CLASSES.map((WorldClass) => new WorldClass()));
    setSouls(SOUL_CLASSES.map((SoulClass) => new SoulClass()));
    setShowResults(false);
    setSaved(false);
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
    width: '100%',
    height: '100%',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const rightColumnStyle = {
    flex: 0.6,
    minWidth: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const resultsButtonStyle = {
    width: '100%',
    flexShrink: 0,
  };

  if (showResults) {
    if (!saved) saveResults();
    return (
      <div style={gameStyle}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Subtitle>All simulations have finished!</Subtitle>
          <ControllerResult controllers={controllers} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={cleanUp}>{buttonText('try_again')}</Button>
            <Button onClick={onExit}>{buttonText('go_back_to_menu')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={gameStyle}>
      <div style={selectionStyle}>
        <SelectionScreen
          worlds={availableWorlds}
          souls={availableSouls}
          onSelect={(world, soul) => createController(world, soul)}
        />
      </div>
      <div style={rightColumnStyle}>
        <div style={simulationStyle}>
          {
            controllers.map((controller, idx) => (
              <WorldSimulation
                key={idx}
                controller={controller}
                onDelete={(controller) => deleteController(controller)}
                onFinish={handleSimulationFinish}
              />
            ))
          }
        </div>
        {
          availableWorlds.length === 0 &&
          <Button
            style={resultsButtonStyle}
            disabled={controllers.some((c) => !c.isFinished())}
            onClick={() => setShowResults(true)}
          >
            {buttonText('see_the_results')}
          </Button>
        }
      </div>
    </div>
  );
};

export default Game;
