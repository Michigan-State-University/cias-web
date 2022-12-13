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
  timeFormatWithSuffix?: boolean;
  messageContent: string;
  messageSentByCurrentUser: boolean;
  interlocutorData: Nullable<InterlocutorNameData & InterlocutorAvatarData>;
  onClick?: () => void;
};

export const ConversationInfoBox = ({
  messageContent,
  messageSentByCurrentUser,
  interlocutorData,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <InfoBox
      icon={<ChatAvatar interlocutorAvatarData={interlocutorData} />}
      title={formatInterlocutorName(interlocutorData, true)}
      content={
        messageSentByCurrentUser
          ? formatMessage(messages.me, { messageContent })
          : messageContent
      }
      {...props}
    />
  );
};
