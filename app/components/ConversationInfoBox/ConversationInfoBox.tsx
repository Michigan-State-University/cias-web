import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { colors } from 'theme';

import { InterlocutorAvatarData, InterlocutorNameData } from 'models/LiveChat';

import { formatInterlocutorName } from 'utils/liveChatUtils';
import { CustomDayjsLocale } from 'utils/dayjs';

import Column from 'components/Column';
import Text, { EllipsisText } from 'components/Text';
import ChatAvatar from 'components/ChatAvatar';

import { ConversationInfoBoxContainer } from './ConversationInfoBoxContainer';
import { LabelRow } from './styled';
import messages from './messages';
import {
  READ_CONVERSATION_TEXT_OPACITY,
  UNREAD_CONVERSATION_TEXT_OPACITY,
} from './constants';

export type Props = {
  highlighted: boolean;
  archived?: boolean;
  unread?: boolean;
  messageCreatedAt: string;
  messageContent: string;
  messageSentByCurrentUser: boolean;
  interlocutorData: Nullable<InterlocutorNameData & InterlocutorAvatarData>;
  timeFormatLocale: CustomDayjsLocale;
  onClick?: () => void;
};

export const ConversationInfoBox = ({
  highlighted,
  archived,
  unread,
  messageCreatedAt,
  messageContent,
  messageSentByCurrentUser,
  interlocutorData,
  timeFormatLocale,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  const textOpacity = unread
    ? UNREAD_CONVERSATION_TEXT_OPACITY
    : READ_CONVERSATION_TEXT_OPACITY;

  return (
    <ConversationInfoBoxContainer highlighted={highlighted} onClick={onClick}>
      <Column flexShrink={0} width="auto">
        <ChatAvatar interlocutorAvatarData={interlocutorData} />
      </Column>
      <Column flex={1} gap={12} minWidth="0">
        <LabelRow justify="between" gap={8}>
          <EllipsisText
            fontWeight="bold"
            fontSize={14}
            color={colors.bluewood}
            textOpacity={textOpacity}
            text={formatInterlocutorName(interlocutorData)}
          />
          <Column flexShrink={0} width="auto">
            {!archived && (
              <Text
                fontWeight="bold"
                fontSize={12}
                color={colors.bluewood}
                textOpacity={textOpacity}
              >
                {dayjs(messageCreatedAt).locale(timeFormatLocale).fromNow(true)}
              </Text>
            )}
            {archived && (
              <Text fontWeight="medium" fontSize={12} color={colors.vermilion}>
                {formatMessage(messages.archived)}
              </Text>
            )}
          </Column>
        </LabelRow>
        <LabelRow>
          {messageSentByCurrentUser && (
            <Column flexShrink={0} width="auto">
              <Text
                fontSize={12}
                color={colors.bluewood}
                textOpacity={textOpacity}
                fontWeight={unread ? 'bold' : 'regular'}
              >
                {formatMessage(messages.you)}&nbsp;
              </Text>
            </Column>
          )}
          <Text
            fontSize={12}
            color={colors.bluewood}
            textOpacity={textOpacity}
            fontWeight={unread ? 'bold' : 'regular'}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {messageContent}
          </Text>
        </LabelRow>
      </Column>
      <Column
        flexShrink={0}
        width={2}
        background={unread ? colors.vermilion : 'inherit'}
      />
    </ConversationInfoBoxContainer>
  );
};
