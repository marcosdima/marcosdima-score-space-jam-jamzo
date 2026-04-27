import { useRef, useState } from 'react';
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

  const ended  = world.ending !== Ending.OnGoing;
  const style = {
    border: '1px solid #ccc',
    padding: 16,
    marginBottom: 16,
    backgroundColor: ended ? '#9b9ecc' : '#d1e7dd',
  };

  if (ended) return (
    <div style={style}>
      <h3>{worldText(world.name, 'name')} Simulation - Ended</h3>
      <SmallText>Soul: {host.soul.name}</SmallText>
      <SmallText>Resources Left: {world.resources}</SmallText>
      <SmallText>Ending: {endingText(world.ending, 'title')}</SmallText>
      <SmallText>{endingText(world.ending, 'description')}</SmallText>
    </div>
  );
  
  return (
    <div style={style}>
      <h3>{worldText(world.name, 'name')} Simulation</h3>
      <SmallText>Soul: {host.soul.name}</SmallText>
      <SmallText>Time Remaining: {world.endsAt - world.time}</SmallText>
      <SmallText>Resources: {world.resources}</SmallText>
      <SmallText>Milestone: {milestoneText(world.currentMilestone)}</SmallText>
    </div>
  );
};

const WorldSimulation = ({ controller, onDelete }) => {
  const [snapshot, setSnapshot] = useState(controller.getState());
  const [running, setRunning] = useState(false);
  const { worldText } = useI18n();
  const loopRef = useRef(null);

  const tick = () => {
    controller.tick();
    setSnapshot(controller.getState());

    if (controller.isFinished()) {
      stop();
    }
  };

  const start = () => {
    if (running) return;

    setRunning(true);
    loopRef.current = setInterval(tick, 500);
  };

  const stop = () => {
    setRunning(false);
    if (loopRef.current) clearInterval(loopRef.current);
  };

  const world = snapshot?.world;
  const host = snapshot?.host;

  if (world.time === 0) {
    return (
      <div style={{ padding: 16 }}>
        <Title>{worldText(world.name, 'name')} Simulation</Title>

        <div style={{ marginBottom: 10, gap: 8, display: 'flex' }}>
          <Button onClick={start}>
            Start Simulation
          </Button>
          <Button onClick={() => onDelete(controller)}>
            Delete Simulation
          </Button>
        </div>
      </div>
    );
  }

  return (<SimulationCard world={world} host={host} />);
};

export default WorldSimulation;

