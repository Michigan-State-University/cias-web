import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import HoverableBox from 'components/Box/HoverableBox';

import { stepTypes, stepTypeToColorMap } from 'models/Narrator/StepTypes';
import { colors, boxShadows, borders, fontSizes } from 'theme';
import messages from './messages';
import { DotCircle } from './styled';

const decideIfAddMargin = i => (i !== stepTypes.length - 1 ? { mb: 4 } : {});

const StepTypeChooser = ({ intl: { formatMessage }, onClick, visible }) => (
  <Box
    borderRadius={10}
    shadow={boxShadows[1]}
    position="absolute"
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
      <Box padding={8}>
        <Column>
          {stepTypes.map((stepType, i) => (
            <HoverableBox
              key={`narrator-block-types-${i}`}
              onClick={() => onClick(stepType)}
              padding={8}
              {...decideIfAddMargin(i)}
            >
              <Row align="center">
                <DotCircle mr={18} bg={stepTypeToColorMap[stepType]} />
                <Text fontWeight="medium">
                  {formatMessage(messages.stepTypes[stepType])}
                </Text>
              </Row>
            </HoverableBox>
          ))}
        </Column>
      </Box>
    </Row>
  </Box>
);

StepTypeChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default injectIntl(StepTypeChooser);
