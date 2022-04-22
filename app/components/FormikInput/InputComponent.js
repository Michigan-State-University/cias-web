/**
 *
 * InputComponent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Column from 'components/Column';

import Row from 'components/Row';
import { ErrorText } from './styled';

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
}) {
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
      {hasError && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
  );
}

InputComponent.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  hasError: PropTypes.bool,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default memo(InputComponent);
