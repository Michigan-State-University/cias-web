import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { colors } from 'theme';
import { updateVariableAction } from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';

import { canEdit } from 'models/Status/statusPermissions';
import { QuestionBodyVariable } from 'models/Question';
import { InterventionStatus } from 'models/Intervention';

import {
  requiredVariableNameValidator,
  variableNameValidator,
} from 'utils/validators';

import { BadgeInput } from 'components/Input/BadgeInput';
import Row from 'components/Row';
import Text, { HiddenText } from 'components/Text';

export type VariableInputProps = {
  isNarratorTab?: boolean;
  variable: QuestionBodyVariable;
  interventionStatus: InterventionStatus;
  questionId: string;
  disabled?: boolean;
  required?: boolean;
};

const VariableInput = ({
  isNarratorTab,
  variable,
  interventionStatus,
  questionId,
  disabled,
  required,
}: VariableInputProps) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const updateVariable = (name: string) =>
    dispatch(updateVariableAction(name, questionId));

  const editingPossible = canEdit(interventionStatus);

  return (
    <Row
      display="flex"
      hidden={isNarratorTab}
      data-cy={`question-variable-input-${questionId}`}
    >
      <BadgeInput
        disabled={!editingPossible || disabled}
        px={0}
        py={12}
        textAlign="center"
        keyboard="tel"
        validator={
          required ? requiredVariableNameValidator : variableNameValidator
        }
        placeholder={formatMessage(globalMessages.variableNamePlaceholder)}
        value={variable.name}
        color={colors.jungleGreen}
        onBlur={updateVariable}
        autoComplete="off"
      />
      {required && (
        <>
          <Text aria-hidden color={colors.flamingo} ml={4} fontWeight="bold">
            *
          </Text>
          <HiddenText>{formatMessage(globalMessages.required)}</HiddenText>
        </>
      )}
    </Row>
  );
};

export default VariableInput;
