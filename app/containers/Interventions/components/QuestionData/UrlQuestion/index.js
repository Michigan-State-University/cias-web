import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import { colors } from 'theme/colors';
import { makeSelectSelectedQuestion } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { updateQuestionData } from 'containers/Interventions/containers/EditInterventionPage/actions';

import messages from './messages';
import { UPDATE_URL } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  intl: { formatMessage },
}) => {
  const { variable, payload } = selectedQuestion.body.data[0];

  const updateLink = url => updateUrl({ variable, payload: url });

  return (
    <Box bg={colors.linkWater} width="100%" px={21} py={14}>
      <Row>
        <ApprovableInput
          rows="3"
          placeholder={formatMessage(messages.placeholder)}
          value={payload}
          onCheck={updateLink}
          type="multiline"
        />
      </Row>
    </Box>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateUrl: value => updateQuestionData({ type: UPDATE_URL, data: { value } }),
};

export const QuestionUrlWithIntl = injectIntl(UrlQuestion);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionUrlWithIntl);
