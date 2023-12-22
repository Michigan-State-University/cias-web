import React, { memo } from 'react';
import { useField, useFormikContext } from 'formik';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import FormikControlLayout from 'components/FormikControlLayout';
import { Switch, Props as SwitchProps } from 'components/Switch';

export type Props = {
  formikKey: string;
  columnStyleProps?: Record<string, unknown>;
  submitOnChange?: boolean;
  onChange?: (value: boolean) => void;
} & Omit<SwitchProps, 'onToggle' | 'onChange' | 'nativeChangeHandler' | 'id'>;

const FormikSwitchInput = ({
  formikKey,
  children,
  columnStyleProps,
  submitOnChange,
  onChange,
  ...props
}: Props) => {
  const { submitForm } = useFormikContext();

  const [field, meta] = useField(formikKey);
  const { error, touched } = meta;
  const { value, ...fieldProps } = field;

  useDidUpdateEffect(() => {
    if (onChange) {
      onChange(value);
    }
    if (submitOnChange) {
      submitForm();
    }
  }, [value]);

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
