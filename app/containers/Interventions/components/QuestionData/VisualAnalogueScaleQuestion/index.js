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
import { UPDATE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const VisualAnalogueScaleQuestion = ({
  selectedQuestion,
  updateLabel,
  intl: { formatMessage },
}) => {
  const [startValue, endValue] = selectedQuestion.body.data;
  return (
    <Box width="100%" px={21} py={14} mt={20}>
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
              value={startValue.payload}
              onBlur={value => updateLabel(value, 0)}
            />
          </Box>

          <Box hoverColor={colors.linkWater} padding={5}>
            <StyledInput
              width={120}
              px={0}
              py={9}
              textAlign="center"
              placeholder={formatMessage(messages.endValue)}
              value={endValue.payload}
              onBlur={value => updateLabel(value, 1)}
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

const mapDispatchToProps = dispatch => ({
  updateLabel: (value, index) =>
    dispatch(updateQuestionData({ type: UPDATE, data: { value, index } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(VisualAnalogueScaleQuestion));
