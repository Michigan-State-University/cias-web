import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import PlayIcon from 'assets/svg/play-button-1.svg';
import StopIcon from 'assets/svg/stop-button-1.svg';

import { ImageButton } from 'components/Button';

import messages from './messages';

type Props = {
  isPlaying: boolean;
  onClick: () => void;
  disabled?: boolean;
};

const Component = ({
  isPlaying,
  onClick,
  disabled = false,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  if (!isPlaying)
    return (
      <ImageButton
        src={PlayIcon}
        onClick={onClick}
        clickable
        disabled={disabled}
        title={formatMessage(messages.playButtonLabel)}
      />
    );

  return (
    <ImageButton
      src={StopIcon}
      onClick={onClick}
      clickable
      disabled={disabled}
      title={formatMessage(messages.stopButtonLabel)}
    />
  );
};

export const PlayStopButton = memo(Component);
