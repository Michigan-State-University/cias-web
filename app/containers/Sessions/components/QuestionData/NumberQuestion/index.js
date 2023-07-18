import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import NumberQuestionLayout from 'containers/AnswerSessionPage/layouts/NumberQuestionLayout';
import Box from 'components/Box';

const NumberQuestion = ({ selectedQuestion }) => {
  const {
    settings: { min_length: minLength, max_length: maxLength },
  } = selectedQuestion;
  return (
    <Box padding={16}>
      <NumberQuestionLayout
        disabled
        minLength={minLength}
        maxLength={maxLength}
      />
    </Box>
  );
};

NumberQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(NumberQuestion);
