import React from 'react';

import { colors } from 'theme';

import { Interlocutor } from 'models/LiveChat';

import UserAvatar from 'components/UserAvatar';

export type Props = {
  interlocutor: Nullable<Interlocutor>;
};

const ChatAvatar = ({ interlocutor }: Props) => {
  const { avatarUrl, firstName, lastName } = interlocutor ?? {};
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
