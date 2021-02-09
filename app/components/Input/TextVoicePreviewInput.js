import React, { useState } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Input } from 'components/Input/index';
import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';
import Box from 'components/Box';
import Column from 'components/Column';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';
import { themeColors } from 'theme';

import messages from './messages';

const TextVoicePreviewInput = ({
  intl: { formatMessage },
  value,
  onBlur,
  placeholder,
  disabled,
  styles,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderPreviewButton = () => {
    if (!isPlaying) return <Img src={playButton} />;
    return <Img src={stopButton} />;
  };

  return (
    <Column maxWidth={285}>
      <Box
        bg={themeColors.highlight}
        width="100%"
        px={21}
        py={14}
        justify="center"
        align="center"
      >
        <Input
          defaultValue={value ?? ''}
          onBlur={e => onBlur(e.target.value)}
          placeholder={placeholder}
          transparent
          disabled={disabled}
          {...styles}
        />
      </Box>
      <Row
        align="center"
        width={80}
        onClick={() => setIsPlaying(!isPlaying)}
        clickable
        disabled={!value}
        height={25}
        mt={5}
      >
        {renderPreviewButton()}
        <Text ml={2} color={themeColors.secondary}>
          {formatMessage(messages.preview)}
        </Text>
      </Row>
    </Column>
  );
};

TextVoicePreviewInput.propTypes = {
  intl: intlShape,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
};

export default injectIntl(TextVoicePreviewInput);
