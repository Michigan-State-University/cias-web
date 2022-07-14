import React from 'react';

import { colors } from 'theme';

import { Interlocutor } from 'models/LiveChat';

import UserAvatar from 'components/UserAvatar';

export type Props = {
  interlocutor: Nullable<Interlocutor>;
};

const ChatAvatar = ({ interlocutor }: Props) => (
  <UserAvatar
    height={36}
    width={36}
    backgroundColor={interlocutor?.userId ? colors.jungleGreen : colors.manatee}
    avatar={interlocutor?.avatarUrl || ''}
    firstName={interlocutor?.firstName || ''}
    lastName={interlocutor?.lastName || ''}
  />
);

export default ChatAvatar;
