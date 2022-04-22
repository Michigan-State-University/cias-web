import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';

const margin = 21;

const ThirdPartyQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
}) => (
  <Column>
    <Box>
      {data.map((questionAnswer, index) => {
        const {
          payload,
          value,
          report_template_ids: reportTemplateIds,
        } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;

        return (
          <Row key={`question-${questionId}-el-${index}`} mb={12}>
            <HoverableBox
              px={margin}
              py={14}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => handleClick(value, reportTemplateIds, index)}
            >
              <Row align="center" height="44">
                <Radio
                  id={ariaInputId}
                  data-cy={`single-question-${index}-checkbox`}
                  checked={isChecked}
                  mr={16}
                />
                <Markup content={payload} />
              </Row>
            </HoverableBox>
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
};

export default ThirdPartyQuestionLayout;
