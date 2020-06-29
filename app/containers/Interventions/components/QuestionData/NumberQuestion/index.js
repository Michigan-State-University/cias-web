import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import { BadgeInput } from 'components/Input/BadgeInput';

import { colors } from 'theme/colors';
import { numericValidator } from 'utils/validators';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const NumberQuestion = ({
  selectedQuestion,
  updateAnswer,
  updateVariable,
  intl: { formatMessage },
}) => {
  const { variable, payload } = selectedQuestion.body.data[0];
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
      <Box bg={colors.linkWater} width="100%" px={21} py={14}>
        <Row>
          <ApprovableInput
            type="singleline"
            keyboard="tel"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            validator={numericValidator}
            onCheck={newTitle => updateAnswer({ variable, payload: newTitle })}
          />
        </Row>
      </Box>
    </Column>
  );
};

NumberQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  updateAnswer: value =>
    dispatch(updateQuestionData({ type: UPDATE_DATA, data: { value } })),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(NumberQuestion));
