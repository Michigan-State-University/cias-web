import React from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';
import Box from 'components/Box';
import Row from 'components/Row';
import H3 from 'components/H3';
import Img from 'components/Img';
import Text from 'components/Text';
import UserAvatar from 'components/UserAvatar';

import addSign from 'assets/svg/addSign2.svg';
import messages from '../messages';

const TEAM_MEMBERS = [
  { id: 1, firstName: 'test', lastName: 'user', avatarUrl: '' },
  { id: 2, firstName: 'Other', lastName: 'Test', avatarUrl: '' },
  { id: 3, firstName: 'Michał', lastName: 'Smierc', avatarUrl: '' },
  { id: 1, firstName: 'Lubie', lastName: 'Placki', avatarUrl: '' },
];

const SINGLE_ITEM_HEIGHT = 56;
const SINGLE_ITEM_MARGIN = 8;
const TeamNavigatorsPanel = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.navigatorsFromTeam)}
      </H3>
      <Box
        height={SINGLE_ITEM_HEIGHT * 3 + SINGLE_ITEM_MARGIN * 2}
        overflow="scroll"
      >
        {TEAM_MEMBERS.map(({ avatarUrl, firstName, id, lastName }, index) => (
          <Row
            justify="between"
            align="center"
            background={colors.lightBlue}
            padding={12}
            key={id}
            maxHeight={SINGLE_ITEM_HEIGHT}
            mt={index === 0 ? 0 : SINGLE_ITEM_MARGIN}
          >
            <Row align="center">
              <UserAvatar
                height={32}
                width={32}
                avatar={avatarUrl}
                firstName={firstName}
                lastName={lastName}
              />
              <Text
                ml={16}
                fontWeight="bold"
              >{`${firstName} ${lastName}`}</Text>
            </Row>
            <Row align="center">
              <Img width={24} height={24} src={addSign} />
              <Text ml={16} color={themeColors.secondary} fontWeight="bold">
                {formatMessage(messages.add)}
              </Text>
            </Row>
          </Row>
        ))}
      </Box>
    </>
  );
};

export default TeamNavigatorsPanel;
