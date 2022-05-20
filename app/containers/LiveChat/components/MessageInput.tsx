import React from 'react';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { ImageButton } from 'components/Button';

import { boxShadows, colors, borders } from 'theme';

import AirplaneIcon from 'assets/svg/paper-airplane2.svg';

import { StyledTextArea } from './styled';
import messages from '../messages';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
};

export const MessageInput = ({ value, onChange, onSend }: Props) => {
  const { formatMessage } = useIntl();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onSend && value.trim() && event.key === 'Enter') {
      onSend();
      event.preventDefault();
    }
  };

  return (
    <Box width="100%" height="46px" position="relative">
      <StyledTextArea
        width="100%"
        height="100%"
        placeholder={formatMessage(messages.inputPlaceholder)}
        borderRadius="8px"
        shadow={`${boxShadows.selago} !important`}
        border={`${borders.borderWidth} ${borders.borderStyle} ${colors.beauBlue}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        value={value}
        onKeyDown={onSend && handleKeyDown}
      />
      <Box
        position="absolute"
        top="50%"
        right="3px"
        transform="translate(-50%, -50%)"
      >
        <ImageButton
          onClick={onSend}
          src={AirplaneIcon}
          title={formatMessage(messages.inputSendIconTitle)}
        />
      </Box>
    </Box>
  );
};

export default MessageInput;
