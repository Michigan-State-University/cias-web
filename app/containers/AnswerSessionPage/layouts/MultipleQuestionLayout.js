import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Column from 'components/Column';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import AudioTextPreview from 'components/AudioTextPreview';
import MarkupContainer from 'components/MarkupContainer';
import Img from 'components/Img';

const margin = 21;

const MultipleQuestionLayout = ({
  data,
  questionId,
  check,
  selectedAnswersIndex,
  isMobile,
  disabled,
  dynamicElementsDirection,
  answerImages = [],
}) => (
  <Column dir={dynamicElementsDirection}>
    {data.map((questionAnswer, index) => {
      const {
        payload,
        variable: { name, value },
        id: answerId,
      } = questionAnswer;
      const isChecked = selectedAnswersIndex.includes(index);
      const ariaInputId = `answer-${index + 1}`;
      const key = `question-${questionId}-el-${index}`;

      // Find the image for this answer
      const answerImage = answerImages.find(
        (img) => img.answer_id === answerId,
      );

      return (
        <Row key={key} marginBlockEnd={10}>
          {!isMobile && (
            <AudioTextPreview
              text={htmlToPlainText(payload)}
              previewKey={key}
            />
          )}
          <HoverableBox
            paddingInline={margin}
            paddingBlock={14}
            filled
            clickable
            disabled={disabled}
          >
            <Checkbox
              id={ariaInputId}
              checked={isChecked}
              onChange={() => check(value, name, index)}
              disabled={disabled}
            >
              <Column>
                {answerImage && (
                  <Box marginBlockEnd={8}>
                    <Img
                      src={answerImage.url}
                      alt={answerImage.alt || `Answer ${index + 1} image`}
                      maxWidth="200px"
                      height="auto"
                    />
                  </Box>
                )}
                <MarkupContainer>
                  <Markup content={payload} noWrap />
                </MarkupContainer>
              </Column>
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
  disabled: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
  answerImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
      answer_id: PropTypes.string.isRequired,
    }),
  ),
};

export default MultipleQuestionLayout;
