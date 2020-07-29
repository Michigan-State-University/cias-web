import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import HoverableBox from 'components/Box/HoverableBox';

const margin = 21;

const MultipleQuestionLayout = ({
  data,
  questionId,
  check,
  selectedAnswersIndex,
}) => (
  <Column>
    {data.map((questionAnswer, index) => {
      const {
        payload,
        variable: { name, value },
      } = questionAnswer;
      const isChecked = selectedAnswersIndex.includes(index);

      return (
        <Row key={`question-${questionId}-el-${index}`} mb={10}>
          <HoverableBox
            px={margin}
            py={14}
            width={`calc(100% + ${margin}px)`}
            clickable
            onClick={() => check(payload, value, name, index)}
          >
            <Row align="center" padding={10}>
              <Checkbox checked={isChecked} mr={16} />
              <div dangerouslySetInnerHTML={{ __html: payload }} />
            </Row>
          </HoverableBox>
        </Row>
      );
    })}
  </Column>
);

MultipleQuestionLayout.propTypes = {
  data: PropTypes.array,
  questionId: PropTypes.string,
  check: PropTypes.func,
  selectedAnswersIndex: PropTypes.array,
};

export default MultipleQuestionLayout;
