import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { selectQuillText } from 'components/Input/utils';
import OriginalTextHover from 'components/OriginalTextHover';

import { colors } from 'theme';
import { QuestionDTO } from 'models/Question';
import {
  makeSelectSelectedQuestion,
  editQuestionRequest,
} from 'global/reducers/questions';

import messages from './messages';

const QuestionSubtitle = ({
  selectedQuestion: { id, subtitle, original_text: originalText },
  intl: { formatMessage },
  updateSubtitle,
}) => {
  const handleUpdate = (val) =>
    updateSubtitle({ path: 'subtitle', value: val });

  const onFocus = (quill) => {
    selectQuillText(quill);
  };

  return (
    <Box width="100%" padded hoverColor={colors.linkWater} clickable={false}>
      <Row>
        <OriginalTextHover
          id={`question-${id}-subtitle`}
          text={originalText?.subtitle}
        >
          <FlexibleWidthApprovableInput
            placeholder={formatMessage(messages.placeholder)}
            value={subtitle}
            onCheck={handleUpdate}
            onFocus={onFocus}
            autoSize
            richText
            fontSize={36}
            emptyWidth={215}
          />
        </OriginalTextHover>
      </Row>
    </Box>
  );
};

QuestionSubtitle.propTypes = {
  selectedQuestion: PropTypes.shape(QuestionDTO),
  updateSubtitle: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateSubtitle: editQuestionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(QuestionSubtitle);
