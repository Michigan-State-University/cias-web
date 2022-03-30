import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import BoxCollapse from 'components/BoxCollapse';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import PlusCircle from 'components/Circle/PlusCircle';
import HoverableBox from 'components/Box/HoverableBox';
import BranchingLayout from 'containers/BranchingLayout';
import Session from 'models/Session/Session';
import Question from 'models/Session/Question';
import { questionType } from 'models/Session/QuestionTypes';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { makeSelectQuestions } from 'global/reducers/questions';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { findQuestionIndex, findInterventionIndex } from 'models/Session/utils';
import {
  interventionReducer,
  fetchInterventionSaga,
  makeSelectIntervention,
  fetchInterventionRequest,
} from 'global/reducers/intervention';
import { themeColors, colors } from 'theme';

import messages from '../messages';
import {
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
  addFormulaTarget,
  updateFormulaTarget,
  removeFormulaTarget,
  addNewFormula,
  removeFormula,
} from '../../actions';

const BranchingTab = ({
  intl: { formatMessage },
  formulas,
  id,
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  questions,
  intervention,
  fetchIntervention,
  disabled,
  match: { params },
  onAddTarget,
  onUpdateTarget,
  onRemoveTarget,
  onAddFormula,
  onRemoveFormula,
}) => {
  const { interventionId, sessionId } = params;
  const { sessions: sessionList } = intervention || {};
  useInjectReducer({
    key: 'intervention',
    reducer: interventionReducer,
  });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });

  useEffect(() => {
    fetchIntervention(interventionId);
  }, []);

  const displayPatternTargetText = target => {
    if (!target) return formatMessage(messages.selectQuestion);
    const isQuestionType = target.type.startsWith(questionType);

    const targetIndex = isQuestionType
      ? findQuestionIndex(questions, target.id)
      : findInterventionIndex(sessionList || [], target.id);

    if (targetIndex !== -1) {
      if (isQuestionType)
        return htmlToPlainText(questions[targetIndex].subtitle);

      return sessionList[targetIndex].name;
    }

    return formatMessage(messages.selectQuestion);
  };

  return (
    <>
      {formulas?.length > 0 &&
        formulas.map((formula, index) => (
          <BoxCollapse
            key={`formula-${index}`}
            mb={16}
            padding={4}
            label={formatMessage(messages.formula, { index: index + 1 })}
            onDelete={() => onRemoveFormula(id, index)}
            labelBgColor={colors.lightStealBlue}
            labelBgOpacity={0.4}
            labelPadding={8}
            binFillColor={colors.manatee}
            arrowColor={themeColors.secondary}
            binProps={{
              width: 16,
              height: 16,
            }}
            contentStyle={{
              px: 8,
            }}
            shouldBeOpenOnStart
          >
            <BranchingLayout
              formulaIndex={index}
              disabled={disabled}
              formula={formula}
              id={id}
              displayPatternTargetText={displayPatternTargetText}
              onAddCase={onAddCase}
              onFormulaUpdate={onFormulaUpdate}
              onRemoveCase={onRemoveCase}
              onUpdateCase={onUpdateCase}
              sessionId={sessionId}
              interventionId={interventionId}
              includeCurrentSession
              isMultiSession
              onAddTarget={onAddTarget}
              onUpdateTarget={onUpdateTarget}
              onRemoveTarget={onRemoveTarget}
              sessionBranching={false}
            />
          </BoxCollapse>
        ))}
      <HoverableBox px={21} py={14} onClick={() => onAddFormula(id)}>
        <Box>
          <Row align="center">
            <PlusCircle mr={12} />
            <Text fontWeight="bold" color={themeColors.secondary}>
              <FormattedMessage {...messages.addNewFormula} />
            </Text>
          </Row>
        </Box>
      </HoverableBox>
    </>
  );
};

BranchingTab.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string,
  formulas: PropTypes.array,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  onAddFormula: PropTypes.func,
  onRemoveFormula: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  intervention: PropTypes.shape({
    sessions: PropTypes.arrayOf(PropTypes.shape(Session)),
  }),
  fetchIntervention: PropTypes.func,
  onAddTarget: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onRemoveTarget: PropTypes.func,
  match: PropTypes.object,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  fetchIntervention: fetchInterventionRequest,
  onAddTarget: addFormulaTarget,
  onUpdateTarget: updateFormulaTarget,
  onRemoveTarget: removeFormulaTarget,
  onAddFormula: addNewFormula,
  onRemoveFormula: removeFormula,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(
  compose(
    withConnect,
    withRouter,
  )(BranchingTab),
);
