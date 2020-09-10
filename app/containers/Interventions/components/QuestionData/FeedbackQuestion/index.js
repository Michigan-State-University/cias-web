import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import FeedbackQuestionLayout from 'containers/AnswerInterventionPage/layouts/Feedback/FeedbackQuestionLayout';

import AppSlider from 'components/AppSlider';
import Box from 'components/Box';
import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { visualAnalogScaleLabelStyles } from 'theme';
import messages from './messages';

import { updateLabel } from './actions';

const FeedbackQuestion = ({
  selectedQuestion,
  onUpdateLabel,
  isNarratorTab,
  intl: { formatMessage },
}) => {
  const {
    body: { data },
    settings: { show_number: showNumber },
  } = selectedQuestion;
  const {
    payload: { start_value: startValue, end_value: endValue },
  } = data[0];

  const labels = {
    0: {
      label: (
        <StyledInput
          width={120}
          py={9}
          textAlign="center"
          placeholder={formatMessage(messages.startValue)}
          value={startValue}
          onBlur={value => onUpdateLabel(value, 'start_value')}
        />
      ),
      style: visualAnalogScaleLabelStyles,
    },
    100: {
      label: (
        <StyledInput
          width={120}
          py={9}
          textAlign="center"
          placeholder={formatMessage(messages.endValue)}
          value={endValue}
          onBlur={value => onUpdateLabel(value, 'end_value')}
        />
      ),
      style: visualAnalogScaleLabelStyles,
    },
  };

  return (
    <Column mt={10}>
      <Box width="100%" px={21} py={30}>
        <Column>
          <Row>
            <Box width="100%">
              {!isNarratorTab && (
                <AppSlider
                  marks={labels}
                  disabled
                  showValue={!isNullOrUndefined(showNumber) && showNumber}
                />
              )}
              {isNarratorTab && (
                <FeedbackQuestionLayout
                  startValue={startValue}
                  endValue={endValue}
                  showNumber={!isNullOrUndefined(showNumber) && showNumber}
                />
              )}
            </Box>
          </Row>
        </Column>
      </Box>
    </Column>
  );
};

FeedbackQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  onUpdateLabel: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  onUpdateLabel: updateLabel,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(FeedbackQuestion));
