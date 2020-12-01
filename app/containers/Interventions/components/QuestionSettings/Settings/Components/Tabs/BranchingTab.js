import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import BranchingLayout from 'containers/BranchingLayout';
import Session from 'models/Session/Session';
import Question from 'models/Session/Question';
import { questionType, finishQuestion } from 'models/Session/QuestionTypes';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { makeSelectQuestions } from 'global/reducers/questions';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { findQuestionIndex, findInterventionIndex } from 'models/Session/utils';
import {
  problemReducer,
  fetchInterventionSaga,
  makeSelectProblem,
  fetchProblemRequest,
} from 'global/reducers/intervention';

import messages from '../messages';
import {
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
} from '../../actions';

const BranchingTab = ({
  intl: { formatMessage },
  formula,
  id,
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  questions,
  problem,
  fetchProblem,
  disabled,
  match: { params },
}) => {
  const { interventionId } = params;
  const { sessions: sessionList } = problem || {};
  useInjectReducer({
    key: 'problem',
    reducer: problemReducer,
  });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });

  useEffect(() => {
    fetchProblem(interventionId);
  }, []);

  const displayPatternTargetText = target => {
    const selectedIndex = findQuestionIndex(questions, id);
    const isQuestionType = target.type.startsWith(questionType);
    const isFinishType = target.type === finishQuestion.id;

    const targetIndex = isQuestionType
      ? findQuestionIndex(questions, target.id)
      : findInterventionIndex(sessionList || [], target.id);

    if (isQuestionType) {
      if (!isFinishType && selectedIndex === targetIndex - 1)
        return formatMessage(messages.nextScreen);

      if (targetIndex !== -1)
        return htmlToPlainText(questions[targetIndex].subtitle);
    } else if (targetIndex !== -1) return sessionList[targetIndex].name;

    return formatMessage(messages.selectQuestion);
  };

  return (
    <BranchingLayout
      disabled={disabled}
      formula={formula}
      id={id}
      displayPatternTargetText={displayPatternTargetText}
      onAddCase={onAddCase}
      onFormulaUpdate={onFormulaUpdate}
      onRemoveCase={onRemoveCase}
      onUpdateCase={onUpdateCase}
    />
  );
};

BranchingTab.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  problem: PropTypes.shape({
    sessions: PropTypes.arrayOf(PropTypes.shape(Session)),
  }),
  fetchProblem: PropTypes.func,
  match: PropTypes.object,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  problem: makeSelectProblem(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  fetchProblem: fetchProblemRequest,
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
