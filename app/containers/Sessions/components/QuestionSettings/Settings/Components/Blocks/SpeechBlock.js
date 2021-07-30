import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import join from 'lodash/join';
import keys from 'lodash/keys';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import values from 'lodash/values';

import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Select from 'components/Select';
import Switch from 'components/Switch';
import {
  makeSelectLoader,
  makeSelectSelectedQuestionType,
  makeSelectNameQuestionExists,
} from 'global/reducers/questions';
import { speechAnimations } from 'utils/animations/animationsNames';
import { splitAndKeep } from 'utils/splitAndKeep';
import {
  makeSelectPreviewData,
  updatePreviewData,
  updatePreviewAnimation,
} from 'global/reducers/localState';
import {
  speechType,
  readQuestionBlockType,
  reflectionType,
} from 'models/Narrator/BlockTypes';

import { feedbackQuestion } from 'models/Session/QuestionTypes';
import { feedbackActions } from 'models/Narrator/FeedbackActions';
import animationMessages from './messages';
import { updateBlockSettings, switchSpeechReflection } from '../../actions';
import messages from '../messages';
import ClearAnimationButton from './clearAnimationButton';
import SpeechInput from './SpeechInput';

const SpeechBlock = ({
  formatMessage,
  block,
  updateText,
  updateAnimation,
  blockIndex,
  id,
  updateLoader,
  updateNarratorPreviewData,
  updateNarratorPreviewAnimation,
  previewData,
  switchToReflection,
  updateAction,
  currentQuestionType,
  disabled,
  animationDisabled,
  nameQuestionExists,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(join(block.text, ''));
  const [hasFocus, setHasFocus] = useState(false);
  const [isSpeechUpdating, setIsSpeechUpdating] = useState(false);

  useEffect(() => {
    setText(join(block.text, ''));
  }, [block.text]);

  useEffect(() => {
    if (previewData.type !== speechType) setIsPlaying(false);
  }, [previewData]);

  const selectOptions = useMemo(() => {
    const animations = keys(speechAnimations);

    return animations.map((animation) => ({
      value: animation,
      label: formatMessage(animationMessages[animation]),
    }));
  }, [speechAnimations]);

  const feedbackOptions = useMemo(() => {
    const options = values(feedbackActions).filter(
      (action) => action !== feedbackActions.showSpectrum,
    );

    return options.map((option) => ({
      value: option,
      label: formatMessage(messages[option]),
    }));
  }, [feedbackActions]);

  const handleTextUpdate = (value) =>
    updateText(blockIndex, splitAndKeep(value, [',', '.', '?', '!']), id);

  useEffect(() => {
    if (!updateLoader) setIsSpeechUpdating(false);
  }, [updateLoader]);

  const handleButtonClick = () => {
    if (isPlaying) updateNarratorPreviewAnimation('standStill');
    else updateNarratorPreviewData(block);

    setIsPlaying(!isPlaying);
  };

  const handleBlur = (value) => {
    setIsSpeechUpdating(true);
    handleTextUpdate(value);
    setHasFocus(false);
  };

  const selectedOption = selectOptions.find(
    (option) => option.value === block.animation,
  );

  const selectedFeedbackOption = feedbackOptions.find(
    (option) => option.value === block.action,
  );

  const hasSpecialPositioning = block.action !== feedbackActions.noAction;
  const isAnimationDisabled = disabled || animationDisabled;

  return (
    <Column>
      <ClearAnimationButton blockIndex={blockIndex} disabled={disabled} />
      {currentQuestionType === feedbackQuestion.id &&
        block.type !== readQuestionBlockType && (
          <>
            <Box mt={15}>{formatMessage(messages.selectActionPosition)}</Box>
            <Box mt={15}>
              <Select
                selectProps={{
                  isDisabled: isAnimationDisabled,
                  options: feedbackOptions,
                  value: selectedFeedbackOption,
                  onChange: ({ value }) => updateAction(blockIndex, value, id),
                }}
              />
            </Box>
          </>
        )}
      {!hasSpecialPositioning && (
        <>
          <Box mt={15}>{formatMessage(messages.speechAnimation)}</Box>
          <Box mt={15}>
            <Select
              selectProps={{
                isDisabled: isAnimationDisabled,
                options: selectOptions,
                value: selectedOption,
                onChange: ({ value }) => updateAnimation(blockIndex, value, id),
              }}
            />
          </Box>
        </>
      )}
      {block.type !== readQuestionBlockType && (
        <>
          <Row mt={15} align="center" justify="between">
            {formatMessage(messages.reflectionToggle)}
            <Switch
              disabled={disabled}
              mr={15}
              onToggle={() => switchToReflection(blockIndex, id)}
            />
          </Row>
          <SpeechInput
            formatMessage={formatMessage}
            disabled={disabled}
            text={text}
            handleBlur={handleBlur}
            handleButtonClick={handleButtonClick}
            hasFocus={hasFocus}
            isPlaying={isPlaying}
            isSpeechUpdating={isSpeechUpdating}
            setHasFocus={setHasFocus}
            nameQuestionExists={nameQuestionExists}
          />
        </>
      )}
    </Column>
  );
};

SpeechBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
    animation: PropTypes.string,
    action: PropTypes.string,
    text: PropTypes.arrayOf(PropTypes.string),
    audio_urls: PropTypes.arrayOf(PropTypes.string),
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateText: PropTypes.func,
  updateAnimation: PropTypes.func,
  updateLoader: PropTypes.bool,
  updateNarratorPreviewData: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  previewData: PropTypes.object,
  switchToReflection: PropTypes.func,
  updateAction: PropTypes.func,
  currentQuestionType: PropTypes.string,
  disabled: PropTypes.bool,
  animationDisabled: PropTypes.bool,
  nameQuestionExists: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
  currentQuestionType: makeSelectSelectedQuestionType(),
  nameQuestionExists: makeSelectNameQuestionExists(),
});

const mapDispatchToProps = {
  updateText: (index, text, id) => updateBlockSettings(index, { text }, id),
  updateAnimation: (index, animation, id) =>
    updateBlockSettings(index, { animation }, id),
  updateNarratorPreviewData: updatePreviewData,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  switchToReflection: (index, id) =>
    switchSpeechReflection(index, id, reflectionType),
  updateAction: (index, action, id) =>
    updateBlockSettings(
      index,
      {
        action,
        animation: action === feedbackActions.noAction ? 'rest' : 'pointUp',
      },
      id,
    ),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SpeechBlock);
