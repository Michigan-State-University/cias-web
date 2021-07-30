import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { BadgeInput } from 'components/Input/BadgeInput';
import Row from 'components/Row';

import { updateQuestionData } from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { canEdit } from 'models/Status/statusPermissions';
import { colors } from 'theme';
import { variableNameValidator } from 'utils/validators';

import { UPDATE_VARIABLE } from '../QuestionData/constants';

const VariableInput = ({
  intl: { formatMessage },
  isNarratorTab,
  variable,
  interventionStatus,
  updateVariable,
  questionId,
  disabled,
}) => {
  const editingPossible = canEdit(interventionStatus);
  return (
    <Row display="flex" hidden={isNarratorTab}>
      <BadgeInput
        disabled={!editingPossible || disabled}
        px={0}
        py={12}
        textAlign="center"
        keyboard="tel"
        validator={variableNameValidator}
        placeholder={formatMessage(
          globalMessages.variables.variableNamePlaceholder,
        )}
        value={variable.name}
        color={colors.jungleGreen}
        onBlur={(val) => updateVariable(val, questionId)}
        autoComplete="off"
      />
    </Row>
  );
};

VariableInput.propTypes = {
  questionId: PropTypes.string,
  variable: PropTypes.object,
  intl: PropTypes.object.isRequired,
  updateVariable: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  updateVariable: (name, questionId) =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name, questionId } }),
};

const withConnect = connect(null, mapDispatchToProps);

export default injectIntl(compose(withConnect)(VariableInput));
