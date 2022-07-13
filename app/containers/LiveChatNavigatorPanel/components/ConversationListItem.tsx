import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import { colors } from 'theme';

import { Conversation } from 'models/LiveChat';

import { formatInterlocutorName } from 'utils/liveChatUtils';

import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import ChatAvatar from 'components/ChatAvatar';

import { ConversationListItemContainer } from './styled';
import i18nMessages from '../messages';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '<1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1d',
    yy: '%dy',
  },
});

export type Props = {
  conversation: Conversation;
  currentUserId: string;
  opened: boolean;
  onClick: (conversationId: string) => void;
};

export const ConversationListItem = ({
  conversation,
  currentUserId,
  opened,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  const {
    id: conversationId,
    lastMessage,
    liveChatInterlocutors,
    archived,
  } = conversation;

  const handleClick = () => onClick(conversationId);

  const otherInterlocutor = Object.values(liveChatInterlocutors).find(
    ({ userId }) => userId !== currentUserId,
  );

  const markUnread =
    !lastMessage.isRead && lastMessage.interlocutorId === otherInterlocutor?.id;

  return (
    <ConversationListItemContainer highlighted={opened} onClick={handleClick}>
      <Column flexShrink={0} width="auto">
        <ChatAvatar interlocutor={otherInterlocutor} />
      </Column>
      <Column flex={1} gap={12} minWidth="0">
        <Row justify="between" gap={8}>
          <Text
            fontWeight="bold"
            fontSize={14}
            lineHeight="14px"
            color={colors.bluewood}
            textOpacity={markUnread ? 1 : 0.7}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {formatInterlocutorName(otherInterlocutor)}
          </Text>
          <Column flexShrink={0} width="auto">
            {!archived && (
              <Text
                fontWeight="bold"
                fontSize={12}
                lineHeight="14px"
                color={colors.bluewood}
                textOpacity={markUnread ? 1 : 0.7}
              >
                {dayjs(lastMessage.createdAt).fromNow(true)}
              </Text>
            )}
            {archived && (
              <Text
                fontWeight="medium"
                fontSize={12}
                lineHeight="14px"
                color={colors.vermilion}
              >
                {formatMessage(i18nMessages.archived)}
              </Text>
            )}
          </Column>
        </Row>
        <Row width="100%">
          {liveChatInterlocutors[lastMessage.interlocutorId]?.userId ===
            currentUserId && (
            <Column flexShrink={0} width="auto">
              <Text
                fontSize={12}
                lineHeight="12px"
                color={colors.bluewood}
                textOpacity={markUnread ? 1 : 0.7}
                fontWeight={markUnread ? 'bold' : 'regular'}
              >
                {formatMessage(i18nMessages.you)}&nbsp;
              </Text>
            </Column>
          )}
          <Text
            fontSize={12}
            lineHeight="12px"
            color={colors.bluewood}
            textOpacity={markUnread ? 1 : 0.7}
            fontWeight={markUnread ? 'bold' : 'regular'}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {lastMessage.content}
          </Text>
        </Row>
      </Column>
      <Column
        flexShrink={0}
        width={2}
        background={markUnread ? colors.vermilion : 'inherit'}
      />
    </ConversationListItemContainer>
  );
};
