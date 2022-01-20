import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { BadgeInput } from 'components/Input/BadgeInput';
import Row from 'components/Row';

import { updateQuestionData } from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';

import { canEdit } from 'models/Status/statusPermissions';
import { QuestionBodyVariable } from 'models/Question';
import { InterventionStatus } from 'models/Intervention';

import { colors } from 'theme';
import { variableNameValidator } from 'utils/validators';

import { UPDATE_VARIABLE } from '../QuestionData/constants';

export type VariableInputProps = {
  isNarratorTab?: boolean;
  variable: QuestionBodyVariable;
  interventionStatus: InterventionStatus;
  questionId: string;
  disabled?: boolean;
};

const VariableInput = ({
  isNarratorTab,
  variable,
  interventionStatus,
  questionId,
  disabled,
}: VariableInputProps) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const updateVariable = (name: string) =>
    dispatch(
      updateQuestionData({ type: UPDATE_VARIABLE, data: { name, questionId } }),
    );

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
          // @ts-ignore
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

export default VariableInput;
