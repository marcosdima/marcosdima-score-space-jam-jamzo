import { useRef, useState } from 'react';
import GameController from '../../game/controller';
import { Aren } from '../../game/instances/souls';
import arcania from '../../game/instances/worlds/arcania';

const Game = () => {
  const [controller, setController] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [running, setRunning] = useState(false);

  const loopRef = useRef(null);

  const init = () => {
    const c = new GameController(arcania, Aren);

    setController(c);
    setSnapshot(c.getState());
    setRunning(false);
  };

  const tick = () => {
    if (!controller) return;

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
        <button onClick={init}>Init</button>
        <button onClick={start} disabled={!controller || running}>
          Start
        </button>
        <button onClick={stop}>Stop</button>
      </div>

      {world && host && (
        <>
          <div>Time: {world.time}</div>
          <div>State: {world.worldState}</div>
          <div>Resources: {world.resources}</div>

          <h3>Soul</h3>
          <div>{host.soul.name}</div>

          <h3>Stats</h3>
          <pre>{JSON.stringify(host.stats.values, null, 2)}</pre>

          <h3>Current Milestone</h3>
          <div>
            {world.getCurrentMilestone()?.name ?? 'Completed'}
          </div>
          <h3>Ending</h3>
          <div>{world.ending}</div>
        </>
      )}
    </div>
  );
};

export default Game;
