import React, { memo } from 'react';

import { Interlocutor } from 'models/LiveChat';

import { formatInterlocutorName } from 'utils/liveChatUtils';

import ChatAvatar from 'components/ChatAvatar';
import Row from 'components/Row';
import Text from 'components/Text';
import Box from 'components/Box';

export type Props = {
  interlocutor: Nullable<Interlocutor>;
};

const ConversationChatDialogHeader = ({ interlocutor }: Props) => (
  <Row align="center" gap={12} minWidth="0" flexGrow={1}>
    <Box flexShrink={0}>
      <ChatAvatar interlocutorAvatarData={interlocutor} />
    </Box>
    <Box flexGrow={1} minWidth="0">
      {interlocutor && (
        <Text
          fontWeight="bold"
          fontSize={15}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {formatInterlocutorName(interlocutor)}
        </Text>
      )}
    </Box>
  </Row>
);

export default memo(ConversationChatDialogHeader);
