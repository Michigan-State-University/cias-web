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
import BranchingLayout from 'components/BranchingLayout';

import { createStructuredSelector } from 'reselect';
import {
  makeSelectProblem,
  addFormulaCase,
  changeFormulaStatus,
  removeFormulaCase,
  updateFormula,
  updateFormulaCase,
} from 'global/reducers/problem';
import messages from './messages';

function InterventionBranching({
  intl: { formatMessage },
  nextInterventionName,
  status,
  onChangeFormulaStatus,
  formula,
  id,
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  problem,
}) {
  const displayPatternTargetText = target => {
    if (target.id === '') return formatMessage(messages.selectSession);
    const intervention = find(
      problem.interventions,
      value => value.id === target.id,
    );
    return intervention.name;
  };

  const handleFormulaStatus = value => onChangeFormulaStatus(value);

  return (
    <>
      <Row py={18} px={62} align="between" justify="between">
        <Column xs={12}>
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
            <Text>{formatMessage(messages.useFormula)}</Text>
            <Switch ml={10} checked={status} onToggle={handleFormulaStatus} />
          </Row>
        </Column>
      </Row>
      {status && (
        <Row mx={62} py={20}>
          <Column>
            <BranchingLayout
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
  id: PropTypes.string,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  problem: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  problem: makeSelectProblem(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  onChangeFormulaStatus: changeFormulaStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(InterventionBranching);
