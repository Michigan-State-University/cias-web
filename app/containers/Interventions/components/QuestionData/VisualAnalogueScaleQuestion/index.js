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

import { colors } from 'theme/colors';
import AppSlider from 'components/AppSlider';
import messages from './messages';
import { UPDATE_DATA } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  intl: { formatMessage },
}) => {
  const startValue = selectedQuestion.body.data[0].payload.start_value;
  const endValue = selectedQuestion.body.data[0].payload.end_value;
  return (
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
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateLabel: PropTypes.func.isRequired,
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
