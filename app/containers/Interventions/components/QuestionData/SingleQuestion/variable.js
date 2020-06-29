import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { BadgeInput } from 'components/Input/BadgeInput';

import { colors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import { UPDATE_VARIABLE } from './constants';

import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const SingleQuestionVariable = ({
  variableName,
  updateVariable,
  intl: { formatMessage },
}) => (
  <BadgeInput
    px={0}
    py={12}
    textAlign="center"
    keyboard="tel"
    placeholder={formatMessage(
      globalMessages.variables.variableNamePlaceholder,
    )}
    value={variableName}
    color={colors.jungleGreen}
    onBlur={val => updateVariable(val)}
  />
);

SingleQuestionVariable.propTypes = {
  variableName: PropTypes.string.isRequired,
  updateVariable: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
};

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(SingleQuestionVariable));
