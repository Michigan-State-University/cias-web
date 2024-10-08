/* eslint-disable no-restricted-syntax */
import React, { useMemo, useContext } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import values from 'lodash/values';

import { colors, themeColors } from 'theme';

import { EditSessionPageContext } from 'containers/Sessions/containers/EditSessionPage/utils';
import VariableChooser from 'containers/VariableChooser';
import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';
import Row from 'components/Row';
import { FullWidthSwitch } from 'components/Switch';
import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import { StyledInput } from 'components/Input/StyledInput';

import { feedbackQuestion } from 'models/Session/QuestionTypes';
import { speechType, reflectionType } from 'models/Narrator/BlockTypes';
import { EFeedbackAction } from 'models/Narrator/FeedbackActions';

import {
  makeSelectLoader,
  makeSelectSelectedQuestion,
  makeSelectQuestions,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';
import { makeSelectPreviewData } from 'global/reducers/localState';
import animationsMessages from 'global/i18n/animationsMessages';
import { characterToSpeechAnimationsMap } from 'utils/animations/animationsNames';

import messages from '../../messages';
import feedbackActionsMessages from '../../feedbackActionsMessages';
import { updateBlockSettings, switchSpeechReflection } from '../../../actions';

import { DashedBox } from './styled';
import { updateFormula, addFormulaCase } from './actions';
import ReflectionFormula from './ReflectionFormula';

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
  selectedQuestion,
  character,
}) => {
  const { sessionId, interventionId } = useContext(EditSessionPageContext);

  const selectOptions = useMemo(() => {
    const animations = characterToSpeechAnimationsMap[character];

    return animations.map((animation) => ({
      value: animation,
      label: formatMessage(animationsMessages[animation]),
    }));
  }, [character]);

  const feedbackOptions = useMemo(() => {
    const options = values(EFeedbackAction).filter(
      (action) => action !== EFeedbackAction.SHOW_SPECTRUM,
    );

    return options.map((option) => ({
      value: option,
      label: formatMessage(feedbackActionsMessages[option]),
    }));
  }, [EFeedbackAction]);

  const selectedOption = selectOptions.find(
    (option) => option.value === block.animation,
  );

  const selectedFeedbackOption = feedbackOptions.find(
    (option) => option.value === block.action,
  );

  const hasSpecialPositioning = block.action !== EFeedbackAction.NO_ACTION;

  return (
    <Column>
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
        <FullWidthSwitch
          id="reflection-toggle"
          disabled={disabled}
          checked
          onToggle={() => switchToSpeech(blockIndex, id)}
        >
          {formatMessage(messages.reflectionToggle)}
        </FullWidthSwitch>
      </Row>
      <Row mb={15} align="center" justify="between">
        <FullWidthSwitch
          id="formula-toggle"
          disabled={disabled}
          checked
          onToggle={() => switchToReflection(blockIndex, id)}
        >
          {formatMessage(messages.formulaToggle)}
        </FullWidthSwitch>
      </Row>

      <Row mt={20} align="center" justify="between">
        <Box display="flex" mt={0} mb={0} px={0} py={0}>
          <Text fontWeight="bold">{formatMessage(messages.formulaHeader)}</Text>
          <HelpIconTooltip
            id="formula_tooltip"
            mx={8}
            tooltipContent={formatMessage({
              id: `app.GlobalMessages.formulasTooltip`,
              defaultMessage: `For details how to construct mathematical or logical equations please visit <a href='https://www.cias.app/resources' target='_blank'>www.cias.app/resources</a>`,
            })}
            iconProps={{ fill: colors.manatee }}
          />
        </Box>
        <VariableChooser
          disabled={disabled}
          onClick={(value) =>
            onFormulaUpdate(`${block.payload}${value}`, id, blockIndex)
          }
          currentSessionId={sessionId}
          currentInterventionId={interventionId}
          selectedQuestion={selectedQuestion}
          includeCurrentQuestion={false}
          isMultiSession
        >
          <Text
            fontWeight="bold"
            color={themeColors.secondary}
            hoverDecoration="underline"
          >
            {formatMessage(messages.addVariable)}
          </Text>
        </VariableChooser>
      </Row>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={40} px={8} py={8}>
        <StyledInput
          disabled={disabled}
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.formulaPlaceholder)}
          value={block.payload}
          onBlur={(value) => onFormulaUpdate(value, id, blockIndex)}
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
    animation: PropTypes.string,
    action: PropTypes.string,
    payload: PropTypes.string,
    reflections: PropTypes.arrayOf(PropTypes.object),
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
  selectedQuestion: PropTypes.object,
  character: PropTypes.string,
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
        animation: action === EFeedbackAction.NO_ACTION ? 'rest' : 'pointUp',
      },
      id,
    ),
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ReflectionFormulaBlock);
