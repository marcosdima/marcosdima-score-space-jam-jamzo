import { useI18n } from '../../../hooks/i18n.js';
import { SmallText, Subtitle, Text } from '../../../styles';
import {
  ControllerResultCard,
  ControllerResultLayout,
  ControllerResultList,
} from '../../../styles/game/ControllerResult.styled.js';

const ControllerResult = ({ controllers }) => {
  const { worldText, t } = useI18n();
  const resultText = (key) => t(`game.result.${key}`);
  return (
    <ControllerResultLayout>
      <Text>{resultText('title')}</Text>

      <ControllerResultList>
        {controllers.map((controller, index) => {
          const { endingBonus, milestoneBonus, resourceBonus, total } = controller.getScore();
          const { host, world } = controller.getState();

          return (
            <ControllerResultCard key={`${world.name}-${host.soul.name}-${index}`}>
              <Subtitle>
                {host.soul.name} in {worldText(world.name, 'name')}
              </Subtitle>
              <SmallText>{resultText('ending_bonus')}: {endingBonus}</SmallText>
              <SmallText>{resultText('milestone_bonus')}: {milestoneBonus}</SmallText>
              <SmallText>{resultText('resource_bonus')}: {resourceBonus}</SmallText>
              <SmallText>{resultText('total_score')}: {total}</SmallText>
            </ControllerResultCard>
          );
        })}
      </ControllerResultList>
      <Subtitle>Total: {controllers.reduce((acc, controller) => acc + controller.getScore().total, 0)}</Subtitle>
    </ControllerResultLayout>
  );
};

export default ControllerResult;
