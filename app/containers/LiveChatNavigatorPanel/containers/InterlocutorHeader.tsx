import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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
  const isArchived = !!conversation?.archivedAt;

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
      <Column ml={16} flex={1} minWidth="0">
        <Box display="flex" align="center" textAlign="left">
          <EllipsisText
            fontSize={16}
            fontWeight="bold"
            color={colors.bluewood}
            text={formatInterlocutorName(otherInterlocutor, true)}
          />
          {isArchived && (
            <Box flexShrink={0}>
              <Text
                ml={16}
                color={colors.vermilion}
                as="span"
                fontWeight="medium"
              >
                <FormattedMessage {...messages.archived} />
              </Text>
            </Box>
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
