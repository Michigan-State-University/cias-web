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
import OriginalTextHover, {
  OriginalTextIconPosition,
} from 'components/OriginalTextHover';
import { BadgeInput } from 'components/Input/BadgeInput';
import { visualAnalogScaleLabelStyles, colors } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { numericValidator } from 'utils/validators';
import messages from './messages';
import { UPDATE_DATA } from './constants';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateProperty,
  isNarratorTab,
  editingPossible,
  dynamicElementsDirection,
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

  const calculateLabelWidth = (value) => {
    const valueLength = value?.toString().length ?? 0;
    return `${48 + (valueLength > 3 ? 8 * valueLength : 0)}px`;
  };

  const reverse = dynamicElementsDirection === 'rtl';

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
            paddingInline={5}
            paddingBlock={9}
            textAlign={reverse ? 'right' : 'left'}
            placeholder={formatMessage(messages.startValue)}
            value={startValue}
            onBlur={(value) => updateProperty(value, 'start_value')}
          />
        </OriginalTextHover>
      ),
      style: {
        ...visualAnalogScaleLabelStyles,
        transform: 'none',
        marginBlockStart: '5px',
      },
    },
    [rangeEnd]: {
      label: (
        <OriginalTextHover
          id={`question-${id}-end`}
          text={originalText?.end_value}
          gap={5}
          iconPosition={OriginalTextIconPosition.START}
        >
          <StyledInput
            disabled={!editingPossible}
            width={120}
            paddingInline={5}
            paddingBlock={9}
            textAlign={reverse ? 'left' : 'right'}
            placeholder={formatMessage(messages.endValue)}
            value={endValue}
            onBlur={(value) => updateProperty(value, 'end_value')}
          />
        </OriginalTextHover>
      ),
      style: {
        ...visualAnalogScaleLabelStyles,
        transform: `translateX(${reverse ? '' : '-'}100%)`,
        marginBlockStart: '5px',
      },
    },
  };

  return (
    <Column marginBlockStart={10} dir={dynamicElementsDirection}>
      <Box width="100%" paddingInline={21} paddingBlock={30}>
        <Column>
          <Row>
            <Box width="100%">
              <Row justify="between" marginBlockEnd={24} hidden={isNarratorTab}>
                <BadgeInput
                  color={colors.electricPurple}
                  value={rangeStart}
                  onBlur={(value) => updateProperty(value, 'range_start')}
                  autoSize={false}
                  width={calculateLabelWidth(rangeStart)}
                  align="center"
                  validator={numericValidator}
                  disabled={!editingPossible}
                />
                <BadgeInput
                  color={colors.electricPurple}
                  value={rangeEnd}
                  onBlur={(value) => updateProperty(value, 'range_end')}
                  autoSize={false}
                  width={calculateLabelWidth(rangeEnd)}
                  align="center"
                  validator={numericValidator}
                  disabled={!editingPossible}
                />
              </Row>
              {!isNarratorTab && (
                <Box marginBlockEnd={64}>
                  <AppSlider
                    min={rangeStart}
                    max={rangeEnd}
                    marks={labels}
                    disabled
                    showValue={!isNullOrUndefined(showNumber) && showNumber}
                    ariaLabelledByForHandle={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
                    hideHandle
                    value={rangeStart}
                    reverse={reverse}
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
  editingPossible: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
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
