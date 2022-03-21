import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { colors } from 'theme';
import { updateVariableAction } from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { canEdit } from 'models/Status/statusPermissions';
import { variableNameValidator } from 'utils/validators';

import { BadgeInput } from 'components/Input/BadgeInput';
import Row from 'components/Row';

const VariableInput = ({
  isNarratorTab,
  variable,
  interventionStatus,
  questionId,
  disabled,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const updateVariable = (name) =>
    dispatch(updateVariableAction(name, questionId));

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
        onBlur={updateVariable}
        autoComplete="off"
      />
    </Row>
  );
};

VariableInput.propTypes = {
  questionId: PropTypes.string,
  variable: PropTypes.object,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
  disabled: PropTypes.bool,
};

export default VariableInput;
