import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { visualAnalogScaleLabelStyles } from 'theme';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';

import FeedbackSlider from './FeedbackSlider';

const VisualAnalogueScaleQuestionLayout = ({
  startValue,
  endValue,
  targetValue,
  intl: { formatMessage },
  showSpectrum,
  setFeedbackSettings,
}) => {
  const sliderRef = useRef(null);
  const targetNumber = parseInt(targetValue, 10);
  const higherValue = 100 - targetNumber;
  const lowerPosition = targetNumber / 2;
  const higherPosition = targetNumber + higherValue / 2;

  const labels = {
    0: {
      label: <>{startValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
    ...(showSpectrum
      ? {
          [lowerPosition]: {
            label: <>{targetNumber}</>,
            style: visualAnalogScaleLabelStyles,
          },
          [higherPosition]: {
            label: <>{higherValue}</>,
            style: visualAnalogScaleLabelStyles,
          },
        }
      : {}),
    100: {
      label: <>{endValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
  };

  useEffect(() => {
    if (setFeedbackSettings) {
      setFeedbackSettings('sliderRef', sliderRef.current);
      return () => setFeedbackSettings('sliderRef', null);
    }
  }, [sliderRef.current]);

  return (
    <Column mt={10} mb={10}>
      <Box width="100%">
        <Row>
          <Box width="100%" px={21} py={14}>
            <FeedbackSlider
              ref={sliderRef}
              targetValue={targetNumber}
              labels={labels}
              formatMessage={formatMessage}
              withSpectrum={showSpectrum}
            />
          </Box>
        </Row>
      </Box>
    </Column>
  );
};

VisualAnalogueScaleQuestionLayout.propTypes = {
  startValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  targetValue: PropTypes.string,
  intl: PropTypes.object,
  showSpectrum: PropTypes.bool,
  setFeedbackSettings: PropTypes.func,
};

VisualAnalogueScaleQuestionLayout.defaultProps = {
  targetValue: '0', // default to 0
};

export default injectIntl(VisualAnalogueScaleQuestionLayout);
