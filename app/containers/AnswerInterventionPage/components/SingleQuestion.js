import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import HoverableBox from 'components/Box/HoverableBox';
import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';

const SingleQuestion = ({ question, answer, selectAnswer }) => {
  const {
    attributes: {
      body: {
        data,
        variable: { name },
      },
    },
  } = question;
  return (
    <Column mt={10} mb={10}>
      {data.map((questionAnswer, index) => {
        const { payload, value } = questionAnswer;
        return (
          <Row key={`question-${question.id}-el-${index}`}>
            <HoverableBox
              px={21}
              py={14}
              width="100%"
              clickable
              onClick={() =>
                selectAnswer({
                  answer: payload,
                  value,
                  variable: name,
                })
              }
            >
              <Row align="center">
                <Img src={answer === value ? radioChecked : radio} mr={16} />
                {payload}
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
  answer: PropTypes.any,
  selectAnswer: PropTypes.func,
};

export default SingleQuestion;
