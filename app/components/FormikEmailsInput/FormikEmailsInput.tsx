import React, { FC } from 'react';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import ChipsInput from 'components/Input/ChipsInput';
import FormikControlLayout, {
  Props as FormikControlLayoutProps,
} from 'components/FormikControlLayout';

export type Props = {
  formikKey: string;
  label: string;
  placeholder: string;
  transparent?: boolean;
} & Partial<FormikControlLayoutProps>;

export const FormikEmailsInput: FC<Props> = ({
  formikKey,
  label,
  placeholder,
  transparent,
  ...columnStyleProps
}) => {
  const [field, meta, helpers] = useField(formikKey);
  const { value, onBlur } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;

  const hasError = touched && !isNil(error);

  return (
    <FormikControlLayout
      formikKey={formikKey}
      label={label}
      touched={touched}
      error={error}
      labelProps={{ mb: 10 }}
      {...columnStyleProps}
    >
      <ChipsInput
        name={formikKey}
        value={value}
        setValue={setValue}
        onBlur={onBlur}
        hasError={hasError}
        placeholder={placeholder}
        transparent={transparent}
        compact
      />
    </FormikControlLayout>
  );
};
