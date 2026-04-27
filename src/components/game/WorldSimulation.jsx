import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@hooks';
import { Ending } from '../../game';
import { Button, SmallText, Title } from '../../styles';

const SimulationCard = ({ world, host }) => {
  const { worldText, t } = useI18n();

  const endingText = (ending, key) => {
    return t(`game.endings.${ending}.${key}`);
  };

  const milestoneText = (milestone) => {
    return t(`game.milestones.${milestone.name}`);
  };

  const simulationText = (key) => {
    return t(`game.simulation.${key}`);
  };

  const ended  = world.ending !== Ending.OnGoing;
  const style = {
    border: '1px solid #ccc',
    padding: 16,
    backgroundColor: ended ? '#9b9ecc' : '#d1e7dd',
    borderRadius: 5,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  };

  const titleStyle = {
    marginTop: 0,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  };
  
  if (ended) return (
    <div style={style}>
      <h3 style={titleStyle}>{worldText(world.name, 'name')} Simulation - Ended</h3>
      <SmallText>{simulationText('soul')}: {host.soul.name}</SmallText>
      <SmallText>{simulationText('resources_left')}: {world.resources}</SmallText>
      <SmallText>{simulationText('ending')}: {endingText(world.ending, 'title')}</SmallText>
      <SmallText>{endingText(world.ending, 'description')}</SmallText>
    </div>
  );
  
  return (
    <div style={style}>
      <h3 style={titleStyle}>{worldText(world.name, 'name')} Simulation</h3>
      <SmallText>{simulationText('soul')}: {host.soul.name}</SmallText>
      <SmallText>{simulationText('time_remaining')}: {world.endsAt - world.time}</SmallText>
      <SmallText>{simulationText('resources')}: {world.resources}</SmallText>
      <SmallText>{simulationText('milestone')}: {milestoneText(world.currentMilestone)}</SmallText>
    </div>
  );
};

const WorldSimulation = ({ controller, onDelete, onFinish, startSignal }) => {
  const [snapshot, setSnapshot] = useState(controller.getState());
  const [running, setRunning] = useState(false);
  const { worldText, buttonText } = useI18n();
  const loopRef = useRef(null);
  const previousStartSignalRef = useRef(startSignal);

  const stop = useCallback(() => {
    setRunning(false);
    if (loopRef.current) clearInterval(loopRef.current);
  }, []);

  const tick = useCallback(() => {
    controller.tick();
    setSnapshot(controller.getState());

    if (controller.isFinished()) {
      onFinish?.();
      stop();
    }
  }, [controller, onFinish, stop]);

  const start = useCallback(() => {
    if (running) return;

    setRunning(true);
    loopRef.current = setInterval(tick, 500);
  }, [running, tick]);

  const world = snapshot?.world;
  const host = snapshot?.host;

  useEffect(() => {
    if (previousStartSignalRef.current === startSignal) return;
    previousStartSignalRef.current = startSignal;

    if (!world || world.time !== 0) return;

    const timeoutId = window.setTimeout(() => {
      start();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [startSignal, start, world]);

  if (world.time === 0) {
    return (
      <div style={{ padding: 16, height: '100%', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <Title>{worldText(world.name, 'name')} Simulation</Title>

        <div style={{ marginBottom: 10, gap: 8, display: 'flex' }}>
          <Button onClick={start}>
            {buttonText('start_simulation')}
          </Button>
          <Button onClick={() => onDelete(controller)}>
            {buttonText('delete_simulation')}
          </Button>
        </div>
      </div>
    );
  }

  return (<SimulationCard world={world} host={host} />);
};

export default WorldSimulation;

