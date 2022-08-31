import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { boxShadows, colors } from 'theme';
import GreyBell from 'assets/svg/grey-bell.svg';

import { Notification, NotificationEvent } from 'models/Notification';

import ActionIcon from 'components/ActionIcon';
import { PopoverModal } from 'components/Modal';
import H2 from 'components/H2';
import Box from 'components/Box';
import Divider from 'components/Divider';

import messages from './messages';
import SingleNotification from './components/SingleNotification';
import {
  NOTIFICATIONS_LIST_MAX_HEIGHT,
  NOTIFICATIONS_ICON_SIZE,
  NOTIFICATIONS_POPOVER_SCREEN_PADDING,
  NOTIFICATIONS_LIST_MAX_WIDTH,
} from './constants';

const ICON_ID = 'NOTIFICATION_BELL_ID';

const notifications: Notification[] = [
  {
    notifiableId: '1',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: false,
    createdAt: dayjs().subtract(2, 's').toISOString(),
    data: {
      conversationId: '1',
      userId: '1',
      avatarUrl: null,
      firstName: 'Test',
      lastName: 'Testowski',
      message:
        'Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ',
    },
  },
  {
    notifiableId: '2',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: false,
    createdAt: dayjs().subtract(3, 'm').toISOString(),
    data: {
      conversationId: '2',
      userId: '2',
      avatarUrl: null,
      firstName: 'Jan',
      lastName: 'Kowalski',
      message: 'Hello Hello Hello',
    },
  },
  {
    notifiableId: '3',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: false,
    createdAt: dayjs().subtract(1, 'h').toISOString(),
    data: {
      conversationId: '3',
      userId:
        '3283nu329j8ru3j0289nucr029n3tjr029unctj2093nr02rk209nrkx3029rkx320n9',
      avatarUrl: null,
      firstName: '',
      lastName: '',
      message: 'Hello',
    },
  },
  {
    notifiableId: '4',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: true,
    createdAt: dayjs().subtract(4, 'd').toISOString(),
    data: {
      conversationId: '4',
      userId: '4',
      avatarUrl: null,
      firstName: 'Jaaaaaaaaaaaaaaaaan',
      lastName: 'Kowaaaaaaaaaaaaaaaaalski',
      message:
        'Hellofjfdsjdisdshdsfjhdsbjoshusujiodhusjoifhujoishuijosdhugjiosdghujijodghkkjdfhbknflijfhkdnvfjsdkhnkjvlns',
    },
  },
  {
    notifiableId: '5',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: true,
    createdAt: dayjs().subtract(6, 'd').toISOString(),
    data: {
      conversationId: '5',
      userId: '5',
      avatarUrl: null,
      firstName: 'Iks',
      lastName: 'Iksiński',
      message: 'Hello',
    },
  },
  {
    notifiableId: '6',
    notifiableType: 'Conversation',
    event: NotificationEvent.NEW_MESSAGE,
    isRead: true,
    createdAt: dayjs().subtract(6, 'd').toISOString(),
    data: {
      conversationId: '6',
      userId:
        '6328ju2r78kur9w7hefjk0u8c9ghuejfxiku2jchnexfjudi2fchefjxiu2hecifuxi9f2u8hg3',
      avatarUrl: null,
      firstName: '',
      lastName: '',
      message: 'Hello',
    },
  },
];

const NotificationsPanel = () => {
  const { formatMessage } = useIntl();

  const [notificationBoxVisible, setNotificationBoxVisible] = useState(false);
  const toggleNotifications = () =>
    setNotificationBoxVisible((value) => !value);
  const hideNotifications = () => setNotificationBoxVisible(false);

  return (
    <>
      <ActionIcon
        iconSrc={GreyBell}
        ariaText={formatMessage(messages.toggleNotifications)}
        onClick={toggleNotifications}
        bg={colors.white}
        position="relative"
        id={ICON_ID}
        mr={32}
        width={NOTIFICATIONS_ICON_SIZE}
        height={NOTIFICATIONS_ICON_SIZE}
      />
      {notificationBoxVisible && (
        <PopoverModal
          referenceElement={ICON_ID}
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
                key={notification.notifiableId}
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
