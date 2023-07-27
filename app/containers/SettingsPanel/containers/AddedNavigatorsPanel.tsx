import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { NavigatorModalUser } from 'models/NavigatorSetup';
import minus from 'assets/svg/grey-minus.svg';

import Box from 'components/Box';
import H2 from 'components/H2';
import Text, { EllipsisText } from 'components/Text';
import Row from 'components/Row';
import Img from 'components/Img';
import UserAvatar from 'components/UserAvatar';
import { TextButton } from 'components/Button';

import messages from '../messages';

const SINGLE_ITEM_HEIGHT = 60;
const ITEM_MARGIN = 8;

type Props = {
  interventionNavigators: NavigatorModalUser[];
  removeInterventionNavigator: (interventionNavigatorId: string) => void;
  disabled: boolean;
};

const AddedNavigatorPanel = ({
  interventionNavigators,
  removeInterventionNavigator,
  disabled,
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Box>
      <H2 fontSize={16} lineHeight="24px" mb={24}>
        {formatMessage(messages.navigatorsAddedToIntervention)}
      </H2>
      {interventionNavigators.length === 0 && (
        <Text color={colors.grey}>
          {formatMessage(messages.noAddedNavigators)}
        </Text>
      )}
      {interventionNavigators.map(
        ({ id, avatarUrl, email, firstName, lastName, inDeletion }, index) => (
          <Row
            justify="between"
            align="center"
            background={colors.lightBlue}
            padding={12}
            key={id}
            minHeight={SINGLE_ITEM_HEIGHT}
            mt={index === 0 ? 0 : ITEM_MARGIN}
            gap={16}
          >
            <Row align="center" filled>
              <Box flexShrink={0}>
                <UserAvatar
                  height={32}
                  width={32}
                  avatar={avatarUrl || ''}
                  firstName={firstName}
                  lastName={lastName}
                />
              </Box>
              <Box ml={8} filled>
                <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
                <EllipsisText text={email} lines={1} />
              </Box>
            </Row>
            <TextButton
              onClick={() => removeInterventionNavigator(id)}
              buttonProps={{ display: 'flex', align: 'center', minWidth: 85 }}
              loading={inDeletion}
              disabled={disabled}
            >
              <Img width={24} height={24} src={minus} mr={4} />
              <Text color={colors.manatee} fontWeight="bold">
                {formatMessage(messages.remove)}
              </Text>
            </TextButton>
          </Row>
        ),
      )}
    </Box>
  );
};

export default AddedNavigatorPanel;
