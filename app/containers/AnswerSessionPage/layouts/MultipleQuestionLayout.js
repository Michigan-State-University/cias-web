import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Column from 'components/Column';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import HoverableBox from 'components/Box/HoverableBox';
import AudioTextPreview from 'components/AudioTextPreview';

const margin = 21;

const MultipleQuestionLayout = ({
  data,
  questionId,
  check,
  selectedAnswersIndex,
  isMobile,
}) => (
  <Column>
    {data.map((questionAnswer, index) => {
      const {
        payload,
        variable: { name, value },
      } = questionAnswer;
      const isChecked = selectedAnswersIndex.includes(index);
      const ariaInputId = `answer-${index + 1}`;
      const key = `question-${questionId}-el-${index}`;

      return (
        <Row key={key} mb={10}>
          {!isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(payload)}
              previewKey={key}
            />
          )}
          <HoverableBox px={margin} py={14} filled clickable>
            <Checkbox
              id={ariaInputId}
              checked={isChecked}
              onChange={() => check(value, name, index)}
            >
              <Markup content={payload} />
            </Checkbox>
          </HoverableBox>
          {isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(payload)}
              previewKey={key}
            />
          )}
        </Row>
      );
    })}
  </Column>
);

MultipleQuestionLayout.propTypes = {
  data: PropTypes.array,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  check: PropTypes.func,
  selectedAnswersIndex: PropTypes.array,
  isMobile: PropTypes.bool,
};

export default MultipleQuestionLayout;
