import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-grid-system';

import Box from 'components/Box';
import CurrencySelect from 'components/CurrencySelect';
import StyledInput from 'components/Input/StyledInput';
import { currencyValidator } from 'utils/validators';
import messages from './messages';

const currencyRegex = /^[A-Z]{3}/;

const CurrencyQuestionLayout = ({ onChange, formatMessage, answerBody }) => {
  const value = answerBody && answerBody.value ? answerBody.value : '';

  const currency = value.match(currencyRegex)?.[0] ?? '';
  const amount = value.substring(currency.length).trim();

  useEffect(() => {
    if (!currency) handleOnSelect('USD');
  }, []);

  const processAmount = number => {
    if (number.endsWith('.')) return number.substr(0, number.length - 1);

    return number;
  };

  const handleOnInput = newValue =>
    onChange(`${currency} ${processAmount(newValue)}`);

  const handleOnSelect = newValue => onChange(`${newValue} ${amount}`);

  return (
    <Box width="100%">
      <Row style={{ padding: 26 }}>
        <Col xs={12} sm={4} style={{ marginBottom: 20 }}>
          <CurrencySelect
            value={currency}
            onSelect={handleOnSelect}
            disabled={false}
          />
        </Col>
        <Col xs={12} sm={8} style={{ marginBottom: 20 }}>
          <StyledInput
            disabled={false}
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
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CurrencyQuestionLayout;
