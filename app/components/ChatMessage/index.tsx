import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import Text from 'components/Text';
import Icon from 'components/Icon';

import { colors, themeColors } from 'theme';

import CheckMark from 'assets/svg/check-green.svg';

import messages from './messages';

type Props = {
  isMine?: boolean;
  read?: boolean;
  senderName?: string;
  children?: ReactElement;
};

export const ChatMessage = ({
  isMine,
  read,
  senderName,
  children,
  ...style
}: Props) => (
  <Box
    width="100%"
    display="flex"
    direction="column"
    align={isMine ? 'end' : 'start'}
    {...style}
  >
    <Box
      maxWidth="60%"
      display="flex"
      direction="column"
      align={isMine ? 'end' : 'start'}
    >
      <Text
        textAlign={isMine ? 'right' : 'left'}
        color={themeColors.text}
        textOpacity={0.5}
        margin="0 12px 4px 12px"
        lineHeight="12px"
      >
        {isMine ? <FormattedMessage {...messages.you} /> : senderName}
      </Text>
      <Box
        bg={isMine ? themeColors.primary : themeColors.highlight}
        padding={12}
        borderRadius={8}
        fontSize="13px"
        lineHeight="18px"
        color={isMine ? colors.white : themeColors.text}
      >
        {children}
      </Box>
      {read && isMine && (
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
