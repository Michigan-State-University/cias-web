import React from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import MessageIcon from 'assets/svg/message.svg';

import { ImageButton, ImageButtonProps } from 'components/Button';
import Text from 'components/Text';

import messages from '../messages';
import { CHAT_DIALOG_HEADER_CONTENT_HEIGHT } from '../constants';

export type Props = Omit<ImageButtonProps, 'src' | 'title'>;

const CallOutNavigatorButton = ({ disabled, ...props }: Props) => {
  const { formatMessage } = useIntl();

  const color = disabled ? themeColors.comment : themeColors.secondary;

  return (
    <ImageButton
      src={MessageIcon}
      title={formatMessage(messages.callOutTheNavigator)}
      display="flex"
      align="center"
      gap={6}
      padding={0}
      fill={color}
      stroke={color}
      height={CHAT_DIALOG_HEADER_CONTENT_HEIGHT}
      disabled={disabled}
      {...props}
    >
      <Text color={color}>{formatMessage(messages.callOutTheNavigator)}</Text>
    </ImageButton>
  );
};

export default CallOutNavigatorButton;
