import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useInjectReducer } from 'redux-injectors';
import { useSelector } from 'react-redux';

import { boxShadows, colors } from 'theme';

import {
  makeSelectNotifications,
  withNotificationsReducer,
} from 'global/reducers/notifications';

import { PopoverModal } from 'components/Modal';
import H2 from 'components/H2';
import Box from 'components/Box';
import Divider from 'components/Divider';

import {
  NOTIFICATIONS_LIST_MAX_HEIGHT,
  NOTIFICATIONS_POPOVER_SCREEN_PADDING,
  NOTIFICATIONS_LIST_MAX_WIDTH,
} from './constants';
import messages from './messages';
import SingleNotification from './components/SingleNotification';
import {
  NOTIFICATION_BUTTON_ID,
  NotificationsButton,
} from './components/NotificationsButton';

const NotificationsPanel = () => {
  const { formatMessage } = useIntl();

  useInjectReducer(withNotificationsReducer);
  const notifications = useSelector(makeSelectNotifications());

  const [notificationBoxVisible, setNotificationBoxVisible] = useState(false);
  const toggleNotifications = () =>
    setNotificationBoxVisible((value) => !value);
  const hideNotifications = () => setNotificationBoxVisible(false);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter(({ isRead }) => !isRead).length,
    [notifications],
  );

  return (
    <>
      <NotificationsButton
        onClick={toggleNotifications}
        unreadNotificationsCount={unreadNotificationsCount}
      />
      {notificationBoxVisible && (
        <PopoverModal
          referenceElement={NOTIFICATION_BUTTON_ID}
          defaultPlacement="bottom"
          onClose={hideNotifications}
          contentPadding="24px 24px 8px 24px"
          offsetOptions={40}
          modalStyle={{
            backgroundColor: colors.white,
            borderColor: 'transparent',
            borderRadius: '6px',
            boxShadow: boxShadows.selago,
            width: NOTIFICATIONS_LIST_MAX_WIDTH,
            maxWidth: `calc(100% - 2 * ${NOTIFICATIONS_POPOVER_SCREEN_PADDING}px)`,
          }}
          shiftPadding={NOTIFICATIONS_POPOVER_SCREEN_PADDING}
          hideArrow
        >
          <H2 lineHeight="28px">{formatMessage(messages.notifications)}</H2>
          <Divider my={16} color={colors.linkWater} />
          <Box
            display="flex"
            direction="column"
            gap={8}
            overflow="scroll"
            maxHeight={NOTIFICATIONS_LIST_MAX_HEIGHT}
            disableScrollbar
          >
            {notifications.map((notification) => (
              <SingleNotification
                key={notification.id}
                notification={notification}
              />
            ))}
          </Box>
        </PopoverModal>
      )}
    </>
  );
};

export default NotificationsPanel;
