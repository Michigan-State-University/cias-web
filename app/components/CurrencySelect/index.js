import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { codes } from 'currency-codes';
import union from 'lodash/union';

import 'currency-flags/dist/currency-flags.min.css';

import Select from 'components/Select';
import Row from 'components/Row';
import Text from 'components/Text';

import { popularCurrencies } from './constants';
import messages from './messages';

const CurrencySelect = ({ disabled, value, onSelect, inputId }) => {
  const { formatMessage } = useIntl();

  const getCodeLabel = (currency = 'USD') => (
    <Row align="center">
      <div
        className={`currency-flag currency-flag-${currency.toLowerCase()}`}
      />
      <Text ml={10} fontSize={18}>{`${currency}`}</Text>
    </Row>
  );

  const handleOnSelect = option => onSelect(option.value);

  const prefixOptions = useMemo(
    () =>
      union(popularCurrencies, codes()).map(currency => ({
        value: currency,
        label: getCodeLabel(currency),
      })),
    [],
  );

  const selectedValue = useMemo(
    () => prefixOptions.find(option => option.value === value),
    [value],
  );

  return (
    <Select
      width="100%"
      selectProps={{
        isDisabled: disabled,
        options: prefixOptions,
        value: selectedValue,
        onChange: handleOnSelect,
        placeholder: formatMessage(messages.placeholder),
        noOptionsMessage: () => formatMessage(messages.notFound),
        inputId,
      }}
    />
  );
};

CurrencySelect.propTypes = {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  inputId: PropTypes.string,
};

export default memo(CurrencySelect);
