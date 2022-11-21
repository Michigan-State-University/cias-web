import React from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import MegaphoneIcon from 'assets/svg/megaphone.svg';

import { ImageButton, ImageButtonProps } from 'components/Button';
import Text from 'components/Text';

import messages from '../messages';

export type Props = Omit<ImageButtonProps, 'src' | 'title'>;

const CallOutNavigatorButton = (props: Props) => {
  const { formatMessage } = useIntl();

  const color = props.disabled ? themeColors.comment : themeColors.secondary;

  return (
    <ImageButton
      src={MegaphoneIcon}
      title={formatMessage(messages.callOutTheNavigator)}
      display="flex"
      align="center"
      gap={6}
      padding={0}
      fill={color}
      stroke={color}
      {...props}
    >
      <Text color={color}>{formatMessage(messages.callOutTheNavigator)}</Text>
    </ImageButton>
  );
};

export default CallOutNavigatorButton;
