/**
 *
 * InputComponent
 *
 */

import React, { memo, ReactElement } from 'react';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Column from 'components/Column';

import Row from 'components/Row';
import { ErrorText } from './styled';

type InputComponentType = {
  id?: string;
  children?: ReactElement;
  error?: string;
  hasError?: boolean;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  label?: string;
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
    <Column {...columnStyleProps}>
      {label && (
        <label htmlFor={id ?? name}>
          <Text mb={5} width="fit-content">
            {label}
          </Text>
        </label>
      )}

      <Row width="100%" align="center">
        <Input
          id={id ?? name}
          mb={hasError ? 5 : null}
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
      {hasError && <ErrorText>{error?.toString()}</ErrorText>}
    </Column>
  );
}

export default memo(InputComponent);
