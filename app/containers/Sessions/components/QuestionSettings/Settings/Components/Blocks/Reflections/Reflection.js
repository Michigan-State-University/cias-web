/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import join from 'lodash/join';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import Column from 'components/Column';
import Text from 'components/Text';
import { themeColors } from 'theme';
import {
  makeSelectLoader,
  makeSelectNameQuestionExists,
} from 'global/reducers/questions';
import { speechType } from 'models/Narrator/BlockTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import {
  updatePreviewData,
  updatePreviewAnimation,
  makeSelectPreviewData,
} from 'global/reducers/localState';

import messages from '../../messages';
import { updateReflection } from '../../../actions';
import SpeechInput from '../SpeechInput';

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
  disabled,
  nameQuestionExists,
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

  const handleTextUpdate = (value) =>
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

  const handleBlur = (value) => {
    setIsSpeechUpdating(true);
    handleTextUpdate(value);
    setHasFocus(false);
  };

  return (
    <Column>
      <Box mt={15}>{reflection.payload}</Box>
      {inputVisible ? (
        <SpeechInput
          formatMessage={formatMessage}
          setHasFocus={setHasFocus}
          isSpeechUpdating={isSpeechUpdating}
          isPlaying={isPlaying}
          hasFocus={hasFocus}
          handleButtonClick={handleButtonClick}
          handleBlur={handleBlur}
          text={text}
          disabled={disabled}
          nameQuestionExists={nameQuestionExists}
        />
      ) : (
        <Text
          disabled={disabled}
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
    position: PropTypes.number,
    animation: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  nameQuestionExists: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
  nameQuestionExists: makeSelectNameQuestionExists(),
});

const mapDispatchToProps = {
  updateText: (blockIndex, reflectionIndex, text, id) =>
    updateReflection(blockIndex, reflectionIndex, { text }, id),
  updateNarratorPreviewData: updatePreviewData,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Reflection);
