import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { Row, Col } from 'react-grid-system';

import StyledInput from 'components/Input/StyledInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Session/Question';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { currencyValidator } from 'utils/validators';
import CurrencySelect from 'components/CurrencySelect';
import messages from './messages';

const CurrencyQuestion = ({ selectedQuestion, intl: { formatMessage } }) => {
  const { payload } = selectedQuestion.body.data[0];

  return (
    <Column mt={10}>
      <Box width="100%">
        <Row style={{ padding: 26 }}>
          <Col xs={12} sm={4}>
            <CurrencySelect disabled />
          </Col>
          <Col xs={12} sm={8}>
            <StyledInput
              disabled
              width={200}
              placeholder={formatMessage(messages.amountPlaceholder)}
              inputmode="decimal"
              type="singleline"
              value={payload}
              validator={currencyValidator}
              fontSize={15}
              transparent={false}
            />
          </Col>
        </Row>
      </Box>
    </Column>
  );
};

CurrencyQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default injectIntl(compose(withConnect)(CurrencyQuestion));
