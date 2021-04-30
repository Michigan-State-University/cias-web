/**
 *
 * SessionBranching
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectReducer } from 'redux-injectors';
import find from 'lodash/find';

import Row from 'components/Row';
import Column from 'components/Column';
import Switch from 'components/Switch';
import Text from 'components/Text';
import BranchingLayout from 'containers/BranchingLayout';

import { createStructuredSelector } from 'reselect';
import {
  makeSelectIntervention,
  addFormulaCase,
  changeFormulaStatus,
  removeFormulaCase,
  updateFormula,
  updateFormulaCase,
  changeCurrentSession,
  addFormulaTarget,
  removeFormulaTarget,
  updateFormulaTarget,
} from 'global/reducers/intervention';
import {
  questionGroupsReducer,
  makeSelectQuestionGroupsSessionId,
  getQuestionGroupsRequest,
} from 'global/reducers/questionGroups';
import messages from './messages';

function SessionBranching({
  intl: { formatMessage },
  nextSessionName,
  status,
  onChangeFormulaStatus,
  formula,
  session: { id, position, intervention_id: interventionId },
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  intervention,
  changeSessionIndex,
  fetchQuestions,
  disabled,
  activeSessionId,
  onAddTarget,
  onUpdateTarget,
  onDeleteTarget,
}) {
  const displayPatternTargetText = target => {
    if (!target || target.id === '')
      return formatMessage(messages.selectSession);
    const session = find(
      intervention.sessions,
      value => value.id === target.id,
    );
    return session ? session.name : formatMessage(messages.selectSession);
  };

  const handleFormulaStatus = value => onChangeFormulaStatus(value, id);

  const handleClickAddVariable = () => {
    if (id !== activeSessionId) {
      changeSessionIndex(position - 1);
      fetchQuestions(id);
    }
  };

  return (
    <>
      <Row py={18} px={62} align="between" justify="between">
        <Column xs={12} justify="center">
          <Row align="center" width="100%">
            {(status || nextSessionName) && (
              <>
                <Text fontSize={13}>{formatMessage(messages.nextSession)}</Text>
                <Text ml={10} fontSize={13} fontWeight="bold">
                  {status ? formatMessage(messages.formula) : nextSessionName}
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
              displayPatternTargetText={displayPatternTargetText}
              formatMessage={formatMessage}
              formula={formula}
              id={id}
              interventionId={interventionId}
              onAddCase={onAddCase}
              onDropdownOpen={handleClickAddVariable}
              onFormulaUpdate={onFormulaUpdate}
              onRemoveCase={onRemoveCase}
              onUpdateCase={onUpdateCase}
              sessionId={id}
              includeAllVariables
              includeCurrentSession
              isMultiSession
              sessionBranching
              onAddTarget={onAddTarget}
              onUpdateTarget={onUpdateTarget}
              onRemoveTarget={onDeleteTarget}
            />
          </Column>
        </Row>
      )}
    </>
  );
}

SessionBranching.propTypes = {
  intl: PropTypes.object,
  nextSessionName: PropTypes.string,
  status: PropTypes.bool,
  onChangeFormulaStatus: PropTypes.func,
  session: PropTypes.object,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  intervention: PropTypes.object,
  changeSessionIndex: PropTypes.func,
  fetchQuestions: PropTypes.func,
  disabled: PropTypes.bool,
  activeSessionId: PropTypes.string,
  onAddTarget: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onDeleteTarget: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  activeSessionId: makeSelectQuestionGroupsSessionId(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  onChangeFormulaStatus: changeFormulaStatus,
  changeSessionIndex: changeCurrentSession,
  fetchQuestions: getQuestionGroupsRequest,
  onAddTarget: addFormulaTarget,
  onUpdateTarget: updateFormulaTarget,
  onDeleteTarget: removeFormulaTarget,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  injectIntl,
  withConnect,
)(SessionBranching);
