/**
 *
 * FormikCodeInput
 *
 */

import React, { memo, useRef, createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import times from 'lodash/times';
import { useIntl } from 'react-intl';

import { Input } from 'components/Input';
import Text from 'components/Text';
import Row from 'components/Row';
import Column from 'components/Column';
import FormikControlLayout from 'components/FormikControlLayout';

import messages from './messages';

const KEY_BACKSPACE = 8;
const numericRegex = /^[0-9]{1}$/;
const checkNumericInput = (inputValue) => !numericRegex.test(inputValue);

function FormikCodeInput({ formikKey, label, codeLength }) {
  const { formatMessage } = useIntl();

  const [field, meta, helpers] = useField(formikKey);
  const { value, onBlur, name } = field;
  const { error, touched } = meta;
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

  const handleInput = (e) => {
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
    <FormikControlLayout
      label={label}
      formikKey={formikKey}
      touched={touched}
      error={error}
      align="center"
      labelProps={{ fontWeight: 'bold' }}
    >
      <Text mb={5} width="fit-content" id="code-input-general">
        {formatMessage(messages.codeInputLabel)}
      </Text>

      <Row justify="around" px={20} align="center">
        {times(codeLength).map((index) => {
          const inputIndex = index + 1;

          return (
            <Column key={`code-input-${inputIndex}`} align="center">
              <Text id={`code-input-${inputIndex}`}>{inputIndex}</Text>

              <Input
                name={name}
                width="95%"
                maxLength="1"
                size="1"
                inputMode="numeric"
                onInput={handleInput}
                onKeyUp={(e) => handleKeyUp(e, index)}
                onChange={(e) => handleChange(e, index)}
                ref={inputsRefs.current[index]}
                textAlign="center"
                onBlur={onBlur}
                aria-labelledby={`code-input-general code-input-${inputIndex}`}
              />
            </Column>
          );
        })}
      </Row>
    </FormikControlLayout>
  );
}

FormikCodeInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  codeLength: PropTypes.number,
};

FormikCodeInput.defaultProps = { codeLength: 6 };

export default memo(FormikCodeInput);
