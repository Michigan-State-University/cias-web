import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import AppSlider from 'components/AppSlider';

const VisualAnalogueScaleQuestionLayout = ({
  onChange,
  onAfterChange,
  startValue,
  endValue,
  answerValue,
}) => (
  <Column mt={10} mb={10}>
    <Box width="100%">
      <Row>
        <Box width="100%" px={21} py={14}>
          <AppSlider
            showValue
            step={1}
            onChange={onChange}
            value={answerValue}
            onAfterChange={onAfterChange}
            min={0}
            max={100}
          />
        </Box>
      </Row>
      <Row justify="between" filled padding="5px">
        <Box>{startValue}</Box>
        <Box>{endValue}</Box>
      </Row>
    </Box>
  </Column>
);

VisualAnalogueScaleQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  startValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  answerValue: PropTypes.number,
};

export default VisualAnalogueScaleQuestionLayout;
