/* eslint-disable no-restricted-syntax */
import React, { useState, useMemo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import keys from 'lodash/keys';
import values from 'lodash/values';

import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';
import Row from 'components/Row';
import Switch from 'components/Switch';
import Text from 'components/Text';
import ArrowDropdown from 'components/ArrowDropdown';

import Question from 'models/Session/Question';
import {
  singleQuestion,
  gridQuestion,
  multiQuestion,
  feedbackQuestion,
} from 'models/Session/QuestionTypes';
import { findQuestionById } from 'models/Session/utils';
import { htmlToPlainText } from 'utils/htmlToPlainText';

import {
  makeSelectLoader,
  makeSelectSelectedQuestion,
  makeSelectQuestions,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';
import { makeSelectPreviewData } from 'global/reducers/localState';

import { speechType, reflectionFormulaType } from 'models/Narrator/BlockTypes';
import { feedbackActions } from 'models/Narrator/FeedbackActions';
import { speechAnimations } from 'utils/animations/animationsNames';
import messages from '../../messages';
import animationMessages from '../messages';
import { updateBlockSettings, switchSpeechReflection } from '../../../actions';

import QuestionListDropdown from './QuestionListDropdown';
import Reflection from './Reflection';
import ClearAnimationButton from '../clearAnimationButton';

const setUpReflections = question => {
  switch (question.type) {
    case singleQuestion.id: {
      const variableName = question.body.variable.name;

      return question.body.data.map(el => ({
        variable: variableName,
        value: el.value,
        payload: htmlToPlainText(el.payload),
        text: [],
        sha256: [],
        audio_urls: [],
      }));
    }
    case multiQuestion.id: {
      return question.body.data.map(el => ({
        variable: el.variable.name,
        value: el.variable.value,
        payload: htmlToPlainText(el.payload),
        text: [],
        sha256: [],
        audio_urls: [],
      }));
    }
    case gridQuestion.id: {
      const reflections = [];
      const { rows } = question.body.data[0].payload;
      const { columns } = question.body.data[0].payload;

      for (const row of rows) {
        for (const column of columns) {
          reflections.push({
            variable: row.variable.name,
            value: column.variable.value,
            payload: `${htmlToPlainText(row.payload)} - ${htmlToPlainText(
              column.payload,
            )}`,
            text: [],
            sha256: [],
            audio_urls: [],
          });
        }
      }

      return reflections;
    }
    default:
      return [];
  }
};

const ReflectionBlock = ({
  formatMessage,
  block,
  updateAnimation,
  blockIndex,
  id,
  switchToSpeech,
  questions,
  updateQuestion,
  currentQuestionType,
  updateAction,
  switchToReflectionFormula,
  disabled,
}) => {
  const [targetChooserOpen, setTargetChooserOpen] = useState(false);

  const selectedQuestion = findQuestionById(questions, block.question_id);

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

  const selectedOption = selectOptions.find(
    option => option.value === block.animation,
  );

  const selectedFeedbackOption = feedbackOptions.find(
    option => option.value === block.action,
  );

  const hasSpecialPositioning = block.action !== feedbackActions.noAction;

  return (
    <Column>
      <ClearAnimationButton blockIndex={blockIndex} />
      {currentQuestionType === feedbackQuestion.id && (
        <>
          <Box mt={15}>{formatMessage(messages.selectActionPosition)}</Box>
          <Box mt={15}>
            <Select
              selectProps={{
                isDisabled: disabled,
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
                isDisabled: disabled,
                options: selectOptions,
                value: selectedOption,
                onChange: ({ value }) => updateAnimation(blockIndex, value, id),
              }}
            />
          </Box>
        </>
      )}
      <Row my={15} align="center" justify="between">
        {formatMessage(messages.reflectionToggle)}
        <Switch
          disabled={disabled}
          checked
          mr={15}
          onToggle={() => switchToSpeech(blockIndex, id)}
        />
      </Row>
      <Row mb={15} align="center" justify="between">
        {formatMessage(messages.formulaToggle)}
        <Switch
          disabled={disabled}
          mr={15}
          onToggle={() => switchToReflectionFormula(blockIndex, id)}
        />
      </Row>
      <ArrowDropdown
        disabled={disabled}
        width="100%"
        childWidthScope="parent"
        positionFrom="right"
        setOpen={value => setTargetChooserOpen(value)}
        isOpened={targetChooserOpen}
        dropdownContent={
          <Box>
            <Text textOverflow="ellipsis" whiteSpace="pre" overflow="hidden">
              {selectedQuestion
                ? htmlToPlainText(selectedQuestion.subtitle)
                : formatMessage(messages.chooseQuestion)}
            </Text>
          </Box>
        }
      >
        <QuestionListDropdown
          isVisible={targetChooserOpen}
          chosenQuestionId={block.question_id}
          onClick={question => {
            setTargetChooserOpen(false);
            updateQuestion(
              blockIndex,
              {
                questionId: question.id,
                reflections: setUpReflections(question),
              },
              id,
            );
          }}
        />
      </ArrowDropdown>
      <Box mt={15}>
        {block.reflections.map((reflection, index) => (
          <Reflection
            disabled={disabled}
            key={`${id}-reflection-${index}`}
            formatMessage={formatMessage}
            id={id}
            reflectionIndex={index}
            blockIndex={blockIndex}
            reflection={reflection}
            block={block}
          />
        ))}
      </Box>
    </Column>
  );
};

ReflectionBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
    question_id: PropTypes.string,
    animation: PropTypes.string,
    action: PropTypes.string,
    reflections: PropTypes.arrayOf(PropTypes.object),
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateAnimation: PropTypes.func,
  switchToSpeech: PropTypes.func,
  switchToReflectionFormula: PropTypes.func,
  updateQuestion: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  updateAction: PropTypes.func,
  currentQuestionType: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestionLoading'),
  previewData: makeSelectPreviewData(),
  selectedQuestion: makeSelectSelectedQuestion(),
  questions: makeSelectQuestions(),
  currentQuestionType: makeSelectSelectedQuestionType(),
});

const mapDispatchToProps = {
  updateText: (index, text, id) => updateBlockSettings(index, { text }, id),
  updateAnimation: (index, animation, id) =>
    updateBlockSettings(index, { animation }, id),
  switchToSpeech: (index, id) => switchSpeechReflection(index, id, speechType),
  switchToReflectionFormula: (index, id) =>
    switchSpeechReflection(index, id, reflectionFormulaType),
  updateQuestion: (index, { questionId, reflections }, id) =>
    updateBlockSettings(index, { question_id: questionId, reflections }, id),
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

export default compose(withConnect)(ReflectionBlock);
