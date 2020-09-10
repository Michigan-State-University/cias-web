/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Handle } from 'rc-slider';
import PropTypes from 'prop-types';

import { fontSizes } from 'theme';

import Text from 'components/Text';

import messages from '../messages';
import {
  ValueSliderWrapperStyled,
  ValueSliderStyled,
  CustomSlider,
} from '../styled';

const renderHandle = (withSpectrum, formatMessage) =>
  withSpectrum
    ? React.forwardRef(({ ...props }, ref) => (
        <Handle ref={ref} {...props}>
          <ValueSliderWrapperStyled>
            <ValueSliderStyled>
              <Text fontSize={fontSizes.regular}>
                {formatMessage(messages.endUserValue)}
              </Text>
            </ValueSliderStyled>
          </ValueSliderWrapperStyled>
        </Handle>
      ))
    : null;

const FeedbackSlider = React.forwardRef(
  ({ targetValue, labels, formatMessage, withSpectrum }, sliderRef) => (
    <CustomSlider
      withSpectrum={withSpectrum}
      ref={sliderRef}
      value={targetValue}
      marks={labels}
      customHandle={renderHandle(withSpectrum, formatMessage)}
      disabled
    />
  ),
);

FeedbackSlider.propTypes = {
  targetValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labels: PropTypes.object,
  formatMessage: PropTypes.func,
  withSpectrum: PropTypes.bool,
};

export default FeedbackSlider;
