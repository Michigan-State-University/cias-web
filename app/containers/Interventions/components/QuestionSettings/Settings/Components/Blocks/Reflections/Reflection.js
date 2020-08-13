/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import join from 'lodash/join';

import Column from 'components/Column';
import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Loader from 'components/Loader';
import Img from 'components/Img';
import Text from 'components/Text';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';

import { colors, themeColors } from 'theme';

import { makeSelectLoader } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { makeSelectPreviewData } from 'containers/Interventions/components/QuestionNarrator/selectors';
import {
  updatePreviewData,
  updatePreviewAnimation,
} from 'containers/Interventions/containers/EditInterventionPage/actions';

import { speechType } from 'models/Narrator/BlockTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import messages from '../../messages';
import { updateReflection } from '../../../actions';

const BUTTON_MARGIN = '10px';

const Reflection = ({
  formatMessage,
  reflection,
  blockIndex,
  reflectionIndex,
  id,
  updateText,
  previewData,
  updateLoader,
  updateNarratorPreviewData,
  updateNarratorPreviewAnimation,
  block,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(join(reflection.text, ''));
  const [hasFocus, setHasFocus] = useState(false);
  const [isSpeechUpdating, setIsSpeechUpdating] = useState(false);
  const [inputVisible, setInputVisible] = useState(text !== '');

  useEffect(() => {
    setText(join(reflection.text, ''));
  }, [reflection.text]);

  useEffect(() => {
    if (previewData.type !== speechType) setIsPlaying(false);
  }, [previewData]);

  const handleTextUpdate = value =>
    updateText(
      blockIndex,
      reflectionIndex,
      splitAndKeep(value, [',', '.', '?', '!']),
      id,
    );

  useEffect(() => {
    if (!updateLoader) setIsSpeechUpdating(false);
  }, [updateLoader]);

  const handleButtonClick = () => {
    if (isPlaying) updateNarratorPreviewAnimation('standStill');
    else
      updateNarratorPreviewData({
        ...reflection,
        type: speechType,
        position: block.position,
        animation: block.animation,
      });

    setIsPlaying(!isPlaying);
  };

  const handleBlur = value => {
    setIsSpeechUpdating(true);
    handleTextUpdate(value);
    setHasFocus(false);
  };

  const button = isPlaying ? stopButton : playButton;

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
  };

  return (
    <Column>
      <Box mt={15}>{reflection.payload}</Box>
      {inputVisible ? (
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
      ) : (
        <Text
          fontWeight="bold"
          color={themeColors.secondary}
          onClick={() => setInputVisible(true)}
          clickable
        >
          {formatMessage(messages.addReflection)}
        </Text>
      )}
    </Column>
  );
};

Reflection.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  reflection: PropTypes.object,
  blockIndex: PropTypes.number,
  reflectionIndex: PropTypes.number,
  updateText: PropTypes.func,
  previewData: PropTypes.object,
  updateLoader: PropTypes.bool,
  updateNarratorPreviewData: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  block: PropTypes.shape({
    type: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestion'),
  previewData: makeSelectPreviewData(),
});

const mapDispatchToProps = {
  updateText: (blockIndex, reflectionIndex, text, id) =>
    updateReflection(blockIndex, reflectionIndex, { text }, id),
  updateNarratorPreviewData: updatePreviewData,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Reflection);
