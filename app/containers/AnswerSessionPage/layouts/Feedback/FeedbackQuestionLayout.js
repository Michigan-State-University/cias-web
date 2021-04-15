import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import { useContainerQuery } from 'react-container-query';

import {
  visualAnalogScaleBoldLabelStyles,
  visualAnalogScaleLabelStyles,
} from 'theme';

import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';

import FeedbackSlider from './FeedbackSlider';

const QUERY = { 'wrap-text': { maxWidth: containerBreakpoints.sm } };

const FeedbackQuestionLayout = ({
  startValue,
  endValue,
  targetValue: { target: targetValue } = { target: 0 },
  intl: { formatMessage },
  showSpectrum,
  setFeedbackSettings,
}) => {
  const [params, containerRef] = useContainerQuery(QUERY);

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
          ...(targetNumber
            ? {
                [lowerPosition]: {
                  label: <>{targetNumber}</>,
                  style: visualAnalogScaleBoldLabelStyles,
                },
              }
            : {}),
          [higherPosition]: {
            label: <>{higherValue}</>,
            style: visualAnalogScaleBoldLabelStyles,
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
          <Box ref={containerRef} width="100%" px={21} py={14}>
            <FeedbackSlider
              ref={sliderRef}
              targetValue={targetNumber}
              labels={labels}
              formatMessage={formatMessage}
              withSpectrum={showSpectrum}
              className={classnames(params)}
            />
          </Box>
        </Row>
      </Box>
    </Column>
  );
};

FeedbackQuestionLayout.propTypes = {
  startValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  targetValue: PropTypes.object,
  intl: PropTypes.object,
  showSpectrum: PropTypes.bool,
  setFeedbackSettings: PropTypes.func,
};

FeedbackQuestionLayout.defaultProps = {
  targetValue: { target: '0' }, // default to 0
};

export default injectIntl(FeedbackQuestionLayout);
