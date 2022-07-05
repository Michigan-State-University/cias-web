import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import minus from 'assets/svg/grey-minus.svg';

import Box from 'components/Box';
import H3 from 'components/H3';
import Text from 'components/Text';
import Row from 'components/Row';
import Img from 'components/Img';
import UserAvatar from 'components/UserAvatar';

import messages from '../messages';

const SINGLE_ITEM_HEIGHT = 60;
const ITEM_MARGIN = 8;

const NAVIGATOR_ACCOUNTS = [
  {
    id: 1,
    user: {
      firstName: 'test',
      lastName: 'user',
      avatarUrl: '',
      email: 'Test@test.pl',
    },
  },
  {
    id: 2,
    user: {
      firstName: 'Other',
      lastName: 'Test',
      avatarUrl: '',
      email: 'Test2@test.pl',
    },
  },
  {
    id: 3,
    user: {
      firstName: 'Michał',
      lastName: 'Smierc',
      avatarUrl: '',
      email: 'Test3@test.pl',
    },
  },
  {
    id: 4,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 5,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 6,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 7,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 8,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 9,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
];

const AddedNavigatorPanel = () => {
  const { formatMessage } = useIntl();

  const removeNavigator = (navigatorId: number) => {
    console.log(navigatorId);
  };

  return (
    <Box>
      <H3 mb={30}>{formatMessage(messages.navigatorsAddedToIntervention)}</H3>
      {NAVIGATOR_ACCOUNTS.length === 0 && (
        <Text color={colors.grey}>
          {formatMessage(messages.noAddedNavigators)}
        </Text>
      )}
      {NAVIGATOR_ACCOUNTS.map(
        ({ id, user: { avatarUrl, firstName, lastName, email } }, index) => (
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
                avatar={avatarUrl}
                firstName={firstName}
                lastName={lastName}
              />
              <Box ml={16}>
                <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
                <Text>{email}</Text>
              </Box>
            </Row>
            <Row onClick={() => removeNavigator(id)} align="center">
              <Img width={24} height={24} src={minus} />
              <Text ml={16} color={colors.manatee} fontWeight="bold">
                {formatMessage(messages.remove)}
              </Text>
            </Row>
          </Row>
        ),
      )}
    </Box>
  );
};

export default AddedNavigatorPanel;
