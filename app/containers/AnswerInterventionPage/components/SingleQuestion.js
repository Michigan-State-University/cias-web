import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import HoverableBox from 'components/Box/HoverableBox';
import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';
import Question from 'models/Intervention/Question';

const margin = 21;

const SingleQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  questionIndex,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const {
    body: {
      data,
      variable: { name },
    },
    settings: { proceed_button: proceedButton },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswerIndex(answerBody.length ? answerBody[0].index : null);
  }, [id]);

  const handleClick = (payload, value, index) => {
    selectAnswer([
      {
        var: name,
        payload,
        value,
        index,
      },
    ]);
    setSelectedAnswerIndex(index);

    if (!proceedButton) {
      saveAnswer(questionIndex + 1);
    }
  };

  return (
    <Column mt={10} mb={10}>
      {data.map((questionAnswer, index) => {
        const { payload, value } = questionAnswer;
        return (
          <Row key={`question-${question.id}-el-${index}`}>
            <HoverableBox
              px={margin}
              py={14}
              mx={-margin}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => handleClick(payload, value, index)}
            >
              <Row align="center">
                <Img
                  src={selectedAnswerIndex === index ? radioChecked : radio}
                  mr={16}
                />
                <div dangerouslySetInnerHTML={{ __html: payload }} />
              </Row>
            </HoverableBox>
          </Row>
        );
      })}
    </Column>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  questionIndex: PropTypes.number,
  saveAnswer: PropTypes.func,
};

export default SingleQuestion;
