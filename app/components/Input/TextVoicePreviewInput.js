import React, { useState } from 'react';
import { IntlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectAudioInstance } from 'global/reducers/globalState';
import { Input } from 'components/Input';
import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';
import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import AudioWrapper from 'utils/audioWrapper';

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
  phoneticUrl,
  audioInstance,
  phoneticLoading,
  isAnimationOngoing,
  boxPx,
  boxPy,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioButtonDisabled =
    disabled || phoneticUrl === null || phoneticLoading || isAnimationOngoing;

  const playPreview = () => {
    if (audioButtonDisabled || isPlaying) return;
    setIsPlaying(!isPlaying);
    const onSpeechReady = () => audioInstance.start();
    const onFinish = () => {
      setIsPlaying(false);
      audioInstance.clean();
    };

    audioInstance.onEnded(onFinish);
    audioInstance.onError(onFinish);
    audioInstance.onLoaded(onSpeechReady);
    audioInstance.setSrc(phoneticUrl);
  };

  const renderPreviewButton = () => {
    if (phoneticLoading) return <Loader size={24} type="inline" />;
    if (!isPlaying) return <Img src={playButton} />;
    return <Img src={stopButton} />;
  };

  return (
    <Column>
      <Box
        bg={themeColors.highlight}
        px={boxPx}
        py={boxPy}
        justify="center"
        align="center"
        minWidth={300}
      >
        <Input
          defaultValue={value ?? ''}
          onBlur={(e) => onBlur(e.target.value)}
          placeholder={placeholder}
          transparent
          disabled={disabled}
          {...styles}
        />
      </Box>
      <Row
        align="center"
        width={80}
        onClick={playPreview}
        clickable
        disabled={audioButtonDisabled}
        height={25}
        mt={5}
        role="button"
      >
        {renderPreviewButton()}
        <Text whiteSpace="pre" ml={2} color={themeColors.secondary}>
          {formatMessage(messages.preview)}
        </Text>
      </Row>
    </Column>
  );
};

TextVoicePreviewInput.propTypes = {
  intl: PropTypes.shape(IntlShape),
  value: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  phoneticUrl: PropTypes.any,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  audioInstance: PropTypes.shape(AudioWrapper),
  phoneticLoading: PropTypes.bool,
  isAnimationOngoing: PropTypes.bool,
  boxPy: PropTypes.number,
  boxPx: PropTypes.number,
};

TextVoicePreviewInput.defaultProps = {
  boxPy: 14,
  boxPx: 21,
};

const mapStateToProps = createStructuredSelector({
  audioInstance: makeSelectAudioInstance(),
});

const withConnect = connect(mapStateToProps);
const TextVoicePreviewInputWithIntl = injectIntl(TextVoicePreviewInput);

export default compose(withConnect)(TextVoicePreviewInputWithIntl);
