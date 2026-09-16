import React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikConfig } from 'formik/dist/types';
import isEmpty from 'lodash/isEmpty';

import {
  naturalNumberValidationSchema,
  requiredValidationSchema,
} from 'utils/validators';
import { objectDifference } from 'utils/objectDifference';

import FormikSwitchInput from 'components/FormikSwitchInput';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Column from 'components/Column';
import Row from 'components/Row';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';

import messages from './messages';
import { InputContainer } from './styled';

import {
  AutofinishTimeUnit,
  AutofinishFormValues,
  SessionSettingsSubmitFormValues,
} from './types';

export const defaultAutofinishDelayValue = 24;

export type Props = {
  disabled: boolean;
  autofinishEnabled: boolean;
  autofinishDelay: number;
  onSubmit: (changes: Partial<SessionSettingsSubmitFormValues>) => void;
};

export const AutofinishForm: React.FC<Props> = ({
  disabled,
  autofinishEnabled,
  autofinishDelay,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();

  const HOURS_OPTION = {
    value: AutofinishTimeUnit.HOURS,
    label: formatMessage(messages.hours),
  };
  const MINUTES_OPTION = {
    value: AutofinishTimeUnit.MINUTES,
    label: formatMessage(messages.minutes),
  };

  const initialValues: AutofinishFormValues = {
    autofinishEnabled,
    autofinishDelay:
      autofinishDelay % 60 === 0 ? autofinishDelay / 60 : autofinishDelay,
    timeUnit: autofinishDelay % 60 === 0 ? HOURS_OPTION : MINUTES_OPTION,
  };

  const validationSchema = Yup.object({
    autofinishDelay: Yup.string().when('autofinishEnabled', {
      is: (value: boolean) => !!value,
      then: naturalNumberValidationSchema.concat(requiredValidationSchema),
    }),
  });

  const handleSubmit: FormikConfig<AutofinishFormValues>['onSubmit'] = (
    values,
  ) => {
    const changes: Partial<SessionSettingsSubmitFormValues> = objectDifference(
      { autofinishEnabled, autofinishDelay },
      {
        autofinishEnabled: values.autofinishEnabled,
        autofinishDelay:
          +values.autofinishDelay *
          (values.timeUnit.value === AutofinishTimeUnit.HOURS ? 60 : 1),
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
      {({ submitForm, values, setFieldValue }) => (
        <InputContainer>
          <FormikSwitchInput
            formikKey="autofinishEnabled"
            disabled={disabled}
            submitOnChange
            onChange={(autofinishEnabledValue) => {
              if (!autofinishEnabledValue) {
                setFieldValue(
                  'autofinishDelay',
                  initialValues.autofinishDelay ?? defaultAutofinishDelayValue,
                );
              }
            }}
            mt={32}
          >
            <HelpIconTooltip
              id="autofinish-enabled-tooltip-info"
              tooltipContent={
                <Column>
                  {formatMessage(messages.autofinishTooltipOne)}
                  <br />
                  <br />
                  {formatMessage(messages.autofinishTooltipTwo)}
                </Column>
              }
            >
              {formatMessage(messages.autofinishEnabledLabel)}
            </HelpIconTooltip>
          </FormikSwitchInput>
          {values.autofinishEnabled && (
            <Row gap={16} mt={16}>
              <FormikInput
                formikKey="autofinishDelay"
                labelProps={{
                  fontSize: 13,
                }}
                label={formatMessage(messages.autofinishDelayLabel)}
                onBlur={submitForm}
                disabled={disabled}
                inputProps={{
                  width: '100%',
                }}
              />
              <FormikSelect
                formikKey="timeUnit"
                options={[HOURS_OPTION, MINUTES_OPTION]}
                disabled={disabled}
                columnStyleProps={{ mt: 20 }}
                submitOnChange
              />
            </Row>
          )}
        </InputContainer>
      )}
    </Formik>
  );
};
