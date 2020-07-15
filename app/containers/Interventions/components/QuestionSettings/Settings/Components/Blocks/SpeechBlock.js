import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import Box from 'components/Box';
import Img from 'components/Img';
import Loader from 'components/Loader';
import { StyledInput } from 'components/Input/StyledInput';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';

import AudioWrapper from 'utils/audioWrapper';
import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import messages from '../messages';
import { updateSpeechSettings } from '../../actions';

const BUTTON_MARGIN = '10px';

const SpeechBlock = ({ formatMessage, block, updateText, blockIndex, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef(new AudioWrapper());

  const handleLoad = () => setIsLoading(true);
  const handleReady = () => setIsLoading(false);

  useEffect(() => {
    audio.current.onLoading(handleLoad);
    audio.current.onLoaded(handleReady);
    audio.current.onEnded(() => setIsPlaying(false));

    audio.current.setSrc(block.audio_url);

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

  const renderButton = () => {
    if (isLoading) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
  };

  return (
    <Column>
      <Box mt={15}>{formatMessage(globalMessages.blockTypes[block.type])}</Box>
      <Box position="relative">
        <Box mt={15} bg={colors.linkWater} width="100%">
          <StyledInput
            type="multiline"
            rows="10"
            placeholder={formatMessage(messages.speechPlaceholder)}
            value={block.text}
            onBlur={val => updateText(blockIndex, val, id)}
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
};

const mapDispatchToProps = {
  updateText: updateSpeechSettings,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SpeechBlock);
