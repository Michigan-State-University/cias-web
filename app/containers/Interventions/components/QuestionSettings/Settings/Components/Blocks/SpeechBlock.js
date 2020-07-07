import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Column from 'components/Column';
import Box from 'components/Box';
import Img from 'components/Img';
import { StyledInput } from 'components/Input/StyledInput';

import playButton from 'assets/svg/play-button-1.svg';

import { colors } from 'theme';

import messages from '../messages';
import { updateSpeechSettings } from '../../actions';

const BUTTON_MARGIN = '10px';

const SpeechBlock = ({ formatMessage, block, updateText, blockIndex, id }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const img = useRef(null);

  useEffect(() => {
    setImgWidth(img.current.width);
  }, [img]);

  return (
    <Column>
      <Box mt={15}>{formatMessage(messages.speech)}</Box>
      <Box mt={15} bg={colors.linkWater} width="100%">
        <StyledInput
          type="multiline"
          rows="10"
          placeholder={formatMessage(messages.speechPlaceholder)}
          value={block.text}
          onBlur={val => updateText(blockIndex, val, id)}
        />
        <Img
          ref={img}
          position="relative"
          left={`calc(100% - ${imgWidth}px - ${BUTTON_MARGIN})`}
          bottom={BUTTON_MARGIN}
          src={playButton}
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
