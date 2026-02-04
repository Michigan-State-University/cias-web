import React, { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { useContainerQuery } from 'react-container-query';

import {
  visualAnalogScaleBoldLabelStyles,
  visualAnalogScaleLabelStyles,
} from 'theme';

import {
  QUESTION_SUBTITLE_ID,
  QUESTION_TITLE_ID,
} from 'containers/AnswerSessionPage/constants';

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
  showSpectrum,
  setFeedbackSettings,
  dynamicElementsDirection,
}) => {
  const { formatMessage } = useIntl();
  const [params, containerRef] = useContainerQuery(QUERY);

  const sliderRef = useRef(null);
  const targetNumber = parseInt(targetValue, 10);
  const higherValue = 100 - targetNumber;
  const lowerPosition = targetNumber / 2;
  const higherPosition = targetNumber + higherValue / 2;

  const reverse = dynamicElementsDirection === 'rtl';

  const labels = {
    0: {
      label: startValue,
      style: visualAnalogScaleLabelStyles,
    },
    ...(showSpectrum
      ? {
          ...(targetNumber
            ? {
                [lowerPosition]: {
                  label: targetNumber,
                  style: visualAnalogScaleBoldLabelStyles,
                },
              }
            : {}),
          [higherPosition]: {
            label: higherValue,
            style: visualAnalogScaleBoldLabelStyles,
          },
        }
      : {}),
    100: {
      label: endValue,
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
    <Column marginBlock={10}>
      <Box width="100%">
        <Row>
          <Box
            ref={containerRef}
            width="100%"
            paddingInline={21}
            paddingBlock={14}
          >
            <FeedbackSlider
              ref={sliderRef}
              targetValue={targetNumber}
              labels={labels}
              formatMessage={formatMessage}
              withSpectrum={showSpectrum}
              className={classnames(params)}
              ariaLabelledByForHandle={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
              reverse={reverse}
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
  showSpectrum: PropTypes.bool,
  setFeedbackSettings: PropTypes.func,
  dynamicElementsDirection: PropTypes.string,
};

FeedbackQuestionLayout.defaultProps = {
  targetValue: { target: '0' }, // default to 0
};

export default memo(FeedbackQuestionLayout);
