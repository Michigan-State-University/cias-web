import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import keys from 'lodash/keys';

import Column from 'components/Column';
import Box from 'components/Box';
import Img from 'components/Img';
import Loader from 'components/Loader';
import { StyledInput } from 'components/Input/StyledInput';
import Select from 'components/Select';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';

import AudioWrapper from 'utils/audioWrapper';
import { colors } from 'theme';

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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const animations = keys(speechAnimations);
  const selectOptions = animations.map(animation => ({
    value: animation,
    label: formatMessage(animationMessages[animation]),
  }));

  const audio = useRef(new AudioWrapper());

  const handleLoad = () => setIsLoading(true);
  const handleReady = () => setIsLoading(false);

  useEffect(() => {
    audio.current.onLoading(handleLoad);
    audio.current.onLoaded(handleReady);
    audio.current.onEnded(() => setIsPlaying(false));

    const { audio_url: audioUrl } = block;
    if (audioUrl) audio.current.setSrc(audioUrl);

    return audio.current.clean;
  }, [blockIndex]);

  const playAudio = () => audio.current.play();
  const stopAudio = () => audio.current.stop();

  const handleButtonClick = () => {
    if (!isLoading) {
      if (isPlaying) stopAudio();
      else playAudio();

      setIsPlaying(!isPlaying);
    }
  };

  const button = isPlaying ? stopButton : playButton;

  const selectedOption = selectOptions.find(
    option => option.value === block.animation,
  );

  const renderButton = () => {
    if (isLoading) return <Loader size={24} type="inline" />;

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
            value={block.text}
            onBlur={value => updateText(blockIndex, value, id)}
          />
        </Box>
        <Box position="absolute" bottom={BUTTON_MARGIN} right={BUTTON_MARGIN}>
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
    text: PropTypes.string,
    audio_url: PropTypes.string,
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateText: PropTypes.func,
  updateAnimation: PropTypes.func,
};

const mapDispatchToProps = {
  updateText: (index, text, id) => updateSpeechSettings(index, { text }, id),
  updateAnimation: (index, animation, id) =>
    updateSpeechSettings(index, { animation }, id),
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SpeechBlock);
