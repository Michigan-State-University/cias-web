import React from 'react';
import Row from 'components/Row';
import Box from 'components/Box';
import { themeColors } from 'theme';
import PropTypes from 'prop-types';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';
import { numericValidator } from 'utils/validators';
import messages from './messages';

const NumberQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;
  return (
    <Box my={10} bg={themeColors.highlight} width="100%">
      <Row>
        <ApprovableInput
          width="100%"
          mr={0}
          type="singleline"
          keyboard="tel"
          value={answerBody.payload ? answerBody.payload.toString() : ''}
          placeholder={formatMessage(messages.numberPlaceholder)}
          validator={numericValidator}
          onCheck={e => {
            selectAnswer({
              var: name,
              payload: parseInt(e, 10),
            });
          }}
        />
      </Row>
    </Box>
  );
};

NumberQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default NumberQuestion;
