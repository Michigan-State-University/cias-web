/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import join from 'lodash/join';

import Column from 'components/Column';
import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';
import InequalityChooser from 'components/InequalityChooser';
import binNoBg from 'assets/svg/bin-no-bg.svg';

import {
  makeSelectLoader,
  makeSelectNameQuestionExists,
} from 'global/reducers/questions';
import {
  makeSelectPreviewData,
  updatePreviewData,
  updatePreviewAnimation,
} from 'global/reducers/localState';

import { speechType } from 'models/Narrator/BlockTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import messages from '../../messages';
import { removeFormulaCase, updateFormulaCase } from './actions';
import SpeechInput from '../SpeechInput';

const Reflection = ({
  formatMessage,
  reflection,
  blockIndex,
  reflectionIndex,
  id,
  previewData,
  updateLoader,
  updateNarratorPreviewData,
  updateNarratorPreviewAnimation,
  block,
  onRemoveCase,
  updateText,
  updateCase,
  disabled,
  nameQuestionExists,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(join(reflection.text, ''));
  const [hasFocus, setHasFocus] = useState(false);
  const [isSpeechUpdating, setIsSpeechUpdating] = useState(false);

  useEffect(() => {
    setText(join(reflection.text, ''));
  }, [reflection.text]);

  useEffect(() => {
    if (previewData.type !== speechType) setIsPlaying(false);
  }, [previewData]);

  const handleTextUpdate = value =>
    updateText(
      reflectionIndex,
      splitAndKeep(value, [',', '.', '?', '!']),
      id,
      blockIndex,
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

  return (
    <Column mb={16}>
      <Row
        key={`${id}-settings-feedback-spectrum-case-${reflectionIndex}`}
        align="center"
        justify="between"
        mb={8}
      >
        <Row align="center">
          <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
          <InequalityChooser
            disabled={disabled}
            onSuccessfulChange={value =>
              updateCase(reflectionIndex, value, id, blockIndex)
            }
            inequalityValue={reflection.match}
          />
          <Text whiteSpace="pre" mr={10}>
            {formatMessage(messages.equalsTo)}
          </Text>
        </Row>

        {!disabled && (
          <Img
            ml={10}
            src={binNoBg}
            onClick={() => onRemoveCase(reflectionIndex, id, blockIndex)}
            clickable
          />
        )}
      </Row>
      <Row>
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
      </Row>
    </Column>
  );
};

Reflection.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  reflection: PropTypes.object,
  blockIndex: PropTypes.number,
  reflectionIndex: PropTypes.number,
  previewData: PropTypes.object,
  updateLoader: PropTypes.bool,
  updateNarratorPreviewData: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  block: PropTypes.shape({
    type: PropTypes.string,
    position: PropTypes.number,
    animation: PropTypes.string,
  }),
  onRemoveCase: PropTypes.func,
  updateCase: PropTypes.func,
  updateText: PropTypes.func,
  disabled: PropTypes.bool,
  nameQuestionExists: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
  nameQuestionExists: makeSelectNameQuestionExists(),
});

const mapDispatchToProps = {
  updateText: (reflectionIndex, text, id, blockIndex) =>
    updateFormulaCase(reflectionIndex, { text }, id, blockIndex),
  updateCase: (reflectionIndex, match, id, blockIndex) =>
    updateFormulaCase(reflectionIndex, { match }, id, blockIndex),
  updateNarratorPreviewData: updatePreviewData,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  onRemoveCase: removeFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Reflection);
