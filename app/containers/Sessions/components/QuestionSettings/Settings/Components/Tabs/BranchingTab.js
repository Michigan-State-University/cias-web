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
