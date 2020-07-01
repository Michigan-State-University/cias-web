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
import { makeSelectSelectedQuestion } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { updateQuestionData } from 'containers/Interventions/containers/EditInterventionPage/actions';

import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { UPDATE_URL, UPDATE_VARIABLE } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  updateVariable,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  const updateLink = url => updateUrl({ variable, payload: url });

  return (
    <Column>
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
            rows="3"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            onCheck={updateLink}
            type="multiline"
          />
        </Row>
      </Box>
    </Column>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateUrl: value => updateQuestionData({ type: UPDATE_URL, data: { value } }),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
};

export const QuestionUrlWithIntl = injectIntl(UrlQuestion);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionUrlWithIntl);
