/**
 *
 * InputComponent
 *
 */

import React, { memo, ReactElement } from 'react';

import { Input } from 'components/Input';
import Row from 'components/Row';
import FormikControlLayout from 'components/FormikControlLayout';

type InputComponentType = {
  id?: string;
  children?: ReactElement;
  error?: string;
  hasError?: boolean;
  touched: boolean;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  label?: string | ReactElement;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value?: string | number;
};

function InputComponent({
  id,
  children,
  error,
  hasError,
  touched,
  inputProps,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  ...columnStyleProps
}: InputComponentType) {
  return (
    <FormikControlLayout
      formikKey={name}
      label={label}
      touched={touched}
      error={error}
      {...columnStyleProps}
    >
      <Row width="100%" align="center">
        <Input
          id={id ?? name}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          hasError={hasError}
          keyboard={type}
          {...inputProps}
        />
        {children}
      </Row>
    </FormikControlLayout>
  );
}

export default memo(InputComponent);
