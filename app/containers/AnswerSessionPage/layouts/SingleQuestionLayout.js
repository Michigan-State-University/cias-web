import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import AudioTextPreview from 'components/AudioTextPreview';
import MarkupContainer from 'components/MarkupContainer';

const margin = 21;

const SingleQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
  isMobile,
  disabled,
  dynamicElementsDirection,
}) => (
  <Column dir={dynamicElementsDirection}>
    <Box>
      {data.map((questionAnswer, index) => {
        const { payload, value, hfh_value: hfhValue } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;
        const key = `question-${questionId}-el-${index}`;

        return (
          <Row key={key} marginBlockEnd={12} align="center">
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
              onClick={(event) => {
                event.preventDefault();
                handleClick(value, index, hfhValue);
              }}
              disabled={disabled}
            >
              <Radio
                id={ariaInputId}
                data-cy={`single-question-${index}-checkbox`}
                checked={isChecked}
              >
                <MarkupContainer>
                  <Markup content={payload} noWrap />
                </MarkupContainer>
              </Radio>
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
    </Box>
  </Column>
);

SingleQuestionLayout.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
  selectedAnswerIndex: PropTypes.number,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool,
  disabled: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
};

export default SingleQuestionLayout;
