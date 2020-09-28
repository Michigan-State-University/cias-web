import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import { colors, elements } from 'theme';
import {
  makeSelectSelectedQuestion,
  editQuestionRequest,
} from 'global/reducers/questions';

import messages from './messages';

const QuestionTitle = ({
  selectedQuestion: { title },
  intl: { formatMessage },
  updateTitle,
}) => {
  const handleUpdate = val => updateTitle({ path: 'title', value: val });
  return (
    <Box
      width="100%"
      maxWidth={elements.draggableContainerSize}
      hoverColor={colors.linkWater}
      clickable={false}
      mb={10}
    >
      <Row>
        <ApprovableInput
          defaultFontSize={18}
          placeholder={formatMessage(messages.placeholder)}
          value={title}
          onCheck={handleUpdate}
          autoSize
          richText
        />
      </Row>
    </Box>
  );
};

QuestionTitle.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  updateTitle: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateTitle: editQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(QuestionTitle);
