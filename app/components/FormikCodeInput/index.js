/**
 *
 * FormikCodeInput
 *
 */

import React, { memo, useRef, createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import times from 'lodash/times';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Row from 'components/Row';
import Column from 'components/Column';

import { ErrorText } from './styled';

const KEY_BACKSPACE = 8;
const numericRegex = /^[0-9]{1}$/;
const checkNumericInput = inputValue => !numericRegex.test(inputValue);

function FormikCodeInput({ formikKey, label, codeLength }) {
  const [field, meta, helpers] = useField(formikKey);
  const { value, onBlur, name } = field;
  const { error, touched } = meta;
  const hasError = touched && error;
  const { setValue, setTouched } = helpers;

  const [lastKey, setLastKey] = useState();
  const [code, setCode] = useState(
    value?.split('') ?? Array(codeLength).fill(),
  );
  const inputsRefs = useRef([]);

  if (inputsRefs.current.length !== codeLength) {
    inputsRefs.current = Array(codeLength)
      .fill()
      .map((_, i) => inputsRefs.current[i] || createRef());
  }

  const handleInput = e => {
    const {
      target: { value: inputValue },
    } = e;
    if (checkNumericInput(inputValue)) e.target.value = '';
  };

  const handleChange = (e, index) => {
    const tempCode = [...code];
    ({
      target: { value: tempCode[index] },
    } = e);
    setCode(tempCode);
    setValue(tempCode.join(''));
    setTouched(true);
  };

  const handleKeyUp = (e, index) => {
    e.preventDefault();
    const { keyCode: key } = e;
    const {
      target: { value: inputValue },
    } = e;
    if (key === KEY_BACKSPACE && lastKey === KEY_BACKSPACE) {
      if (index - 1 >= 0) {
        inputsRefs.current[index - 1].current.focus();
      } else {
        inputsRefs.current[index].current.blur();
      }
      return;
    }
    if (key === KEY_BACKSPACE) {
      setLastKey(KEY_BACKSPACE);
      return;
    }
    setLastKey('');
    if (checkNumericInput(inputValue)) return;
    if (index + 1 >= codeLength) {
      inputsRefs.current[index].current.blur();
      return;
    }
    inputsRefs.current[index + 1].current.select();
    inputsRefs.current[index + 1].current.focus();
  };

  return (
    <Column align="center">
      <Text mb={5} width="fit-content">
        {label}
      </Text>
      <Row justify="around" px={20} align="center">
        {times(codeLength).map(index => (
          <Input
            key={`code-input-${index}`}
            name={name}
            width={`calc(90% / ${codeLength})`}
            maxLength="1"
            size="1"
            onInput={handleInput}
            onKeyUp={e => handleKeyUp(e, index)}
            onChange={e => handleChange(e, index)}
            ref={inputsRefs.current[index]}
            textAlign="center"
            onBlur={onBlur}
          />
        ))}
      </Row>
      {hasError && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
  );
}

FormikCodeInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  codeLength: PropTypes.number,
};

FormikCodeInput.defaultProps = { codeLength: 6 };

export default memo(FormikCodeInput);
