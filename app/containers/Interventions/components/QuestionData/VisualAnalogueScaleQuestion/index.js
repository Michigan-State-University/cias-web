import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import { BadgeInput } from 'components/Input/BadgeInput';

import { colors } from 'theme/colors';
import AppSlider from 'components/AppSlider';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  updateVariable,
  intl: { formatMessage },
}) => {
  const {
    payload: { start_value: startValue, end_value: endValue },
  } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <BadgeInput
        px={0}
        py={12}
        mb={10}
        textAlign="center"
        keyboard="tel"
        placeholder={formatMessage(
          globalMessages.variables.variableNamePlaceholder,
        )}
        value={variable.name}
        color={colors.jungleGreen}
        onBlur={val => updateVariable(val)}
      />
      <Box width="100%" px={21} py={14}>
        <Column>
          <Row>
            <Box width="100%">
              <AppSlider />
            </Box>
          </Row>

          <Row justify="between" filled>
            <Box hoverColor={colors.linkWater} padding={5}>
              <StyledInput
                width={120}
                px={0}
                py={9}
                textAlign="center"
                placeholder={formatMessage(messages.startValue)}
                value={startValue}
                onBlur={value => updateLabel(value, 'start_value')}
              />
            </Box>

            <Box hoverColor={colors.linkWater} padding={5}>
              <StyledInput
                width={120}
                px={0}
                py={9}
                textAlign="center"
                placeholder={formatMessage(messages.endValue)}
                value={endValue}
                onBlur={value => updateLabel(value, 'end_value')}
              />
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
