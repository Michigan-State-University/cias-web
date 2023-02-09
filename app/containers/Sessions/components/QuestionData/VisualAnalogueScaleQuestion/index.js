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
import Row from 'components/Row';
import VisualAnalogueScaleQuestionLayout from 'containers/AnswerSessionPage/layouts/VisualAnalogueScaleQuestionLayout';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { StyledInput } from 'components/Input/StyledInput';
import OriginalTextHover from 'components/OriginalTextHover';
import { BadgeInput } from 'components/Input/BadgeInput';
import { visualAnalogScaleLabelStyles, colors } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { canEdit } from 'models/Status/statusPermissions';
import { numericValidator } from 'utils/validators';
import messages from './messages';
import { UPDATE_DATA } from './constants';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateProperty,
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
      range_start: rangeStart,
      range_end: rangeEnd,
    },
  } = data[0];

  const editingPossible = canEdit(interventionStatus);

  const calculateLabelWidth = (value) => {
    const valueLength = value?.toString().length ?? 0;
    return `${48 + (valueLength > 3 ? 8 * valueLength : 0)}px`;
  };

  const labels = {
    [rangeStart]: {
      label: (
        <OriginalTextHover
          id={`question-${id}-start`}
          text={originalText?.start_value}
          gap={5}
        >
          <StyledInput
            disabled={!editingPossible}
            width={120}
            px={5}
            py={9}
            textAlign="left"
            placeholder={formatMessage(messages.startValue)}
            value={startValue}
            onBlur={(value) => updateProperty(value, 'start_value')}
          />
        </OriginalTextHover>
      ),
      style: {
        ...visualAnalogScaleLabelStyles,
        transform: 'none',
        marginTop: '5px',
      },
    },
    [rangeEnd]: {
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
            px={5}
            textAlign="right"
            placeholder={formatMessage(messages.endValue)}
            value={endValue}
            onBlur={(value) => updateProperty(value, 'end_value')}
          />
        </OriginalTextHover>
      ),
      style: {
        ...visualAnalogScaleLabelStyles,
        transform: 'translateX(-100%)',
        marginTop: '5px',
      },
    },
  };

  return (
    <Column mt={10}>
      <Box width="100%" px={21} py={30}>
        <Column>
          <Row>
            <Box width="100%">
              <Row justify="between" mb={24} hidden={isNarratorTab}>
                <BadgeInput
                  color={colors.electricPurple}
                  value={rangeStart}
                  onBlur={(value) => updateProperty(value, 'range_start')}
                  autoSize={false}
                  width={calculateLabelWidth(rangeStart)}
                  align="center"
                  validator={numericValidator}
                />
                <BadgeInput
                  color={colors.electricPurple}
                  value={rangeEnd}
                  onBlur={(value) => updateProperty(value, 'range_end')}
                  autoSize={false}
                  width={calculateLabelWidth(rangeEnd)}
                  align="center"
                  validator={numericValidator}
                />
              </Row>
              {!isNarratorTab && (
                <Box mb={64}>
                  <AppSlider
                    min={rangeStart}
                    max={rangeEnd}
                    marks={labels}
                    disabled
                    showValue={!isNullOrUndefined(showNumber) && showNumber}
                    ariaLabelledByForHandle={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
                    hideHandle
                    value={rangeStart}
                  />
                </Box>
              )}
              {isNarratorTab && (
                <VisualAnalogueScaleQuestionLayout
                  startValue={startValue}
                  endValue={endValue}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
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
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  updateProperty: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateProperty: (value, label) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value, label } }),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(VisualAnalogueScaleQuestion));
