import React from 'react';
import { Formik } from 'formik';
import { FormikConfig } from 'formik/dist/types';
import * as Yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import {
  naturalNumberValidationSchema,
  requiredValidationSchema,
} from 'utils/validators';
import { objectDifference } from 'utils/objectDifference';

import H3 from 'components/H3';
import Divider, { Orientation } from 'components/Divider';

import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { SelectOption } from 'components/Select/types';
import messages from './messages';
import { InputContainer } from './styled';
import { SessionSettingsFormValues } from './types';
import { AutofinishEnabledControl } from './AutofinishEnabledControl';

export type Props = {
  disabled: boolean;
  onSubmit: (changes: Partial<SessionSettingsFormValues>) => void;
} & SessionSettingsFormValues;

export enum AutofinishTimeUnit {
  HOURS = 'h',
  MINUTES = 'm',
}

type FormikValues = SessionSettingsFormValues & {
  timeUnit: SelectOption<AutofinishTimeUnit>;
};

export const SessionSettingsForm: React.FC<Props> = ({
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

  const initialValues: FormikValues = {
    autofinishEnabled,
    autofinishDelay:
      autofinishDelay % 60 === 0 ? autofinishDelay / 60 : autofinishDelay,
    timeUnit: autofinishDelay % 60 === 0 ? HOURS_OPTION : MINUTES_OPTION,
  };

  const validationSchema = Yup.object({
    autofinishDelay: Yup.string().when('autofinishEnabled', {
      is: (value) => !!value,
      then: naturalNumberValidationSchema.concat(requiredValidationSchema),
    }),
  });

  const handleSubmit: FormikConfig<FormikValues>['onSubmit'] = (values) => {
    const changes = objectDifference(
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
    <>
      <H3 mt={15} mb={20}>
        {formatMessage(messages.autofinishSettings)}
      </H3>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, values }) => (
          <InputContainer>
            <AutofinishEnabledControl disabled={disabled} />

            <Divider
              orientation={Orientation.HORIZONTAL}
              my={15}
              color={colors.linkWater}
            />
            <Row>
              <FormikInput
                formikKey="autofinishDelay"
                labelProps={{
                  fontSize: 13,
                }}
                label={formatMessage(messages.autofinishDelayLabel)}
                onBlur={submitForm}
                disabled={disabled || !values.autofinishEnabled}
              />
              <FormikSelect
                formikKey="timeUnit"
                options={[HOURS_OPTION, MINUTES_OPTION]}
                disabled={disabled || !values.autofinishEnabled}
                columnStyleProps={{ mt: 20 }}
                submitOnChange
              />
            </Row>
          </InputContainer>
        )}
      </Formik>
    </>
  );
};
