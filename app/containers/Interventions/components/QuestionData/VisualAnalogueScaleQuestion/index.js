import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import AppSlider from 'components/AppSlider';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import VisualAnalogueScaleQuestionLayout from 'containers/AnswerInterventionPage/layouts/VisualAnalogueScaleQuestionLayout';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { StyledInput } from 'components/Input/StyledInput';
import { visualAnalogScaleLabelStyles } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { canEdit } from 'models/Status/statusPermissions';
import messages from './messages';
import { UPDATE_DATA } from './constants';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  isNarratorTab,
  problemStatus,
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

  const editingPossible = canEdit(problemStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  return (
    <Column mt={10}>
      <Box width="100%" px={21} py={30}>
        <Column>
          <Row>
            <Box width="100%">
              {!isNarratorTabOrEditNotPossible && (
                <AppSlider
                  marks={labels}
                  disabled
                  showValue={!isNullOrUndefined(showNumber) && showNumber}
                />
              )}
              {isNarratorTabOrEditNotPossible && (
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
  isNarratorTab: PropTypes.bool,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateLabel: (value, label) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value, label } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(VisualAnalogueScaleQuestion));
