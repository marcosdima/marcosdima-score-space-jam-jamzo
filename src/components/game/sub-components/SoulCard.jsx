import { useI18n } from '../../../hooks/i18n';
import { Soul, Subtitle, Title, SmallText } from '../../../styles';

const Stats = ({ stats }) => {
  const { t } = useI18n();
  const statText = (stat) => {
    return `${t(`game.stats.${stat}`)}: ${stats.values[stat]}`;
  };

  const statsStyqle = {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
  };

  const statStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
    whiteSpace: 'nowrap',   
    flex: '0 1 auto',
  };

  return (
    <div>
      <Subtitle>{t('game.labels.stats')}</Subtitle>
      <div style={statsStyqle}>
        {
          Object.keys(stats.values).map((stat) => (
            <div key={stat} style={statStyle}>
              <SmallText>
                {statText(stat)}
              </SmallText>
            </div>
          ))
        }
      </div>  
    </div>
  );
};

const Traits = ({ traits }) => {
  const { t } = useI18n();
  const traitText = (trait) => {
    return t(`game.traits.${trait}`);
  };

  const traitsStyqle = {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  };

  const traitStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
    whiteSpace: 'nowrap',
    flex: '0 1 auto',
  };

  return (
    <div>
      <Subtitle>{t('game.labels.traits')}</Subtitle>
      <div style={traitsStyqle}>
        {
          traits.values.map((trait) => (
            <div key={trait} style={traitStyle}>
              <SmallText>{traitText(trait)}</SmallText>
            </div>
          ))
        }
      </div>
    </div>
  );
};

const SoulCard = ({ soul, selected = false }) => {
  return (
    <Soul $active={selected}>
      <Title>{soul.name}</Title>
      <Stats stats={soul.stats} />
      <Traits traits={soul.traits} />
    </Soul>
  );
};

export default SoulCard;
