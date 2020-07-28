import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import keys from 'lodash/keys';
import join from 'lodash/join';

import Column from 'components/Column';
import Box from 'components/Box';
import Img from 'components/Img';
import Loader from 'components/Loader';
import { StyledInput } from 'components/Input/StyledInput';
import Select from 'components/Select';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';

import AudioWrapper from 'utils/audioWrapper';
import { splitAndKeep } from 'utils/splitAndKeep';
import { colors } from 'theme';

import { makeSelectLoader } from 'containers/Interventions/containers/EditInterventionPage/selectors';

import globalMessages from 'global/i18n/globalMessages';
import { speechAnimations } from 'utils/animations/animationsNames';
import messages from '../messages';
import animationMessages from './messages';
import { updateSpeechSettings } from '../../actions';

const BUTTON_MARGIN = '10px';

const SpeechBlock = ({
  formatMessage,
  block,
  updateText,
  updateAnimation,
  blockIndex,
  id,
  updateLoader,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(join(block.text, ''));
  const [hasFocus, setHasFocus] = useState(false);
  const [isSpeechUpdating, setIsSpeechUpdating] = useState(false);

  useEffect(() => {
    setText(join(block.text, ''));
  }, [block.text]);

  const selectOptions = useMemo(() => {
    const animations = keys(speechAnimations);

    return animations.map(animation => ({
      value: animation,
      label: formatMessage(animationMessages[animation]),
    }));
  }, [speechAnimations]);

  const audio = useRef(new AudioWrapper());

  const handleTextUpdate = value =>
    updateText(blockIndex, splitAndKeep(value, [',', '.', '?', '!']), id);

  const handleLoad = () => {
    stopAudio();
    setIsLoading(true);
  };

  const handleReady = () => setIsLoading(false);

  useEffect(() => {
    audio.current.onLoading(handleLoad);
    audio.current.onLoaded(handleReady);
    audio.current.onEnded(() => setIsPlaying(false));

    const { audio_urls: audioUrls } = block;
    if (audioUrls) audio.current.setSrc(audioUrls);

    return audio.current.clean;
  }, [blockIndex]);

  useEffect(() => {
    if (!updateLoader) setIsSpeechUpdating(false);
  }, [updateLoader]);

  const playAudio = () => audio.current.play();
  const stopAudio = () => audio.current.stop();

  const handleButtonClick = () => {
    if (!isLoading) {
      if (isPlaying) stopAudio();
      else playAudio();

      setIsPlaying(!isPlaying);
    }
  };

  const handleBlur = value => {
    setIsSpeechUpdating(true);
    handleTextUpdate(value);
    setHasFocus(false);
  };

  const button = isPlaying ? stopButton : playButton;

  const selectedOption = selectOptions.find(
    option => option.value === block.animation,
  );

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
  };

  return (
    <Column>
      <Box mt={15}>{formatMessage(globalMessages.blockTypes[block.type])}</Box>
      <Box mt={15}>
        <Select
          selectProps={{
            options: selectOptions,
            value: selectedOption,
            onChange: ({ value }) => updateAnimation(blockIndex, value, id),
          }}
        />
      </Box>
      <Box position="relative">
        <Box mt={15} bg={colors.linkWater} width="100%">
          <StyledInput
            type="multiline"
            rows="10"
            placeholder={formatMessage(messages.speechPlaceholder)}
            value={text}
            onBlur={handleBlur}
            onFocus={() => setHasFocus(true)}
          />
        </Box>
        <Box
          position="absolute"
          bottom={BUTTON_MARGIN}
          right={BUTTON_MARGIN}
          hidden={hasFocus}
        >
          {renderButton()}
        </Box>
      </Box>
    </Column>
  );
};

SpeechBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.arrayOf(PropTypes.string),
    audio_urls: PropTypes.arrayOf(PropTypes.string),
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateText: PropTypes.func,
  updateAnimation: PropTypes.func,
  updateLoader: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestion'),
});

const mapDispatchToProps = {
  updateText: (index, text, id) => updateSpeechSettings(index, { text }, id),
  updateAnimation: (index, animation, id) =>
    updateSpeechSettings(index, { animation }, id),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SpeechBlock);
