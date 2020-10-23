/**
 *
 * InterventionListBranching
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';

import Switch from 'components/Switch';
import Text from 'components/Text';
import BranchingLayout from 'containers/BranchingLayout';

import messages from './messages';

const initFormula = {
  payload: '',
  patterns: [{ match: '', target: { id: '', type: 'Intervention' } }],
};

function InterventionListBranching({
  intl: { formatMessage },
  nextInterventionName,
  branching,
  handleBranching,
}) {
  const [formula, setFormula] = useState(initFormula);
  return (
    <>
      <Row py={18} px={62} align="between" justify="between">
        <Column xs={12}>
          <Row align="center" width="100%">
            {(branching || nextInterventionName) && (
              <>
                <Text fontSize={13}>{formatMessage(messages.nextSession)}</Text>
                <Text ml={10} fontSize={13} fontWeight="bold">
                  {branching
                    ? formatMessage(messages.formula)
                    : nextInterventionName}
                </Text>
              </>
            )}
          </Row>
        </Column>
        <Column xs={3}>
          <Row justify="end" align="center" width="100%">
            <Text>{formatMessage(messages.useFormula)}</Text>
            <Switch ml={10} checked={branching} onToggle={handleBranching} />
          </Row>
        </Column>
      </Row>
      {branching && (
        <Row mx={62} py={20}>
          <Column>
            <BranchingLayout
              onUpdateCase={() => null}
              onRemoveCase={() => null}
              onFormulaUpdate={() => null}
              onAddCase={() =>
                setFormula({
                  ...formula,
                  patterns: [...formula.patterns, initFormula.patterns[0]],
                })
              }
              displayPatternTargetText={() => 'test-1'}
              formatMessage={formatMessage}
              formula={formula}
              id="test-1"
              problemBranching
            />
          </Column>
        </Row>
      )}
    </>
  );
}

InterventionListBranching.propTypes = {
  intl: PropTypes.object,
  nextInterventionName: PropTypes.string,
  branching: PropTypes.bool,
  handleBranching: PropTypes.func,
};

export default injectIntl(InterventionListBranching);
