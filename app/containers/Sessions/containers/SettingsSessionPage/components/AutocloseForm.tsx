import React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikConfig } from 'formik/dist/types';
import isEmpty from 'lodash/isEmpty';

import { requiredDateValidationSchema } from 'utils/validators';
import { objectDifference } from 'utils/objectDifference';

import FormikSwitchInput from 'components/FormikSwitchInput';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Row from 'components/Row';
import FormikDatePicker from 'components/FormikDatePicker';

import messages from './messages';
import { InputContainer } from './styled';

import { AutocloseFormValues, SessionSettingsSubmitFormValues } from './types';

export type Props = {
  disabled: boolean;
  autocloseEnabled: boolean;
  autocloseAt: Nullable<string>;
  onSubmit: (changes: Partial<SessionSettingsSubmitFormValues>) => void;
};

export const AutocloseForm: React.FC<Props> = ({
  disabled,
  autocloseEnabled,
  autocloseAt,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: AutocloseFormValues = {
    autocloseEnabled: Boolean(autocloseEnabled),
    autocloseAtDate: autocloseAt ? new Date(autocloseAt) : null,
  };

  const validationSchema = Yup.object({
    autocloseAtDate: Yup.date().when('autocloseEnabled', {
      is: (value) => !!value,
      then: requiredDateValidationSchema,
      otherwise: Yup.date().nullable(),
    }),
  });

  const handleSubmit: FormikConfig<AutocloseFormValues>['onSubmit'] = (
    values,
  ) => {
    const changes: Partial<SessionSettingsSubmitFormValues> = objectDifference(
      { autocloseEnabled, autocloseAt },
      {
        autocloseEnabled: values.autocloseEnabled,
        autocloseAt: values.autocloseAtDate?.toISOString() ?? null,
      },
    );
    if (!isEmpty(changes)) {
      onSubmit(changes);
    }
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <InputContainer>
          <FormikSwitchInput
            formikKey="autocloseEnabled"
            disabled={disabled}
            submitOnChange
            onChange={(autocloseEnabledValue: boolean) => {
              if (!autocloseEnabledValue) {
                setFieldValue(
                  'autocloseAtDate',
                  initialValues.autocloseAtDate ?? null,
                );
              }
            }}
          >
            <HelpIconTooltip
              id="autoclose-enabled-tooltip-info"
              tooltipContent={formatMessage(messages.autocloseTooltip)}
            >
              {formatMessage(messages.autocloseEnabledLabel)}
            </HelpIconTooltip>
          </FormikSwitchInput>
          {values.autocloseEnabled && (
            <Row gap={16} mt={16}>
              <FormikDatePicker
                formikKey="autocloseAtDate"
                label={formatMessage(messages.autocloseAtLabel)}
                disabled={disabled}
                datePickerProps={{
                  minDate: new Date(),
                }}
                submitOnChange
                inputProps={{
                  width: '100%',
                }}
                selectTime
              />
            </Row>
          )}
        </InputContainer>
      )}
    </Formik>
  );
};
