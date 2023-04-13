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
import FormikInputWithAdornment from 'components/FormikInputWithAdornment';
import { AdornmentType } from 'components/Input/InputWithAdornment';
import Divider, { Orientation } from 'components/Divider';

import messages from './messages';
import { InputContainer } from './styled';
import { SessionSettingsFormValues } from './types';
import { AutofinishEnabledControl } from './AutofinishEnabledControl';

export type Props = {
  disabled: boolean;
  onSubmit: (changes: Partial<SessionSettingsFormValues>) => void;
} & SessionSettingsFormValues;

export const SessionSettingsForm: React.FC<Props> = ({
  disabled,
  autofinishEnabled,
  autofinishDelay,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: SessionSettingsFormValues = {
    autofinishEnabled,
    autofinishDelay,
  };

  const validationSchema = Yup.object({
    autofinishDelay: Yup.string().when('autofinishEnabled', {
      is: (value) => !!value,
      then: naturalNumberValidationSchema.concat(requiredValidationSchema),
    }),
  });

  const handleSubmit: FormikConfig<SessionSettingsFormValues>['onSubmit'] = (
    values,
  ) => {
    const changes = objectDifference(initialValues, {
      ...values,
      autofinishDelay: +values.autofinishDelay,
    });
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

            <FormikInputWithAdornment
              formikKey="autofinishDelay"
              label={formatMessage(messages.autofinishDelayLabel)}
              adornment={formatMessage(messages.hours)}
              adornmentType={AdornmentType.SUFFIX}
              disabled={disabled || !values.autofinishEnabled}
              labelProps={{
                fontSize: 13,
              }}
              onBlur={submitForm}
            />
          </InputContainer>
        )}
      </Formik>
    </>
  );
};
