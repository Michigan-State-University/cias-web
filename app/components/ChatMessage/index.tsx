import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Interweave } from 'interweave';
import { UrlMatcher } from 'interweave-autolink';

import Box from 'components/Box';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { colors, themeColors } from 'theme';

import CheckMark from 'assets/svg/check-green.svg';

import messages from './messages';
import { MessageContainer } from './styled';

type Props = {
  isMine?: boolean;
  markRead?: boolean;
  senderName?: string;
  hideSender?: boolean;
  message?: string;
  [x: string]: any;
};

export const ChatMessage = ({
  isMine,
  markRead,
  senderName,
  message,
  hideSender,
  ...style
}: Props) => (
  <Box
    width="100%"
    display="flex"
    justify={isMine ? 'end' : 'start'}
    {...style}
  >
    <Box
      maxWidth="60%"
      display="flex"
      direction="column"
      align={isMine ? 'end' : 'start'}
      textAlign={isMine ? 'right' : 'left'}
    >
      {!hideSender && (
        <Box>
          <Text
            textAlign={isMine ? 'right' : 'left'}
            color={themeColors.text}
            textOpacity={0.5}
            margin="0 12px 4px 12px"
            lineHeight="12px"
          >
            {isMine ? <FormattedMessage {...messages.me} /> : senderName}
          </Text>
        </Box>
      )}
      <MessageContainer
        bg={isMine ? themeColors.primary : themeColors.highlight}
        padding={12}
        borderRadius={8}
        fontSize="13px"
        lineHeight="18px"
        color={isMine ? colors.white : themeColors.text}
        textAlign="left"
        width="fit-content"
      >
        <Interweave
          content={message}
          matchers={[new UrlMatcher('url')]}
          newWindow
        />
      </MessageContainer>
      {markRead && (
        <Box
          margin="8px 12px 0 12px"
          display="flex"
          justify={isMine ? 'end' : 'start'}
          align="center"
        >
          <Icon
            src={CheckMark}
            stroke={colors.manatee}
            margin="0 7px"
            width={9}
          />
          <Text color={themeColors.text} textOpacity={0.5} lineHeight="12px">
            <FormattedMessage {...messages.read} />
          </Text>
        </Box>
      )}
    </Box>
  </Box>
);

export default ChatMessage;
