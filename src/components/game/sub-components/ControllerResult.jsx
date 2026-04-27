import { useI18n } from '../../../hooks/i18n.js';
import { SmallText, Subtitle, Text } from '../../../styles';
import {
  ControllerResultCard,
  ControllerResultLayout,
  ControllerResultList,
} from '../../../styles/game/ControllerResult.styled.js';

const ControllerResult = ({ controllers }) => {
  const { worldText } = useI18n();
  return (
    <ControllerResultLayout>
      <Text>Lets calculate the results:</Text>

      <ControllerResultList>
        {controllers.map((controller, index) => {
          const { endingBonus, milestoneBonus, total } = controller.getScore();
          const { host, world } = controller.getState();

          return (
            <ControllerResultCard key={`${world.name}-${host.soul.name}-${index}`}>
              <Subtitle>
                {host.soul.name} in {worldText(world.name, 'name')}
              </Subtitle>
              <SmallText>Ending Bonus: {endingBonus}</SmallText>
              <SmallText>Milestone Bonus: {milestoneBonus}</SmallText>
              <SmallText>Total Score: {total}</SmallText>
            </ControllerResultCard>
          );
        })}
      </ControllerResultList>
      <Subtitle>Total: {controllers.reduce((acc, controller) => acc + controller.getScore().total, 0)}</Subtitle>
    </ControllerResultLayout>
  );
};

export default ControllerResult;
