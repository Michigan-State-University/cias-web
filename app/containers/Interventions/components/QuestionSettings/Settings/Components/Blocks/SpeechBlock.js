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
import Img from 'components/Img';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Select from 'components/Select';
import Switch from 'components/Switch';

import playButton from 'assets/svg/play-button-1.svg';
import stopButton from 'assets/svg/stop-button-1.svg';
import { StyledInput } from 'components/Input/StyledInput';
import { colors } from 'theme';
import {
  makeSelectLoader,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';
import { speechAnimations } from 'utils/animations/animationsNames';
import { speechType, readQuestionBlockType } from 'models/Narrator/BlockTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import {
  makeSelectPreviewData,
  updatePreviewData,
  updatePreviewAnimation,
} from 'global/reducers/localState';

import { feedbackQuestion } from 'models/Intervention/QuestionTypes';
import { feedbackActions } from 'models/Narrator/FeedbackActions';
import animationMessages from './messages';
import { updateBlockSettings, switchSpeechReflection } from '../../actions';
import messages from '../messages';

const BUTTON_MARGIN = '10px';

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

    return animations.map(animation => ({
      value: animation,
      label: formatMessage(animationMessages[animation]),
    }));
  }, [speechAnimations]);

  const feedbackOptions = useMemo(() => {
    const options = values(feedbackActions).filter(
      action => action !== feedbackActions.showSpectrum,
    );

    return options.map(option => ({
      value: option,
      label: formatMessage(messages[option]),
    }));
  }, [feedbackActions]);

  const handleTextUpdate = value =>
    updateText(blockIndex, splitAndKeep(value, [',', '.', '?', '!']), id);

  useEffect(() => {
    if (!updateLoader) setIsSpeechUpdating(false);
  }, [updateLoader]);

  const handleButtonClick = () => {
    if (isPlaying) updateNarratorPreviewAnimation('standStill');
    else updateNarratorPreviewData(block);

    setIsPlaying(!isPlaying);
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

  const selectedFeedbackOption = feedbackOptions.find(
    option => option.value === block.action,
  );

  const hasSpecialPositioning = block.action !== feedbackActions.noAction;

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
  };

  return (
    <Column>
      {currentQuestionType === feedbackQuestion.id &&
        block.type !== readQuestionBlockType && (
          <>
            <Box mt={15}>{formatMessage(messages.selectActionPosition)}</Box>
            <Box mt={15}>
              <Select
                selectProps={{
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
              mr={15}
              onToggle={() => switchToReflection(blockIndex, id)}
            />
          </Row>
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
        </>
      )}
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
  updateNarratorPreviewData: PropTypes.func,
  updateNarratorPreviewAnimation: PropTypes.func,
  previewData: PropTypes.object,
  switchToReflection: PropTypes.func,
  updateAction: PropTypes.func,
  currentQuestionType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
  currentQuestionType: makeSelectSelectedQuestionType(),
});

const mapDispatchToProps = {
  updateText: (index, text, id) => updateBlockSettings(index, { text }, id),
  updateAnimation: (index, animation, id) =>
    updateBlockSettings(index, { animation }, id),
  updateNarratorPreviewData: updatePreviewData,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  switchToReflection: (index, id) => switchSpeechReflection(index, id),
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SpeechBlock);
