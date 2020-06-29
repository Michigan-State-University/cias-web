import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import HoverableBox from 'components/Box/HoverableBox';

import { QuestionTypes } from 'models/Intervention/QuestionTypes';
import { colors, boxShadows, borders, fontSizes } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { DotCircle } from './styled';

const decideIfAddMargin = i =>
  i !== QuestionTypes.length - 1 ? { mb: 4 } : {};

const QuestionTypeChooser = ({ intl: { formatMessage }, onClick, visible }) => (
  <Box
    borderRadius={10}
    shadow={boxShadows[1]}
    position="absolute"
    width="100%"
    mt={15}
    {...(visible ? {} : { display: 'none' })}
  >
    <Box
      borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
        colors.linkWater
      }`}
      padded
    >
      <Text fontWeight="bold" fontSize={fontSizes.regular}>
        {formatMessage(messages.header)}
      </Text>
    </Box>
    <Row>
      <Box padding={8} width="100%">
        <Column>
          {QuestionTypes.map((questionType, i) => (
            <HoverableBox
              key={questionType.id}
              onClick={() => onClick(questionType.id)}
              padding={8}
              {...decideIfAddMargin(i)}
            >
              <Row align="center">
                <DotCircle mr={18} bg={questionType.color} />
                <Text fontWeight="medium">
                  {formatMessage(globalMessages.questionTypes[questionType.id])}
                </Text>
              </Row>
            </HoverableBox>
          ))}
        </Column>
      </Box>
    </Row>
  </Box>
);

QuestionTypeChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default injectIntl(QuestionTypeChooser);
