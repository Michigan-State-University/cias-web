import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import AppSlider from 'components/AppSlider';
import { visualAnalogScaleLabelStyles } from 'theme';

const VisualAnalogueScaleQuestionLayout = ({
  onChange,
  onAfterChange,
  startValue,
  endValue,
  answerValue,
  showNumber,
}) => {
  const labels = {
    0: {
      label: <>{startValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
    100: {
      label: <>{endValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
  };

  return (
    <Column mt={10} mb={10}>
      <Box width="100%">
        <Row>
          <Box width="100%" px={21} py={14}>
            <AppSlider
              step={1}
              onChange={onChange}
              value={answerValue}
              onAfterChange={onAfterChange}
              marks={labels}
              showValue={showNumber}
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
  showNumber: PropTypes.bool,
};

VisualAnalogueScaleQuestionLayout.defaultProps = {
  showNumber: true,
};

export default VisualAnalogueScaleQuestionLayout;
