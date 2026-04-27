import { useState } from 'react';
import { useI18n } from '@hooks';
import { saveScore } from '@services';
import GameController from '../../game/controller';
import { Aren, Reo, Arianna, Jorge, Laura, Max } from '../../game/instances/souls';
import { Arcania, Thalos, Veijo, Perito, Timbia, Weakland } from '../../game/instances/worlds';
import SelectionScreen from './SelectionScreen';
import WorldSimulation from './WorldSimulation';
import { Button, Subtitle } from '../../styles';
import { ControllerResult } from './sub-components';

const WORLD_CLASSES = [Arcania, Thalos, Veijo, Perito, Timbia, Weakland]
  .sort(() => Math.random() - 0.5);
const SOUL_CLASSES = [Aren, Reo, Arianna, Jorge, Laura, Max]
  .sort(() => Math.random() - 0.5); ;

const Game = ({ onExit }) => {
  const { buttonText, t } = useI18n();

  // Game logic states.
  const [controllers, setController] = useState([]);
  const [availableWorlds, setWorlds] = useState(WORLD_CLASSES.map((WorldClass) => new WorldClass()));
  const [availableSouls, setSouls] = useState(SOUL_CLASSES.map((SoulClass) => new SoulClass()));
  const [, setRefreshTick] = useState(0);

  // Late game results.
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);
  const [startAllSignal, setStartAllSignal] = useState(0);

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
    const totalScore = controllers.reduce((acc, controller) => acc + controller.getScore().total, 0);
    saveScore(totalScore);
    setSaved(true);
  };

  const cleanUp = () => {
    setController([]);
    setWorlds(WORLD_CLASSES.map((WorldClass) => new WorldClass()));
    setSouls(SOUL_CLASSES.map((SoulClass) => new SoulClass()));
    setShowResults(false);
    setSaved(false);
  };

  const startAllSimulations = () => {
    if (controllers.length === 0) return;

    const hasNotStartedSimulations = controllers.some((controller) => controller.getState().world.time === 0);

    if (!hasNotStartedSimulations) return;

    setStartAllSignal((prev) => prev + 1);
  };

  const hasAvailableSelections = availableWorlds.length > 0;

  const gameStyle = {
    padding: 16,
    width: '100%',
    maxWidth: 1200,
    height: '82vh',
    minHeight: 560,
    alignItems: 'stretch',
    justifyContent: hasAvailableSelections ? 'center' : 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ccc',
    borderRadius: 8,
    gap: hasAvailableSelections ? 24 : 0,
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
    flex: 1,
    minHeight: 0,
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const simulationGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  };

  const rightColumnStyle = {
    flex: hasAvailableSelections ? 0.6 : 1,
    minWidth: 0,
    height: '100%',
    width: hasAvailableSelections ? 'auto' : '100%',
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
          <Subtitle>{t('game.labels.all_simulations_finished')}</Subtitle>
          <ControllerResult controllers={controllers} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={cleanUp}>{buttonText('try_again')}</Button>
            <Button onClick={onExit}>{buttonText('go_back_to_menu')}</Button>
          </div>
        </div>
      </div>
    );
  }

  const allFinished = controllers.every((c) => c.isFinished());

  return (
    <div>
      <div style={gameStyle}>
        {hasAvailableSelections && (
          <div style={selectionStyle}>
            <SelectionScreen
              worlds={availableWorlds}
              souls={availableSouls}
              onSelect={(world, soul) => createController(world, soul)}
            />
          </div>
        )}
        <div style={rightColumnStyle}>
          <div style={simulationStyle}>
            <div style={simulationGridStyle}>
              {
                controllers.map((controller, idx) => (
                  <div
                    key={idx}
                    style={{
                      minWidth: 0,
                      minHeight: 0,
                      padding: 0,
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: hasAvailableSelections ? '100%' : 320,
                      height: hasAvailableSelections ? 'auto' : 320,
                      flex: hasAvailableSelections ? '0 0 auto' : '0 0 320px',
                    }}
                  >
                    <WorldSimulation
                      controller={controller}
                      onDelete={(controller) => deleteController(controller)}
                      onFinish={handleSimulationFinish}
                      startSignal={startAllSignal}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          {
            availableWorlds.length === 0 && allFinished && controllers.length !== 0
              ? <Button
                style={resultsButtonStyle}
                onClick={() => setShowResults(true)}
              >
                {buttonText('see_the_results')}
              </Button>
              : <Button
                onClick={startAllSimulations}
                disabled={allFinished}
              >
                {buttonText('start_all')}
              </Button>
          }
        </div>
      </div>
      {
        availableWorlds.length > 0 &&
        <Button
          onClick={onExit}
          style={{ width: '100%', paddingTop: 8 }}
        >
          {buttonText('go_back_to_menu')}
        </Button>
      }
    </div>
  );
};

export default Game;
