/* eslint-disable no-restricted-syntax */
import React, { useState, useMemo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import keys from 'lodash/keys';
import values from 'lodash/values';

import { colors, themeColors } from 'theme';

import VariableChooser from 'containers/BranchingLayout/VariableChooser';
import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';
import Row from 'components/Row';
import Switch from 'components/Switch';
import Text from 'components/Text';

import { StyledInput } from 'components/Input/StyledInput';

import { feedbackQuestion } from 'models/Intervention/QuestionTypes';
import { speechType, reflectionType } from 'models/Narrator/BlockTypes';

import {
  makeSelectLoader,
  makeSelectSelectedQuestion,
  makeSelectQuestions,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';
import { makeSelectPreviewData } from 'global/reducers/localState';

import { feedbackActions } from 'models/Narrator/FeedbackActions';
import { speechAnimations } from 'utils/animations/animationsNames';
import messages from '../../messages';
import animationMessages from '../messages';
import { updateBlockSettings, switchSpeechReflection } from '../../../actions';

import { DashedBox } from './styled';
import { updateFormula, addFormulaCase } from './actions';
import ReflectionFormula from './ReflectionFormula';
import ClearAnimationButton from '../clearAnimationButton';

const ReflectionFormulaBlock = ({
  formatMessage,
  block,
  updateAnimation,
  blockIndex,
  id,
  switchToSpeech,
  currentQuestionType,
  updateAction,
  switchToReflection,
  onFormulaUpdate,
  onAddCase,
  disabled,
}) => {
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

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
          checked
          mr={15}
          onToggle={() => switchToReflection(blockIndex, id)}
        />
      </Row>

      <Row mt={20} align="center" justify="between">
        <Text fontWeight="bold">{formatMessage(messages.formulaHeader)}</Text>
        <Box
          onClick={() =>
            !disabled && setVariableChooserOpen(!variableChooserOpen)
          }
          clickable
        >
          <Text
            disabled={disabled}
            fontWeight="bold"
            color={themeColors.secondary}
            hoverDecoration="underline"
          >
            {formatMessage(messages.addVariable)}
          </Text>
        </Box>
      </Row>
      <Box position="relative" mt={10}>
        <VariableChooser
          visible={variableChooserOpen}
          setOpen={setVariableChooserOpen}
          onClick={value => {
            setVariableChooserOpen(false);
            onFormulaUpdate(`${block.payload}${value}`, id, blockIndex);
          }}
        />
      </Box>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={40} px={8} py={8}>
        <StyledInput
          disabled={disabled}
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.formulaPlaceholder)}
          value={block.payload}
          onBlur={value => onFormulaUpdate(value, id, blockIndex)}
        />
      </Box>
      {block.reflections.map((reflection, index) => (
        <ReflectionFormula
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
      <DashedBox
        disabled={disabled}
        mt={20}
        onClick={() => onAddCase(id, blockIndex)}
      >
        {formatMessage(messages.newCase)}
      </DashedBox>
    </Column>
  );
};

ReflectionFormulaBlock.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  block: PropTypes.shape({
    type: PropTypes.string,
  }),
  id: PropTypes.string,
  blockIndex: PropTypes.number,
  updateAnimation: PropTypes.func,
  switchToSpeech: PropTypes.func,
  switchToReflection: PropTypes.func,
  updateAction: PropTypes.func,
  currentQuestionType: PropTypes.string,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  updateLoader: makeSelectLoader('updateQuestion'),
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
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReflectionFormulaBlock);
