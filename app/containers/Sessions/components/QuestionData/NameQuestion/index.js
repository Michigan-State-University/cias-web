import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Session/Question';
import Row from 'components/Row';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import messages from './messages';
import { UPDATE_DATA } from './constants';

const NameQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <Box width="100%" padding={15}>
        <Row>
          <ApprovableInput
            disabled
            width={200}
            height={50}
            placeholder={formatMessage(messages.enterName)}
            type="date"
            value={Date.parse(payload)}
            onCheck={value => updateAnswer({ variable, payload: value })}
            fontSize={15}
          />
        </Row>
      </Box>
    </Column>
  );
};

NameQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateAnswer: value =>
    updateQuestionData({ type: UPDATE_DATA, data: { value } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(NameQuestion));
