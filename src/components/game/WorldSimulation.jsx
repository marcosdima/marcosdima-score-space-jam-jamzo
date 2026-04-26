import { useRef, useState } from 'react';
import { useI18n } from '@hooks';
import { Ending } from '../../game';
import { Button } from '../../styles';

const SimulationCard = ({ world, host }) => {
  const { worldText } = useI18n();
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
      <h3>{worldText(world.name, 'name')} Simulation</h3>
      <p>Soul: {host.soul.name}</p>
      <p>Time: {world.time}</p>
      <p>Resources: {world.resources}</p>
      {
        world.ending === Ending.OnGoing 
          ? <p>Milestone: {world.currentMilestone.name}</p>
          : <p>Ending: {world.ending}</p>
      }
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
        <h2>{worldText(world.name, 'name')} Simulation</h2>

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

