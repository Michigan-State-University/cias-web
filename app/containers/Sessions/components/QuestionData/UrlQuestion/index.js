import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedMessage } from 'react-intl';

import { colors, themeColors } from 'theme/colors';
import { urlValidator } from 'utils/validators/urlValidator';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';

import Row from 'components/Row';
import UrlPreview from 'components/UrlPreview';
import Text from 'components/Text';
import { IconTooltip, TooltipType } from 'components/Tooltip';
import Comment from 'components/Text/Comment';

import answerPageMessages from 'containers/AnswerSessionPage/layouts/messages';
import messages from './messages';
import { UPDATE_URL } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  isNarratorTab,
  editingPossible,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];

  const isPreviewValid = urlValidator(payload);
  const displayError = !isPreviewValid && payload;
  const displayPreview = isPreviewValid && payload;

  return (
    <Column mt={10}>
      <Box
        bg={colors.linkWater}
        width="100%"
        px={21}
        py={14}
        hidden={isNarratorTab}
      >
        <Row>
          <ApprovableInput
            disabled={!editingPossible}
            rows="3"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            onCheck={updateUrl}
            type="multiline"
          />
        </Row>
      </Box>
      {displayError && (
        <Text mt={15} color={themeColors.warning} fontWeight="bold">
          <FormattedMessage {...messages.invalidUrl} />
        </Text>
      )}
      {displayPreview && (
        <IconTooltip
          id="external-url-warning"
          type={TooltipType.WARNING}
          content={
            <Comment>
              {formatMessage(answerPageMessages.wcagExternalLinkWarning)}
            </Comment>
          }
          stretchContent
        >
          <UrlPreview link={payload} showError />
        </IconTooltip>
      )}
    </Column>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateUrl: (url) => updateQuestionData({ type: UPDATE_URL, data: { url } }),
};

export const QuestionUrlWithIntl = injectIntl(UrlQuestion);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QuestionUrlWithIntl);
