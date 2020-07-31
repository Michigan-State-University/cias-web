import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import AppSlider from 'components/AppSlider';

import { visualAnalogScaleLabel } from 'theme';

const VisualAnalogueScaleQuestionLayout = ({
  onChange,
  onAfterChange,
  startValue,
  endValue,
  answerValue,
}) => {
  const labels = {
    0: {
      label: <>{startValue}</>,
      style: visualAnalogScaleLabel,
    },
    100: {
      label: <>{endValue}</>,
      style: visualAnalogScaleLabel,
    },
  };

  return (
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
              marks={labels}
            />
          </Box>
        </Row>
      </Box>
    </Column>
  );
};

VisualAnalogueScaleQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  startValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  answerValue: PropTypes.number,
};

export default VisualAnalogueScaleQuestionLayout;
