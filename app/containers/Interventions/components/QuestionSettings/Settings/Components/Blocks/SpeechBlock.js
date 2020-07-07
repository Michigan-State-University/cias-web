import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import Box from 'components/Box';
import Img from 'components/Img';
import { StyledInput } from 'components/Input/StyledInput';

import playButton from 'assets/svg/play-button-1.svg';

import AudioWrapper from 'utils/audioWrapper';
import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import messages from '../messages';
import { updateSpeechSettings } from '../../actions';

const BUTTON_MARGIN = '10px';

const SpeechBlock = ({ formatMessage, block, updateText, blockIndex, id }) => {
  const audio = new AudioWrapper(block.audio_url);

  const playAudio = () => audio.play();
  const stopAudio = () => audio.stop();

  const handleButtonClick = () => {
    if (block.audio_url)
      if (audio.stopped) playAudio();
      else stopAudio();
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
        <Img
          position="absolute"
          bottom={BUTTON_MARGIN}
          right={BUTTON_MARGIN}
          src={playButton}
          onClick={handleButtonClick}
          clickable
        />
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
