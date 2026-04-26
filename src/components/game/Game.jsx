import { useRef, useState } from 'react';
import { Ending } from '../../game/core/enums';
import Host from '../../game/core/host';
import { Aren } from '../../game/instances/souls';
import arcania from '../../game/instances/worlds/arcania';

const Game = () => {
  const [world, setWorld] = useState(null);
  const [host, setHost] = useState(null);
  const [running, setRunning] = useState(false);

  const loopRef = useRef(null);

  const init = () => {
    const w = arcania;
    const h = new Host(Aren);

    setWorld(w);
    setHost(h);
    setRunning(false);
  };

  const tick = () => {
    if (!world || !host) return;

    world.tick(host);

    if (world.ending != Ending.OnGoing) {
      stop();
    }

    setWorld({ ...world });
    setHost({ ...host });
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

  return (
    <div style={{ padding: 16 }}>
      <h2>Arcania Simulation</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={init}>Init</button>
        <button onClick={start} disabled={!world || running}>
          Start
        </button>
        <button onClick={stop}>Stop</button>
      </div>

      {world && host && (
        <>
          <div>Time: {world.time}</div>
          <div>State: {world.state}</div>
          <div>Resources: {world.resources}</div>

          <h3>Soul</h3>
          <div>{host.soul.name}</div>

          <h3>Stats</h3>
          <pre>{JSON.stringify(host.stats.values, null, 2)}</pre>

          <h3>Current Milestone</h3>
          <div>
            {world.currentMilestone?.name ?? 'Completed'}
          </div>
          <h3>Ending</h3>
          <div>{world.ending}</div>
        </>
      )}
    </div>
  );
};

export default Game;
