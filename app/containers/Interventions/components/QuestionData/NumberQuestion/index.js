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
import globalMessages from 'global/i18n/globalMessages';
import { BadgeInput } from 'components/Input/BadgeInput';
import { colors } from 'theme/colors';
import { numericValidator, variableNameValidator } from 'utils/validators';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { canEdit } from 'models/Status/statusPermissions';
import messages from './messages';
import { UPDATE_DATA, UPDATE_VARIABLE } from './constants';

const NumberQuestion = ({
  selectedQuestion,
  updateAnswer,
  updateVariable,
  isNarratorTab,
  problemStatus,
  intl: { formatMessage },
}) => {
  const { payload } = selectedQuestion.body.data[0];
  const { variable } = selectedQuestion.body;

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
          onBlur={val => updateVariable(val)}
        />
      </Row>
      <Box bg={colors.linkWater} width="100%" px={21} py={14}>
        <Row>
          <ApprovableInput
            type="singleline"
            keyboard="tel"
            placeholder={formatMessage(messages.placeholder)}
            value={payload}
            validator={numericValidator}
            onCheck={newTitle => updateAnswer({ variable, payload: newTitle })}
            disabled
          />
        </Row>
      </Box>
    </Column>
  );
};

NumberQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  updateVariable: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateAnswer: value =>
    updateQuestionData({ type: UPDATE_DATA, data: { value } }),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(NumberQuestion));
