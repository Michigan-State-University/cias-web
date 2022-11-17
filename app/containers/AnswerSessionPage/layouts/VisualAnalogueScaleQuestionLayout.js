import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useContainerQuery } from 'react-container-query';

import { visualAnalogScaleLabelStyles } from 'theme';

import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';

import { VisualAnalogueSlider } from './styled';
import { QUESTION_SUBTITLE_ID, QUESTION_TITLE_ID } from '../constants';

const QUERY = { 'wrap-text': { maxWidth: containerBreakpoints.sm } };

const VisualAnalogueScaleQuestionLayout = ({
  onChange,
  onAfterChange,
  startValue,
  endValue,
  answerValue,
  showNumber,
  rangeStart,
  rangeEnd,
}) => {
  const [params, containerRef] = useContainerQuery(QUERY);

  const labels = {
    [rangeStart]: {
      label: <>{startValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
    [rangeEnd]: {
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
              min={rangeStart}
              max={rangeEnd}
              step={1}
              onChange={onChange}
              value={answerValue}
              onAfterChange={onAfterChange}
              marks={labels}
              showValue={showNumber}
              className={classnames(params)}
              ariaLabelledByForHandle={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
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
  rangeStart: PropTypes.number,
  rangeEnd: PropTypes.number,
  showNumber: PropTypes.bool,
};

VisualAnalogueScaleQuestionLayout.defaultProps = {
  showNumber: true,
};

export default VisualAnalogueScaleQuestionLayout;
