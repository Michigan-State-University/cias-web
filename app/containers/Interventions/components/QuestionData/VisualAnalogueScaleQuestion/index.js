import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';
import VisualAnalogueScaleQuestionLayout from 'containers/AnswerInterventionPage/layouts/VisualAnalogueScaleQuestionLayout';

import AppSlider from 'components/AppSlider';
import Box from 'components/Box';
import Column from 'components/Column';
import { BadgeInput } from 'components/Input/BadgeInput';
import { StyledInput } from 'components/Input/StyledInput';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { visualAnalogScaleLabelStyles, colors } from 'theme';
import { variableNameValidator } from 'utils/validators';

import messages from './messages';
import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  updateVariable,
  isNarratorTab,
  intl: { formatMessage },
}) => {
  const {
    body: { variable, data },
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
          onBlur={value => updateLabel(value, 'start_value')}
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
          onBlur={value => updateLabel(value, 'end_value')}
        />
      ),
      style: visualAnalogScaleLabelStyles,
    },
  };

  return (
    <Column mt={10}>
      <Row display="flex" hidden={isNarratorTab} mb={10}>
        <BadgeInput
          px={0}
          py={12}
          textAlign="center"
          keyboard="tel"
          validator={variableNameValidator}
          placeholder={formatMessage(
            globalMessages.variables.variableNamePlaceholder,
          )}
          value={variable.name}
          color={colors.jungleGreen}
          onBlur={val => updateVariable(val)}
        />
      </Row>
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
                <VisualAnalogueScaleQuestionLayout
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

VisualAnalogueScaleQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateLabel: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateLabel: (value, label) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value, label } }),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(VisualAnalogueScaleQuestion));
