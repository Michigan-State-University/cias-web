import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import Column from 'components/Column';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import webpage from 'assets/svg/webpage-mouseover.svg';
import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';
import { colors } from 'theme';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import {
  singleQuestion,
  multiQuestion,
  gridQuestion,
} from 'models/Intervention/QuestionTypes';

const possibleQuestions = [
  singleQuestion.id,
  multiQuestion.id,
  gridQuestion.id,
];

const QuestionListDropdown = ({
  onClick,
  questions,
  selectedQuestion: { id } = {},
  chosenQuestionId,
}) => {
  const canSelectQuestion = questionId => id !== questionId;

  const filteredQuestions = questions.filter(question =>
    possibleQuestions.includes(question.type),
  );

  return (
    <Row>
      <Box padding={8} overflow="hidden" filled>
        <Column data-testid={`${id}-select-target-question`}>
          <Box maxHeight="300px">
            <Column>
              {filteredQuestions.map((question, index) => (
                <Row
                  data-testid={`${id}-select-target-question-el`}
                  key={`${id}-select-target-question-${index}`}
                  mb={index !== filteredQuestions.length - 1 && 15}
                  onClick={() =>
                    canSelectQuestion(question.id) && onClick(question)
                  }
                  clickable={canSelectQuestion(question.id)}
                >
                  <Img
                    src={
                      chosenQuestionId === question.id
                        ? webpageSelected
                        : webpage
                    }
                    mr={10}
                  />
                  <Text
                    textOverflow="ellipsis"
                    whiteSpace="pre"
                    overflow="hidden"
                    color={!canSelectQuestion(question.id) ? colors.grey : ''}
                    fontWeight={chosenQuestionId === question.id ? 'bold' : ''}
                  >
                    {htmlToPlainText(question.title)}
                  </Text>
                </Row>
              ))}
            </Column>
          </Box>
        </Column>
      </Box>
    </Row>
  );
};

QuestionListDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.shape(Question),
  chosenQuestionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionListDropdown);
