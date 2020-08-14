import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Row from 'components/Row';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Question from 'models/Intervention/Question';

import { colors } from 'theme';
import messages from './messages';

import { makeSelectSelectedQuestion } from '../../containers/EditInterventionPage/selectors';

import { editQuestionRequest } from '../../containers/EditInterventionPage/actions';

const QuestionSubtitle = ({
  selectedQuestion: { subtitle },
  intl: { formatMessage },
  updateSubtitle,
}) => {
  const handleUpdate = val => updateSubtitle({ path: 'subtitle', value: val });
  return (
    <Box width="100%" padded hoverColor={colors.linkWater} clickable={false}>
      <Row>
        <ApprovableInput
          placeholder={formatMessage(messages.placeholder)}
          value={subtitle}
          onCheck={handleUpdate}
          autoSize
          richText
          fontSize={18}
        />
      </Row>
    </Box>
  );
};

QuestionSubtitle.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  updateSubtitle: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateSubtitle: editQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(QuestionSubtitle);
