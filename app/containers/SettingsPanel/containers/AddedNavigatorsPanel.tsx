import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { InterventionNavigator } from 'models/NavigatorSetup';
// import minus from 'assets/svg/grey-minus.svg';

import Box from 'components/Box';
import H3 from 'components/H3';
import Text from 'components/Text';
import Row from 'components/Row';
// import Img from 'components/Img';
import UserAvatar from 'components/UserAvatar';

// import { TextButton } from 'components/Button';
import messages from '../messages';

const SINGLE_ITEM_HEIGHT = 60;
const ITEM_MARGIN = 8;

type Props = {
  interventionNavigators: InterventionNavigator[];
  removeInterventionNavigator: (interventionNavigatorId: string) => void;
};

const AddedNavigatorPanel = ({
  interventionNavigators,
  removeInterventionNavigator,
}: Props) => {
  const { formatMessage } = useIntl();

  console.log(removeInterventionNavigator);

  return (
    <Box>
      <H3 mb={30}>{formatMessage(messages.navigatorsAddedToIntervention)}</H3>
      {interventionNavigators.length === 0 && (
        <Text color={colors.grey}>
          {formatMessage(messages.noAddedNavigators)}
        </Text>
      )}
      {interventionNavigators.map(
        ({ id, avatarUrl, email, firstName, lastName }, index) => (
          <Row
            justify="between"
            align="center"
            background={colors.lightBlue}
            padding={12}
            key={id}
            maxHeight={SINGLE_ITEM_HEIGHT}
            mt={index === 0 ? 0 : ITEM_MARGIN}
          >
            <Row align="center">
              <UserAvatar
                height={32}
                width={32}
                avatar={avatarUrl || ''}
                firstName={firstName}
                lastName={lastName}
              />
              <Box ml={16}>
                <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
                <Text>{email}</Text>
              </Box>
            </Row>
            {/* WAITING FOR BE */}
            {/* <TextButton
              onClick={() => removeInterventionNavigator(id)}
              buttonProps={{ display: 'flex', align: 'center' }}
            >
              <Img width={24} height={24} src={minus} />
              <Text ml={16} color={colors.manatee} fontWeight="bold">
                {formatMessage(messages.remove)}
              </Text>
            </TextButton> */}
          </Row>
        ),
      )}
    </Box>
  );
};

export default AddedNavigatorPanel;
