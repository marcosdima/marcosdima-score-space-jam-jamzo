import { useRef, useState } from 'react';

const SimulationCard = ({ world, host }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
      <h3>{world.name} Simulation</h3>
      <p>Host Soul: {host.name}</p>
      <p>Time: {world.time}</p>
    </div>
  );
};

const WorldSimulation = ({ controller }) => {
  const [snapshot, setSnapshot] = useState(controller.getState());
  const [running, setRunning] = useState(false);

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

  return (
    <div style={{ padding: 16 }}>
      <h2>Arcania Simulation</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={start} disabled={running}>
          Start Simulation
        </button>
        <button onClick={stop} disabled={!running} style={{ marginLeft: 8 }}>
          Stop Simulation
        </button>
      </div>
      {running && <SimulationCard world={world} host={host} />}
    </div>
  );
};

export default WorldSimulation;

