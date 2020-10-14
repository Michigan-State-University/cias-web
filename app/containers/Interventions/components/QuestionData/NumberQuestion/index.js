import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import { colors } from 'theme/colors';
import { numericValidator } from 'utils/validators';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import messages from './messages';
import { UPDATE_DATA } from './constants';

const NumberQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <Box bg={colors.linkWater} width="100%" px={21} py={14}>
        <Row>
          <ApprovableInput
            type="singleline"
            keyboard="tel"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            validator={numericValidator}
            onCheck={newTitle => updateAnswer({ variable, payload: newTitle })}
            disabled
          />
        </Row>
      </Box>
    </Column>
  );
};

NumberQuestion.propTypes = {
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

export default injectIntl(compose(withConnect)(NumberQuestion));
