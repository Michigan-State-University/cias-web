import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import ChatAvatar from 'components/ChatAvatar';
import Text, { EllipsisText } from 'components/Text';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';

import { makeSelectOpenedConversation } from 'global/reducers/liveChat';
import { makeSelectUserId } from 'global/reducers/auth';
import { formatInterlocutorName } from 'utils/liveChatUtils';

import { colors, themeColors } from 'theme';

import messages from '../messages';

export const InterlocutorHeader = () => {
  const conversation = useSelector(makeSelectOpenedConversation());
  const currentUserId = useSelector(makeSelectUserId());

  if (!conversation) return null;

  const liveChatInterlocutors = conversation?.liveChatInterlocutors;
  const isArchived = conversation?.archived;

  const otherInterlocutor =
    liveChatInterlocutors &&
    Object.values(liveChatInterlocutors).find(
      ({ userId }) => userId !== currentUserId,
    );

  const currentScreenTitle = conversation?.currentScreenTitle;

  return (
    <Row
      padding={24}
      align="center"
      borderLeft={`1px solid ${themeColors.highlight}`}
    >
      <Column flexShrink={0} width="auto">
        <ChatAvatar interlocutorAvatarData={otherInterlocutor} />
      </Column>
      <Column ml={16} flex={1} minWidth="0">
        <Box display="flex" align="center">
          <Text fontWeight="bold" fontSize={16}>
            {formatInterlocutorName(otherInterlocutor)}
          </Text>
          {isArchived && (
            <Text
              ml={16}
              color={colors.vermilion}
              as="span"
              fontWeight="medium"
            >
              <FormattedMessage {...messages.archived} />
            </Text>
          )}
        </Box>
        {currentScreenTitle && (
          <Box textAlign="left" mt={8}>
            <EllipsisText
              fontSize={12}
              color={colors.bluewood}
              text={currentScreenTitle}
              isHtml
            />
          </Box>
        )}
      </Column>
    </Row>
  );
};

export default InterlocutorHeader;
