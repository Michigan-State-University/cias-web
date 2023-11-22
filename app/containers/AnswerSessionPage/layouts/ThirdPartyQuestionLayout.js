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

const ThirdPartyQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
  isMobile,
  disabled,
}) => (
  <Column>
    <Box>
      {data.map((questionAnswer, index) => {
        const {
          payload,
          value,
          report_template_ids: reportTemplateIds,
          numeric_value: numericValue,
        } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;
        const key = `question-${questionId}-el-${index}`;

        return (
          <Row key={key} mb={12} align="center">
            {!isMobile && (
              <AudioTextPreview
                text={htmlToPlainText(payload)}
                previewKey={key}
              />
            )}
            <HoverableBox
              px={margin}
              py={14}
              filled
              clickable
              disabled={disabled}
              onClick={() =>
                handleClick(value, reportTemplateIds, numericValue, index)
              }
            >
              <Radio
                id={ariaInputId}
                data-cy={`single-question-${index}-checkbox`}
                checked={isChecked}
                disabled={disabled}
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

ThirdPartyQuestionLayout.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
  selectedAnswerIndex: PropTypes.number,
  questionId: PropTypes.string,
  isMobile: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ThirdPartyQuestionLayout;
