import React, { memo } from 'react';
import { useField } from 'formik';

import FormikControlLayout from 'components/FormikControlLayout';
import { Switch, Props as SwitchProps } from 'components/Switch';

export type Props = {
  formikKey: string;
  columnStyleProps?: Record<string, unknown>;
} & Omit<SwitchProps, 'onToggle' | 'onChange' | 'nativeChangeHandler' | 'id'>;

const FormikSwitchInput = ({
  formikKey,
  children,
  columnStyleProps,
  ...props
}: Props) => {
  const [field, meta] = useField(formikKey);
  const { error, touched } = meta;
  const { value, ...fieldProps } = field;

  return (
    <FormikControlLayout
      touched={touched}
      error={error}
      formikKey={formikKey}
      {...columnStyleProps}
    >
      <Switch
        nativeChangeHandler
        checked={value}
        id={field.name}
        {...props}
        {...fieldProps}
      >
        {children}
      </Switch>
    </FormikControlLayout>
  );
};

export default memo(FormikSwitchInput);
