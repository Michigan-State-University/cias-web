/**
 *
 * InequalityChooser
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import Box from 'components/Box';
import { colors } from 'theme';
import { numericValidator } from 'utils/validators';
import { CaseInput } from './styled';

const signs = ['=', '<', '>', '<=', '>='];

const InequalityChooser = ({
  onSuccessfulChange,
  inequalityValue,
  disabled,
}) => {
  const populateSelectOption = sign => ({
    label: sign,
    value: sign,
  });

  const [inequalitySign, setInequalitySign] = useState(
    populateSelectOption('='),
  );
  const [numericValue, setNumericValue] = useState('');

  useEffect(() => {
    if (inequalityValue) {
      const newNumericValue = inequalityValue.replace(/\D/g, '');
      const newInequalitySign = inequalityValue.slice(
        0,
        inequalityValue.length - newNumericValue.length,
      );
      setNumericValue(newNumericValue);
      setInequalitySign(populateSelectOption(newInequalitySign));
    }
  }, [inequalityValue]);

  useEffect(() => {
    if (inequalitySign && numericValue) {
      onSuccessfulChange(`${inequalitySign.value}${numericValue}`);
    }
  }, [inequalitySign, numericValue]);

  const signMapper = signs.map(populateSelectOption);

  return (
    <>
      <Select
        minWidth={60}
        ml={10}
        data-testid="select"
        selectProps={{
          isDisabled: disabled,
          bg: colors.linkWater,
          options: signMapper,
          onChange: value => setInequalitySign(value),
          value: inequalitySign,
        }}
      />
      <Box bg={colors.linkWater} mx={10}>
        <CaseInput
          data-testid="input"
          disabled={disabled}
          px={0}
          py={12}
          textAlign="center"
          placeholder="..."
          value={numericValue}
          validator={numericValidator}
          onBlur={value => setNumericValue(value)}
        />
      </Box>
    </>
  );
};

InequalityChooser.propTypes = {
  inequalityValue: PropTypes.string,
  onSuccessfulChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default memo(InequalityChooser);
