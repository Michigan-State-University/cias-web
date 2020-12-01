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
import { colors } from 'theme/colors';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import messages from './messages';
import { UPDATE_DATA } from './constants';

const TextboxQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];

  return (
    <Column mt={10}>
      <Box
        bgOpacity={0}
        width="100%"
        px={21}
        py={14}
        border={`1px solid ${colors.casper}`}
      >
        <Row>
          <ApprovableInput
            rows="5"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            onCheck={newTitle => updateAnswer({ payload: newTitle })}
            disabled
          />
        </Row>
      </Box>
    </Column>
  );
};

TextboxQuestion.propTypes = {
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

export default injectIntl(compose(withConnect)(TextboxQuestion));
