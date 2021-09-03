import React, { useState } from 'react';
import { useIntl } from 'react-intl';
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
  value,
  onTextReady,
  placeholder,
  disabled,
  styles,
  phoneticUrl,
  audioInstance,
  phoneticLoading,
  isAnimationOngoing,
  boxPx,
  boxPy,
  previewButtonInsideInput,
}) => {
  const { formatMessage } = useIntl();

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

  const saveText = (event) => onTextReady(event.target.value);

  const saveTextIfEnterClicked = (event) => {
    if (event.key === 'Enter') {
      saveText(event);
    }
  };

  const renderTextInput = () => (
    <Box
      bg={themeColors.highlight}
      px={boxPx}
      py={boxPy}
      justify="center"
      align="center"
      minWidth={previewButtonInsideInput ? null : 300}
      width="100%"
    >
      <Input
        defaultValue={value ?? ''}
        onBlur={saveText}
        onKeyDown={saveTextIfEnterClicked}
        placeholder={placeholder}
        transparent
        disabled={disabled}
        {...styles}
      />
    </Box>
  );

  const renderPreviewButton = () => {
    if (phoneticLoading) return <Loader size={24} type="inline" />;
    if (!isPlaying)
      return (
        <Img
          src={playButton}
          onClick={playPreview}
          clickable
          disabled={audioButtonDisabled}
          aria-disabled={audioButtonDisabled}
          role="button"
          aria-label={formatMessage(messages.playButtonLabel)}
        />
      );
    return (
      <Img
        src={stopButton}
        onClick={playPreview}
        clickable
        disabled={audioButtonDisabled}
        aria-disabled={audioButtonDisabled}
        role="button"
        aria-label={formatMessage(messages.stopButtonLabel)}
      />
    );
  };

  return previewButtonInsideInput ? (
    <Row align="center">
      {renderTextInput()}
      <Box ml={-34}>{renderPreviewButton()}</Box>
    </Row>
  ) : (
    <Column>
      {renderTextInput()}
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
  value: PropTypes.string,
  onTextReady: PropTypes.func,
  placeholder: PropTypes.string,
  phoneticUrl: PropTypes.any,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  audioInstance: PropTypes.shape(AudioWrapper),
  phoneticLoading: PropTypes.bool,
  isAnimationOngoing: PropTypes.bool,
  boxPy: PropTypes.number,
  boxPx: PropTypes.number,
  previewButtonInsideInput: PropTypes.bool,
};

TextVoicePreviewInput.defaultProps = {
  boxPy: 14,
  boxPx: 21,
};

const mapStateToProps = createStructuredSelector({
  audioInstance: makeSelectAudioInstance(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TextVoicePreviewInput);
