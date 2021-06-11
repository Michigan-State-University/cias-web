import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import H3 from 'components/H3';

import messages from './messages';

const margin = 21;

const ThirdPartyQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Column>
      <Box>
        {data.map((questionAnswer, index) => {
          const { payload, value } = questionAnswer;
          const isChecked = selectedAnswerIndex === index;

          return (
            <Row key={`question-${questionId}-el-${index}`} mb={12}>
              <HoverableBox
                px={margin}
                py={14}
                width={`calc(100% + ${margin}px)`}
                clickable
                onClick={() => handleClick(value, index)}
              >
                <Row align="center" height="44">
                  <Radio
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

      <H3 color={colors.flamingo} textAlign="center">
        {formatMessage(messages.wcagThirdPartyWarning)}
      </H3>
    </Column>
  );
};

ThirdPartyQuestionLayout.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
  selectedAnswerIndex: PropTypes.number,
  questionId: PropTypes.string,
};

export default ThirdPartyQuestionLayout;
