import React, { useState } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Input } from 'components/Input/index';
import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';
import { themeColors } from 'theme';

import messages from './messages';

const TextVoicePreviewInput = ({
  intl: { formatMessage },
  value,
  onInputChange,
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
    <>
      <Input
        value={value}
        onChange={event => onInputChange(event.target.value)}
        onBlur={e => onBlur(e.target.value)}
        placeholder={placeholder}
        transparent
        disabled={disabled}
        {...styles}
      />
      <Row
        align="center"
        width={80}
        position="absolute"
        top="180px"
        right="230px"
        onClick={() => setIsPlaying(!isPlaying)}
        clickable
        disabled={!value}
      >
        {renderPreviewButton()}
        <Text ml={2} color={themeColors.secondary}>
          {formatMessage(messages.preview)}
        </Text>
      </Row>
    </>
  );
};

TextVoicePreviewInput.propTypes = {
  intl: intlShape,
  value: PropTypes.string,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
};

export default injectIntl(TextVoicePreviewInput);
