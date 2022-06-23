import React from 'react';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import Row from 'components/Row';
import { ImageButton } from 'components/Button';
import Text from 'components/Text';

import { themeColors } from 'theme';

import AirplaneIcon from 'assets/svg/paper-airplane2.svg';

import i18nMessages from '../messages';
import { StyledTextArea } from './styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  error?: string;
};

export const MessageInput = ({ value, onChange, onSend, error }: Props) => {
  const { formatMessage } = useIntl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onSend && value.trim() && event.key === 'Enter') {
      onSend();
      event.preventDefault();
    }
  };

  return (
    <Box>
      <Box width="100%" height="46px" position="relative">
        <StyledTextArea
          placeholder={formatMessage(i18nMessages.inputPlaceholder)}
          onChange={handleChange}
          value={value}
          onKeyDown={onSend && handleKeyDown}
          error={Boolean(error)}
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
            title={formatMessage(i18nMessages.inputSendIconTitle)}
            disabled={Boolean(error)}
          />
        </Box>
      </Box>
      <Row height="24px" align="center">
        {error && (
          <Text fontSize={13} color={themeColors.warning}>
            {error}
          </Text>
        )}
      </Row>
    </Box>
  );
};

export default MessageInput;
