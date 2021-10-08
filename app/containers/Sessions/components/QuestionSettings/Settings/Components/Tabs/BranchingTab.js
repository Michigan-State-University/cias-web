import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import BranchingLayout from 'containers/BranchingLayout';
import Session from 'models/Session';
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

import messages from '../messages';
import {
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
  addFormulaTarget,
  updateFormulaTarget,
  removeFormulaTarget,
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
  intervention,
  fetchIntervention,
  disabled,
  match: { params },
  onAddTarget,
  onUpdateTarget,
  onRemoveTarget,
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

  const displayPatternTargetText = (target) => {
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
    <BranchingLayout
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
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect, withRouter)(BranchingTab));
