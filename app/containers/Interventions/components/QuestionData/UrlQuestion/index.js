import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedMessage } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import UrlPreview from 'components/UrlPreview';
import Text from 'components/Text';
import globalMessages from 'global/i18n/globalMessages';
import { BadgeInput } from 'components/Input/BadgeInput';
import { colors } from 'theme/colors';
import { urlValidator } from 'utils/validators/urlValidator';
import { variableNameValidator } from 'utils/validators';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { canEdit } from 'models/Status/statusPermissions';
import messages from './messages';
import { UPDATE_URL, UPDATE_VARIABLE } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  updateVariable,
  isNarratorTab,
  problemStatus,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  const isPreviewValid = urlValidator(payload);
  const displayError = !isPreviewValid && payload;
  const displayPreview = isPreviewValid && payload;

  const editingPossible = canEdit(problemStatus);

  return (
    <Column mt={10}>
      <Row display="flex" hidden={isNarratorTab} mb={10}>
        <BadgeInput
          disabled={!editingPossible}
          px={0}
          py={12}
          textAlign="center"
          keyboard="tel"
          validator={variableNameValidator}
          placeholder={formatMessage(
            globalMessages.variables.variableNamePlaceholder,
          )}
          value={variable.name}
          color={colors.jungleGreen}
          onBlur={updateVariable}
        />
      </Row>
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
        <Text mt={15} color={colors.flamingo} fontWeight="bold">
          <FormattedMessage {...messages.invalidUrl} />
        </Text>
      )}
      {displayPreview && <UrlPreview link={payload} />}
    </Column>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateUrl: url => updateQuestionData({ type: UPDATE_URL, data: { url } }),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
};

export const QuestionUrlWithIntl = injectIntl(UrlQuestion);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionUrlWithIntl);
