import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useRoleManager } from 'models/User/RolesManager';

import { boxShadows, colors } from 'theme';

import { CustomDayjsLocale } from 'utils/dayjs';

import {
  makeSelectNotifications,
  makeSelectNotificationsListVisible,
  setNotificationsListVisible,
} from 'global/reducers/notifications';

import { PopoverModal } from 'components/Modal';
import H2 from 'components/H2';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SingleNotification from 'components/SingleNotification';

import {
  NOTIFICATIONS_LIST_MAX_HEIGHT,
  NOTIFICATIONS_LIST_MAX_WIDTH,
  NOTIFICATIONS_POPOVER_SCREEN_PADDING,
} from './constants';
import messages from './messages';
import {
  NOTIFICATION_BUTTON_ID,
  NotificationsButton,
} from './components/NotificationsButton';

const NotificationsPanel = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const { canDisplayNotifications } = useRoleManager();

  const notificationsListVisible = useSelector(
    makeSelectNotificationsListVisible(),
  );
  const notifications = useSelector(makeSelectNotifications());

  const toggleNotifications = () =>
    dispatch(setNotificationsListVisible(!notificationsListVisible));
  const closeNotifications = () => dispatch(setNotificationsListVisible(false));

  // Remove or update this check when making other roles see notifications
  if (!canDisplayNotifications) {
    return null;
  }

  const hasUnreadNotifications = Boolean(notifications.length);

  return (
    <>
      <NotificationsButton
        onClick={toggleNotifications}
        unreadNotificationsCount={notifications.length}
      />
      {notificationsListVisible && (
        <PopoverModal
          referenceElement={NOTIFICATION_BUTTON_ID}
          defaultPlacement="bottom"
          onClose={closeNotifications}
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
          {hasUnreadNotifications && (
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
                  timeFormatLocale={CustomDayjsLocale.EN_LONG_RELATIVE_TIME}
                />
              ))}
            </Box>
          )}
          {!hasUnreadNotifications && (
            <Text mb={8}>{formatMessage(messages.noUnreadNotifications)}</Text>
          )}
        </PopoverModal>
      )}
    </>
  );
};

export default NotificationsPanel;
