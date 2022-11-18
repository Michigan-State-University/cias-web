import React from 'react';
import { useIntl } from 'react-intl';

import { InterlocutorAvatarData, InterlocutorNameData } from 'models/LiveChat';

import { formatInterlocutorName } from 'utils/liveChatUtils';
import { CustomDayjsLocale } from 'utils/dayjs';

import ChatAvatar from 'components/ChatAvatar';
import InfoBox from 'components/InfoBox';

import messages from './messages';

export type Props = {
  id: string;
  active: boolean;
  highlighted?: boolean;
  archived?: boolean;
  time: string;
  timeFormatLocale: CustomDayjsLocale;
  messageContent: string;
  messageSentByCurrentUser: boolean;
  interlocutorData: Nullable<InterlocutorNameData & InterlocutorAvatarData>;
  onClick?: () => void;
};

export const ConversationInfoBox = ({
  id,
  active,
  highlighted,
  archived,
  time,
  timeFormatLocale,
  messageContent,
  messageSentByCurrentUser,
  interlocutorData,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <InfoBox
      id={id}
      active={active}
      highlighted={highlighted}
      archived={archived}
      time={time}
      timeFormatLocale={timeFormatLocale}
      icon={<ChatAvatar interlocutorAvatarData={interlocutorData} />}
      title={formatInterlocutorName(interlocutorData, true)}
      content={
        messageSentByCurrentUser
          ? formatMessage(messages.me, { messageContent })
          : messageContent
      }
      onClick={onClick}
    />
  );
};
