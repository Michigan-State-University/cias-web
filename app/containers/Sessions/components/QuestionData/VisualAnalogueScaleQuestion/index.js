import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  QUESTION_SUBTITLE_ID,
  QUESTION_TITLE_ID,
} from 'containers/AnswerSessionPage/constants';

import AppSlider from 'components/AppSlider';
import Box from 'components/Box';
import Column from 'components/Column';
import { QuestionDTO } from 'models/Question';
import Row from 'components/Row';
import VisualAnalogueScaleQuestionLayout from 'containers/AnswerSessionPage/layouts/VisualAnalogueScaleQuestionLayout';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { StyledInput } from 'components/Input/StyledInput';
import OriginalTextHover from 'components/OriginalTextHover';
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
  interventionStatus,
  intl: { formatMessage },
}) => {
  const {
    id,
    body: { data },
    settings: { show_number: showNumber },
  } = selectedQuestion;
  const {
    payload: {
      start_value: startValue,
      end_value: endValue,
      original_text: originalText,
    },
  } = data[0];

  const editingPossible = canEdit(interventionStatus);

  const labels = {
    0: {
      label: (
        <OriginalTextHover
          id={`question-${id}-start`}
          text={originalText?.start_value}
          gap={5}
        >
          <StyledInput
            disabled={!editingPossible}
            width={120}
            py={9}
            textAlign="center"
            placeholder={formatMessage(messages.startValue)}
            value={startValue}
            onBlur={(value) => updateLabel(value, 'start_value')}
          />
        </OriginalTextHover>
      ),
      style: visualAnalogScaleLabelStyles,
    },
    100: {
      label: (
        <OriginalTextHover
          id={`question-${id}-end`}
          text={originalText?.end_value}
          gap={5}
        >
          <StyledInput
            disabled={!editingPossible}
            width={120}
            py={9}
            textAlign="center"
            placeholder={formatMessage(messages.endValue)}
            value={endValue}
            onBlur={(value) => updateLabel(value, 'end_value')}
          />
        </OriginalTextHover>
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
                  ariaLabelledByForHandle={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
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
  selectedQuestion: PropTypes.shape(QuestionDTO).isRequired,
  intl: PropTypes.object.isRequired,
  updateLabel: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateLabel: (value, label) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value, label } }),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(VisualAnalogueScaleQuestion));
