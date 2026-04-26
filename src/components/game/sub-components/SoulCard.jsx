import { Soul } from '../../../styles';

const Stats = ({ stats }) => {
  return (
    <div>
      <h4>Stats</h4>
      <pre>{JSON.stringify(stats.values, null, 2)}</pre>
    </div>
  );
};

const SoulCard = ({ soul, selected = false }) => {
  return (
    <Soul $active={selected}>
      <label>{soul.name}</label>
      <Stats stats={soul.stats} />
    </Soul>
  );
};

export default SoulCard;
