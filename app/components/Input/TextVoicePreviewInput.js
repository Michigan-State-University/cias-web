import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

import { themeColors } from 'theme';
import { makeSelectAudioInstance } from 'global/reducers/globalState';
import {
  allAudioPreviewSagas,
  AudioPreviewReducer,
  makeSelectAudioPreviewState,
  phoneticPreviewRequest,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';
import AudioWrapper from 'utils/audioWrapper';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Row from 'components/Row';
import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import { PlayStopButton } from 'components/ActionIcons';

import messages from './messages';

const TextVoicePreviewInput = ({
  value,
  placeholder,
  disabled,
  styles,
  audioInstance,
  isAnimationOngoing,
  boxPx,
  boxPy,
  previewButtonInsideInput,
  audioPreviewRequest,
  audioPreview: { phoneticUrl, phoneticLoading },
  resetAudioPreview,
  phoneticPreviewParams,
  previewValidation,
  onTextReady,
}) => {
  const { formatMessage } = useIntl();

  const [isPlaying, setIsPlaying] = useState(false);
  const [previewText, setPreviewText] = useState('');

  useEffect(() => {
    resetAudioPreview();
  }, []);

  useEffect(() => {
    if (value && previewText.length === 0) {
      setPreviewText(value);
    }
  }, [value]);

  useEffect(() => {
    if (onTextReady && previewText) onTextReady(previewText);
  }, [previewText]);

  useEffect(() => {
    if (
      previewText.length !== 0 &&
      (!previewValidation || previewValidation())
    ) {
      audioPreviewRequest(previewText, phoneticPreviewParams);
    }
  }, [previewText, previewValidation]);

  const audioButtonDisabled =
    disabled || phoneticUrl === null || phoneticLoading || isAnimationOngoing;

  const onSpeechReady = () => audioInstance.start();
  const onFinish = () => {
    audioInstance.clean();
    audioInstance.stop();
    setIsPlaying(false);
  };

  const playPreview = () => {
    if (isPlaying) {
      onFinish();
      return;
    }

    if (audioButtonDisabled) return;

    setIsPlaying(true);

    audioInstance.onEnded(onFinish);
    audioInstance.onError(onFinish);
    audioInstance.onLoaded(onSpeechReady);
    audioInstance.setSrc(phoneticUrl);
  };

  const saveText = (event) => setPreviewText(event.target.value);

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

    return (
      <PlayStopButton
        isPlaying={isPlaying}
        onClick={playPreview}
        disabled={audioButtonDisabled}
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
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  audioInstance: PropTypes.shape(AudioWrapper),
  isAnimationOngoing: PropTypes.bool,
  boxPy: PropTypes.number,
  boxPx: PropTypes.number,
  previewButtonInsideInput: PropTypes.bool,
  audioPreview: PropTypes.object,
  audioPreviewRequest: PropTypes.func,
  resetAudioPreview: PropTypes.func,
  phoneticPreviewParams: PropTypes.object,
  previewValidation: PropTypes.func,
  onTextReady: PropTypes.func,
};

TextVoicePreviewInput.defaultProps = {
  boxPy: 14,
  boxPx: 21,
};

const mapStateToProps = createStructuredSelector({
  audioInstance: makeSelectAudioInstance(),
  audioPreview: makeSelectAudioPreviewState(),
});

const mapDispatchToProps = {
  audioPreviewRequest: phoneticPreviewRequest,
  resetAudioPreview: resetPhoneticPreview,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectReducer({ key: 'audioPreview', reducer: AudioPreviewReducer }),
  injectSaga({
    key: 'audioPreview',
    saga: allAudioPreviewSagas,
  }),
  withConnect,
)(TextVoicePreviewInput);
