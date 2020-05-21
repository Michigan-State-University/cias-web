import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import { QuestionTypes } from 'models/Intervention/QuestionTypes';
import messages from './messages';
import { fontSizes } from '../../../../theme/fonts';
import { DotCircle } from './styled';
import HoverableBox from '../../../../components/Box/HoverableBox';
import { boxShadows, borders } from '../../../../theme/general';
import { colors } from '../../../../theme/colors';

const QuestionTypeChooser = ({ intl: { formatMessage }, onClick }) => (
  <Box borderRadius={10} shadow={boxShadows[1]}>
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
      <Box padding={8}>
        <Column>
          {QuestionTypes.map((questionType, i) => (
            <HoverableBox
              onClick={onClick}
              padding={8}
              {...(i !== QuestionTypes.length - 1 ? { mb: 4 } : {})}
            >
              <Row align="center" onClick={onClick}>
                <DotCircle mr={18} bg={questionType.color} />
                <Text>{questionType.name}</Text>
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
};

export default injectIntl(QuestionTypeChooser);
