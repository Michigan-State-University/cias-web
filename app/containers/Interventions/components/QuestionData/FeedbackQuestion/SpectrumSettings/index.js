/**
 *
 * SpectrumSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';
import Column from 'components/Column';

import SpectrumVariableChooser from './variableChooser';
import {
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
} from '../actions';

const SpectrumSettings = ({
  selectedQuestion: {
    id,
    body: { data },
  },
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  disabled,
}) => (
  <Column>
    <SpectrumVariableChooser
      id={id}
      disabled={disabled}
      spectrum={data[0].spectrum}
      onFormulaUpdate={onFormulaUpdate}
      onAddCase={onAddCase}
      onRemoveCase={onRemoveCase}
      onUpdateCase={onUpdateCase}
    />
  </Column>
);

SpectrumSettings.propTypes = {
  selectedQuestion: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SpectrumSettings);
