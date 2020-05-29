import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';

import { themeColors } from 'theme';
import messages from './messages';
import { UPDATE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const TextboxQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const { variable, payload } = selectedQuestion.body.data[0];
  return (
    <Column>
      <Row>
        <ApprovableInput
          mr={8}
          placeholder={formatMessage(messages.placeholder)}
          value={payload}
          onCheck={newTitle => updateAnswer({ payload: newTitle })}
        />
      </Row>
    </Column>
  );
};

TextboxQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  updateAnswer: value =>
    dispatch(updateQuestionData({ type: UPDATE, data: { value } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(TextboxQuestion));
