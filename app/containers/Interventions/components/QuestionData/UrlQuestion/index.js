import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import UrlPreview from 'components/UrlPreview';
import globalMessages from 'global/i18n/globalMessages';
import { BadgeInput } from 'components/Input/BadgeInput';
import { colors } from 'theme/colors';
import { makeSelectDraggable } from 'containers/Interventions/components/QuestionNarrator/selectors';
import { makeSelectSelectedQuestion } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { updateQuestionData } from 'containers/Interventions/containers/EditInterventionPage/actions';
import { urlValidator } from 'utils/validators/urlValidator';
import { variableNameValidator } from 'utils/validators';

import messages from './messages';
import { UPDATE_URL, UPDATE_VARIABLE } from './constants';

const UrlQuestion = ({
  selectedQuestion,
  updateUrl,
  updateVariable,
  draggable,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <Row display="flex" hidden={draggable} mb={10}>
        <BadgeInput
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
        hidden={draggable}
      >
        <Row>
          <ApprovableInput
            rows="3"
            validator={urlValidator}
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            onCheck={updateUrl}
            type="multiline"
          />
        </Row>
      </Box>
      <Box>{payload && <UrlPreview link={payload} />}</Box>
    </Column>
  );
};

UrlQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateUrl: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
  draggable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  draggable: makeSelectDraggable(),
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
