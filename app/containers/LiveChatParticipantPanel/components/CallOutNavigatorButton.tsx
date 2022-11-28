import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { themeColors } from 'theme';
import MessageIcon from 'assets/svg/message.svg';

import { CustomDayjsLocale } from 'utils/dayjs';
import useRefreshComponent from 'utils/useRefreshComponent';

import { ImageButton, ImageButtonProps } from 'components/Button';
import Text from 'components/Text';
import { Tooltip } from 'components/Tooltip';

import messages from '../messages';
import { CHAT_DIALOG_HEADER_CONTENT_HEIGHT } from '../constants';

export type Props = { unlockTime?: Nullable<string> } & Omit<
  ImageButtonProps,
  'src' | 'title'
>;

const CallOutNavigatorButton = ({ unlockTime, disabled, ...props }: Props) => {
  const { formatMessage } = useIntl();

  const color = disabled ? themeColors.comment : themeColors.secondary;

  const showTooltip = Boolean(disabled && unlockTime);

  useRefreshComponent(1000, !showTooltip);

  return (
    <Tooltip
      id="call-out-navigator-disabled-tooltip"
      visible={showTooltip}
      content={
        <Text fontSize={12} maxWidth={232} lineHeight="20px">
          {formatMessage(messages.youJustCalledTheNavigator, {
            timeLeft: dayjs(unlockTime)
              .locale(CustomDayjsLocale.EN_LONG_RELATIVE_TIME_WITH_SECONDS)
              .fromNow(),
          })}
        </Text>
      }
    >
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
    </Tooltip>
  );
};

export default CallOutNavigatorButton;
