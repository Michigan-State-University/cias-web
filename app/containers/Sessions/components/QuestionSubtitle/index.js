import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { SessionTypes } from 'models/Session';
import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';
import { selectQuillText } from 'components/Input/utils';
import OriginalTextHover from 'components/OriginalTextHover';

import { colors } from 'theme';

import {
  makeSelectSelectedQuestion,
  editQuestionRequest,
} from 'global/reducers/questions';
import { makeSelectInterventionDynamicElementsDirection } from 'global/reducers/globalState';

import messages from './messages';

const QuestionSubtitle = ({
  selectedQuestion: { id, subtitle, original_text: originalText },
  intl: { formatMessage },
  updateSubtitle,
  dynamicElementsDirection,
  sessionType,
}) => {
  const handleUpdate = (val) =>
    updateSubtitle({ path: 'subtitle', value: val });

  const onFocus = (quill) => {
    selectQuillText(quill);
  };

  return (
    <Box
      width="100%"
      padded
      hoverColor={colors.linkWater}
      clickable={false}
      dir={dynamicElementsDirection}
    >
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
          fullWidth={sessionType === SessionTypes.SMS_SESSION}
          richText={sessionType !== SessionTypes.SMS_SESSION}
          fontSize={36}
          emptyWidth={215}
        />
      </OriginalTextHover>
    </Box>
  );
};

QuestionSubtitle.propTypes = {
  selectedQuestion: PropTypes.object,
  sessionType: PropTypes.string,
  updateSubtitle: PropTypes.func,
  intl: PropTypes.object,
  dynamicElementsDirection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  dynamicElementsDirection: makeSelectInterventionDynamicElementsDirection(),
});

const mapDispatchToProps = {
  updateSubtitle: editQuestionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(QuestionSubtitle);
