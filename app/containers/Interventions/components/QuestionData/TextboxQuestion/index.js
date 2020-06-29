import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';

import { colors } from 'theme/colors';
import messages from './messages';
import { UPDATE_DATA } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const TextboxQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const { variable, payload } = selectedQuestion.body.data[0];
  return (
    <Box bg={colors.linkWater} width="100%" px={21} py={14}>
      <Row>
        <ApprovableInput
          rows="5"
          placeholder={formatMessage(messages.placeholder)}
          value={payload}
          onCheck={newTitle => updateAnswer({ variable, payload: newTitle })}
        />
      </Row>
    </Box>
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

const mapDispatchToProps = dispatch => ({
  updateAnswer: value =>
    dispatch(updateQuestionData({ type: UPDATE_DATA, data: { value } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(TextboxQuestion));
