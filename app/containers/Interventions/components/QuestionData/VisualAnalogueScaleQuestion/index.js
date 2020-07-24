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
import globalMessages from 'global/i18n/globalMessages';
import { BadgeInput } from 'components/Input/BadgeInput';
import { StyledInput } from 'components/Input/StyledInput';
import { colors } from 'theme/colors';
import { makeSelectDraggable } from 'containers/Interventions/components/QuestionNarrator/selectors';
import { variableNameValidator } from 'utils/validators';

import messages from './messages';
import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';
import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  updateVariable,
  draggable,
  intl: { formatMessage },
}) => {
  const {
    payload: { start_value: startValue, end_value: endValue },
  } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <Row display="flex" hidden={draggable} mb={10}>
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
      <Box width="100%" px={21} py={14}>
        <Column>
          <Row>
            <Box width="100%">
              <AppSlider disabled />
            </Box>
          </Row>

          <Row justify="between" filled>
            <Box hoverColor={colors.linkWater} padding={5} ml={-24}>
              <StyledInput
                width={120}
                py={9}
                textAlign="left"
                placeholder={formatMessage(messages.startValue)}
                value={startValue}
                onBlur={value => updateLabel(value, 'start_value')}
              />
            </Box>

            <Box hoverColor={colors.linkWater} padding={5} mr={-18}>
              <StyledInput
                width={120}
                py={9}
                textAlign="right"
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
  draggable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  draggable: makeSelectDraggable(),
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
