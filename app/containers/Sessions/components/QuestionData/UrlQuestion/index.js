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
import { canEdit } from 'models/Status/statusPermissions';

import H3 from 'components/H3';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Session/Question';
import Row from 'components/Row';
import UrlPreview from 'components/UrlPreview';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';

import answerPageMessages from 'containers/AnswerSessionPage/layouts/messages';
import messages from './messages';
import { UPDATE_URL } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  isNarratorTab,
  interventionStatus,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];

  const isPreviewValid = urlValidator(payload);
  const displayError = !isPreviewValid && payload;
  const displayPreview = isPreviewValid && payload;

  const editingPossible = canEdit(interventionStatus);

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
        <Tooltip
          id="external-url-warning"
          content={
            <H3 color={themeColors.warning} textAlign="center">
              {formatMessage(answerPageMessages.wcagExternalLinkWarning)}
            </H3>
          }
        >
          <UrlPreview link={payload} />
        </Tooltip>
      )}
    </Column>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateUrl: url => updateQuestionData({ type: UPDATE_URL, data: { url } }),
};

export const QuestionUrlWithIntl = injectIntl(UrlQuestion);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionUrlWithIntl);
