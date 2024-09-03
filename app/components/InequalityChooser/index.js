/**
 *
 * InequalityChooser
 *
 */

import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';
import { numericValidator } from 'utils/validators';

import Select from 'components/Select';
import Box from 'components/Box';

import { CaseInput } from './styled';
import messages from './messages';
import Modal from "../Modal";

const SIGNS = ['=', '<', '>', '<=', '>=', '= TRUE', '= FALSE'];

const InequalityChooser = ({
  onSuccessfulChange,
  inequalityValue,
  disabled,
  height,
  width,
  bg,
}) => {
  const { formatMessage } = useIntl();

  const populateSelectOption = (sign) => ({
    label: sign,
    value: sign,
  });

  const [sign, setSign] = useState(inequalityValue);

  const isLogicOperator = (operator) =>
    ['= TRUE', '= FALSE'].includes(operator);

  const { inequalitySign, numericValue } = useMemo(() => {
    const newNumericValue = inequalityValue
      ? inequalityValue.replace(/\D/g, '')
      : '';
    const newInequalitySign = inequalityValue
      ? inequalityValue.slice(
          0,
          (inequalityValue?.length ?? 0) - newNumericValue.length,
        )
      : '';

    return {
      numericValue: newNumericValue,
      inequalitySign: populateSelectOption(newInequalitySign),
    };
  }, [inequalityValue]);

  const onChange = (newSign, value) => {
    onSuccessfulChange(`${newSign ?? ''}${value ?? ''}`);
  };

  const onSignChange = (newSign) => {
    onChange(newSign.value, numericValue);
    setSign(newSign.value);
  };

  const onValueChange = (newValue) => {
    onChange(inequalitySign.value, newValue);
  };

  const signMapper = SIGNS.map(populateSelectOption);

  return (
    <>
      <Select
        minWidth={isLogicOperator(sign) ? 90 : 75}
        mx={10}
        data-cy="case-select"
        data-testid="select"
        selectProps={{
          isDisabled: disabled,
          bg: bg || colors.linkWater,
          options: signMapper,
          onChange: onSignChange,
          value: inequalitySign,
          height,
          centered: true,
        }}
      />
      {!isLogicOperator(sign) && (
        <Box bg={colors.linkWater} mr={10}>
          <CaseInput
            width={width}
            height={height}
            data-testid="input"
            data-cy="case-value-input"
            disabled={disabled}
            px={0}
            py={12}
            textAlign="center"
            placeholder="..."
            value={numericValue}
            validator={numericValidator}
            onBlur={onValueChange}
            aria-label={formatMessage(messages.inputLabel)}
            bg={bg}
          />
        </Box>
      )}
    </>
  );
};

InequalityChooser.propTypes = {
  inequalityValue: PropTypes.string,
  onSuccessfulChange: PropTypes.func,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  bg: PropTypes.string,
};

export default memo(InequalityChooser);
