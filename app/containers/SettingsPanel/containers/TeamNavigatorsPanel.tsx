import React from 'react';
import { useIntl } from 'react-intl';

import { NavigatorModalUser } from 'models/NavigatorSetup';
import { colors, themeColors } from 'theme';

import Box from 'components/Box';
import Row from 'components/Row';
import H3 from 'components/H3';
import Img from 'components/Img';
import Text from 'components/Text';
import UserAvatar from 'components/UserAvatar';
import { TextButton } from 'components/Button';

import addSign from 'assets/svg/addSign2.svg';
import messages from '../messages';

const SINGLE_ITEM_HEIGHT = 56;
const SINGLE_ITEM_MARGIN = 8;

type Props = {
  teamNavigators: NavigatorModalUser[];
  addNavigatorFromTeam: (user: NavigatorModalUser) => void;
  disabled: boolean;
};
const TeamNavigatorsPanel = ({
  teamNavigators,
  addNavigatorFromTeam,
  disabled,
}: Props) => {
  const { formatMessage } = useIntl();

  const onAddNavigator = (user: NavigatorModalUser) => {
    addNavigatorFromTeam(user);
  };

  return (
    <>
      <H3 mt={30} mb={20}>
        {formatMessage(messages.navigatorsFromTeam)}
      </H3>
      {teamNavigators.length === 0 && (
        <Text color={colors.grey}>
          {formatMessage(messages.noTeamNavigators)}
        </Text>
      )}
      {teamNavigators.length !== 0 && (
        <Box
          height={SINGLE_ITEM_HEIGHT * 3 + SINGLE_ITEM_MARGIN * 2}
          overflow="scroll"
        >
          {teamNavigators.map((user, index) => {
            const { id, avatarUrl, firstName, lastName, inDeletion } = user;
            return (
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
                <TextButton
                  onClick={() => onAddNavigator(user)}
                  buttonProps={{ display: 'flex', align: 'center' }}
                  loading={inDeletion}
                  disabled={disabled}
                >
                  <Img width={24} height={24} src={addSign} mr={4} />
                  <Text color={themeColors.secondary} fontWeight="bold">
                    {formatMessage(messages.add)}
                  </Text>
                </TextButton>
              </Row>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default TeamNavigatorsPanel;
