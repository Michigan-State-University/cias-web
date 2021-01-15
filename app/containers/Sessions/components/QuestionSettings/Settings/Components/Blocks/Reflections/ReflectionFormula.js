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
import Row from 'components/Row';
import InequalityChooser from 'components/InequalityChooser';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';
import binNoBg from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { makeSelectLoader } from 'global/reducers/questions';
import {
  makeSelectPreviewData,
  updatePreviewData,
  updatePreviewAnimation,
} from 'global/reducers/localState';

import { speechType } from 'models/Narrator/BlockTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import messages from '../../messages';
import { removeFormulaCase, updateFormulaCase } from './actions';

const BUTTON_MARGIN = '10px';

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

  const button = isPlaying ? stopButton : playButton;

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
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
        <Box position="relative" width="100%">
          <Box bg={colors.linkWater}>
            <StyledInput
              disabled={disabled}
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
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
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
