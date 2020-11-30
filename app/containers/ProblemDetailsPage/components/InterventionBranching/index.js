/**
 *
 * InterventionBranching
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import find from 'lodash/find';

import Row from 'components/Row';
import Column from 'components/Column';
import Switch from 'components/Switch';
import Text from 'components/Text';
import BranchingLayout from 'containers/BranchingLayout';

import { createStructuredSelector } from 'reselect';
import {
  makeSelectProblem,
  addFormulaCase,
  changeFormulaStatus,
  removeFormulaCase,
  updateFormula,
  updateFormulaCase,
  makeSelectCurrentSessionIndex,
  changeCurrentSession,
} from 'global/reducers/intervention';
import { getQuestionsRequest } from 'global/reducers/questions';
import { injectReducer } from 'redux-injectors';
import {
  questionGroupsReducer,
  makeSelectQuestionGroupsSessionId,
} from 'global/reducers/questionGroups';
import messages from './messages';

function InterventionBranching({
  intl: { formatMessage },
  nextInterventionName,
  status,
  onChangeFormulaStatus,
  formula,
  session: { id, position },
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  problem,
  sessionIndex,
  changeInterventionIndex,
  fetchQuestions,
  disabled,
  activeInterventionId,
}) {
  const displayPatternTargetText = target => {
    if (target.id === '') return formatMessage(messages.selectSession);
    const intervention = find(
      problem.sessions,
      value => value.id === target.id,
    );
    return intervention
      ? intervention.name
      : formatMessage(messages.selectSession);
  };

  const handleFormulaStatus = value => onChangeFormulaStatus(value, id);

  const handleClickAddVariable = () => {
    if (position !== sessionIndex + 1) {
      changeInterventionIndex(position - 1);
    }
    if (id !== activeInterventionId) {
      fetchQuestions(id);
    }
  };

  return (
    <>
      <Row py={18} px={62} align="between" justify="between">
        <Column xs={12} justify="center">
          <Row align="center" width="100%">
            {(status || nextInterventionName) && (
              <>
                <Text fontSize={13}>{formatMessage(messages.nextSession)}</Text>
                <Text ml={10} fontSize={13} fontWeight="bold">
                  {status
                    ? formatMessage(messages.formula)
                    : nextInterventionName}
                </Text>
              </>
            )}
          </Row>
        </Column>
        <Column xs={4}>
          <Row justify="end" align="center" width="100%">
            <Text whiteSpace="pre">{formatMessage(messages.useFormula)}</Text>
            <Switch
              disabled={disabled}
              ml={10}
              checked={status}
              onToggle={handleFormulaStatus}
            />
          </Row>
        </Column>
      </Row>
      {status && (
        <Row mx={62} py={20}>
          <Column>
            <BranchingLayout
              disabled={disabled}
              onVariableChooserOpen={handleClickAddVariable}
              formatMessage={formatMessage}
              formula={formula}
              id={id}
              onAddCase={onAddCase}
              onFormulaUpdate={onFormulaUpdate}
              onRemoveCase={onRemoveCase}
              onUpdateCase={onUpdateCase}
              displayPatternTargetText={displayPatternTargetText}
              problemBranching
            />
          </Column>
        </Row>
      )}
    </>
  );
}

InterventionBranching.propTypes = {
  intl: PropTypes.object,
  nextInterventionName: PropTypes.string,
  status: PropTypes.bool,
  onChangeFormulaStatus: PropTypes.func,
  session: PropTypes.object,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  problem: PropTypes.object,
  sessionIndex: PropTypes.number,
  changeInterventionIndex: PropTypes.func,
  fetchQuestions: PropTypes.func,
  disabled: PropTypes.bool,
  activeInterventionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  problem: makeSelectProblem(),
  sessionIndex: makeSelectCurrentSessionIndex(),
  activeInterventionId: makeSelectQuestionGroupsSessionId(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  onChangeFormulaStatus: changeFormulaStatus,
  changeInterventionIndex: changeCurrentSession,
  fetchQuestions: getQuestionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  injectIntl,
  withConnect,
)(InterventionBranching);
