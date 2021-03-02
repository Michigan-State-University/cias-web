import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { injectIntl } from 'react-intl';
import { injectReducer, useInjectSaga } from 'redux-injectors';

import { changeFormulaValue } from 'global/reducers/textMessages';
import {
  getQuestionGroupsRequest,
  getQuestionGroupsSaga,
  questionGroupsReducer,
} from 'global/reducers/questionGroups';
import { questionsReducer } from 'global/reducers/questions';

import { colors, themeColors } from 'theme';
import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import VariableChooser from 'containers/BranchingLayout/VariableChooser';

import Text from 'components/Text';
import messages from './messages';
import { TextMessagesContext } from '../../utils';

const TextMessagesFormula = ({
  formula,
  updateFormula,
  getQuestionGroups,
  disabled,
}) => {
  useInjectSaga({
    key: 'getQuestionGroupsSaga',
    saga: getQuestionGroupsSaga,
  });

  const { sessionId, formatMessage } = useContext(TextMessagesContext);

  useEffect(() => {
    getQuestionGroups(sessionId);
  }, []);

  const [variableChooserOpen, setVariableChooserOpen] = useState();

  const handleFormulaUpdate = newFormula => {
    updateFormula(newFormula);
  };

  return (
    <>
      <Row align="center" justify="between">
        <Col>{formatMessage(messages.formula)}</Col>
        <Col align="end">
          <Box
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              setVariableChooserOpen(!variableChooserOpen);
            }}
            clickable
          >
            <Text
              fontWeight="bold"
              color={themeColors.secondary}
              hoverDecoration="underline"
            >
              {formatMessage(messages.addVariable)}
            </Text>
          </Box>
        </Col>
      </Row>
      <Box position="absolute" right={25} top={25} width="100%">
        <VariableChooser
          topPosition="320px"
          includeAllVariables
          disabled={disabled}
          visible={variableChooserOpen}
          setOpen={setVariableChooserOpen}
          onClick={value => {
            setVariableChooserOpen(false);
            handleFormulaUpdate(`${formula}${value}`);
          }}
        />
      </Box>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
        <StyledInput
          disabled={disabled}
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.formulaPlaceholder)}
          value={formula || ''}
          onBlur={handleFormulaUpdate}
        />
      </Box>
    </>
  );
};
TextMessagesFormula.propTypes = {
  formula: PropTypes.string,
  updateFormula: PropTypes.func,
  getQuestionGroups: PropTypes.func,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  updateFormula: changeFormulaValue,
  getQuestionGroups: getQuestionGroupsRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  withConnect,
  injectIntl,
)(TextMessagesFormula);
