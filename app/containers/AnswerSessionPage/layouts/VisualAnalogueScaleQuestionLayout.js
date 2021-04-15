import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useContainerQuery } from 'react-container-query';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import { visualAnalogScaleLabelStyles } from 'theme';
import { VisualAnalogueSlider } from './styled';

const QUERY = { 'wrap-text': { maxWidth: containerBreakpoints.sm } };

const VisualAnalogueScaleQuestionLayout = ({
  onChange,
  onAfterChange,
  startValue,
  endValue,
  answerValue,
  showNumber,
}) => {
  const [params, containerRef] = useContainerQuery(QUERY);

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
          <Box ref={containerRef} width="100%" px={21} py={14}>
            <VisualAnalogueSlider
              step={1}
              onChange={onChange}
              value={answerValue}
              onAfterChange={onAfterChange}
              marks={labels}
              showValue={showNumber}
              className={classnames(params)}
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
