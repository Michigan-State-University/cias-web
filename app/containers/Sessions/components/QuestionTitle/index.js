import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';

import { selectQuillText } from 'components/Input/utils';
import OriginalTextHover from 'components/OriginalTextHover';

import { colors, elements } from 'theme';
import {
  makeSelectSelectedQuestion,
  editQuestionRequest,
} from 'global/reducers/questions';
import { makeSelectInterventionDynamicElementsDirection } from 'global/reducers/globalState';

import messages from './messages';

const QuestionTitle = ({
  selectedQuestion: { id, title, original_text: originalText },
  intl: { formatMessage },
  updateTitle,
  dynamicElementsDirection,
}) => {
  const handleUpdate = (val) => updateTitle({ path: 'title', value: val });

  const onFocus = (quill) => {
    selectQuillText(quill);
  };

  return (
    <Box
      width="100%"
      maxWidth={elements.draggableContainerSize}
      hoverColor={colors.linkWater}
      clickable={false}
      padded
      dir={dynamicElementsDirection}
      data-cy="question-title-input"
    >
      <OriginalTextHover id={`question-${id}-title`} text={originalText?.title}>
        <FlexibleWidthApprovableInput
          defaultFontSize={16}
          placeholder={formatMessage(messages.placeholder)}
          value={title}
          onCheck={handleUpdate}
          onFocus={onFocus}
          autoSize
          richText
          emptyWidth={155}
        />
      </OriginalTextHover>
    </Box>
  );
};

QuestionTitle.propTypes = {
  selectedQuestion: PropTypes.object,
  updateTitle: PropTypes.func,
  intl: PropTypes.object,
  dynamicElementsDirection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  dynamicElementsDirection: makeSelectInterventionDynamicElementsDirection(),
});

const mapDispatchToProps = {
  updateTitle: editQuestionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(QuestionTitle);
