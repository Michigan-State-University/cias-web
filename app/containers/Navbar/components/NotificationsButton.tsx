import React from 'react';
import { useIntl } from 'react-intl';

import { colors, ZIndex } from 'theme';
import GreyBell from 'assets/svg/grey-bell.svg';

import ActionIcon from 'components/ActionIcon';
import { CircleCounter } from 'components/CircleCounter';
import Box from 'components/Box';

import messages from '../messages';
import { NOTIFICATIONS_ICON_SIZE } from '../constants';

export const NOTIFICATION_BUTTON_ID = 'NOTIFICATION_BUTTON_ID';

export type Props = {
  unreadNotificationsCount: number;
  onClick: () => void;
};

export const NotificationsButton = ({
  unreadNotificationsCount,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  const hasUnreadNotifications = Boolean(unreadNotificationsCount);

  return (
    <Box position="relative">
      <ActionIcon
        iconSrc={GreyBell}
        ariaText={formatMessage(messages.toggleNotifications)}
        onClick={onClick}
        bg={colors.white}
        mr={0}
        id={NOTIFICATION_BUTTON_ID}
        width={NOTIFICATIONS_ICON_SIZE}
        height={NOTIFICATIONS_ICON_SIZE}
        zIndex={ZIndex.NOTIFICATIONS_ICON}
      >
        {hasUnreadNotifications && (
          <Box
            position="absolute"
            top={0}
            right={0}
            zIndex={ZIndex.NOTIFICATIONS_COUNTER}
          >
            <CircleCounter
              count={unreadNotificationsCount}
              size={16}
              border={`1px solid ${colors.white}`}
            />
          </Box>
        )}
      </ActionIcon>
    </Box>
  );
};
