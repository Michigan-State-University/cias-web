import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Row, Col } from 'react-grid-system';

import { currencyValidator } from 'utils/validators';

import Box from 'components/Box';
import CurrencySelect from 'components/CurrencySelect';
import StyledInput from 'components/Input/StyledInput';
import Text from 'components/Text';

import messages from './messages';

const currencyRegex = /^[A-Z]{3}/;

const CurrencyQuestionLayout = ({ onChange, answerBody, disabled }) => {
  const { formatMessage } = useIntl();

  const value = answerBody && answerBody.value ? answerBody.value : '';

  const currency = value.match(currencyRegex)?.[0] ?? '';
  const amount = value.substring(currency.length).trim();

  useEffect(() => {
    if (!currency) handleOnSelect('USD', false);
  }, []);

  const processAmount = (number) => {
    if (number.endsWith('.')) return number.substr(0, number.length - 1);

    return number;
  };

  const handleOnInput = (newValue) =>
    !disabled && onChange(`${currency} ${processAmount(newValue)}`);

  const handleOnSelect = (newValue, selectedByUser = true) =>
    !disabled && onChange(`${newValue} ${amount}`, selectedByUser);

  return (
    <Box width="100%">
      <Row style={{ padding: 26 }} align="end">
        <Col xs={12} sm={4} style={{ marginBottom: 20 }}>
          <label htmlFor="currencyCodeLabel">
            <Text mb={5}>{formatMessage(messages.currencyCodeLabel)}</Text>
          </label>

          <CurrencySelect
            value={currency}
            onSelect={handleOnSelect}
            disabled={disabled}
            inputId="currencyCodeLabel"
          />
        </Col>

        <Col xs={12} sm={8} style={{ marginBottom: 20 }}>
          <label htmlFor="currencyAmountLabel">
            <Text mb={5}>{formatMessage(messages.currencyAmountLabel)}</Text>
          </label>

          <StyledInput
            id="currencyAmountLabel"
            disabled={disabled}
            width={200}
            placeholder={formatMessage(messages.amountPlaceholder)}
            inputmode="decimal"
            type="singleline"
            value={amount}
            onBlur={handleOnInput}
            validator={currencyValidator}
            fontSize={15}
            transparent={false}
          />
        </Col>
      </Row>
    </Box>
  );
};

CurrencyQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CurrencyQuestionLayout;
