import React from 'react';

import { colors } from 'theme';

import { InterlocutorAvatarData } from 'models/LiveChat';

import UserAvatar from 'components/UserAvatar';

export type Props = {
  interlocutorAvatarData: Nullable<InterlocutorAvatarData>;
};

const ChatAvatar = ({ interlocutorAvatarData }: Props) => {
  const { avatarUrl, firstName, lastName } = interlocutorAvatarData ?? {};
  return (
    <UserAvatar
      height={36}
      width={36}
      backgroundColor={
        firstName && lastName ? colors.jungleGreen : colors.manatee
      }
      avatar={avatarUrl ?? ''}
      firstName={firstName ?? ''}
      lastName={lastName ?? ''}
    />
  );
};

export default ChatAvatar;
