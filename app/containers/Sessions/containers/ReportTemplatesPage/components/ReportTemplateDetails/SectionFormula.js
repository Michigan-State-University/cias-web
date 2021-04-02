import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'react-grid-system';
import { injectIntl, IntlShape } from 'react-intl';
import { injectReducer, useInjectSaga } from 'redux-injectors';

import { updateTemplateSectionRequest } from 'global/reducers/reportTemplates';
import {
  getQuestionGroupsRequest,
  getQuestionGroupsSaga,
  questionGroupsReducer,
} from 'global/reducers/questionGroups';
import { questionsReducer } from 'global/reducers/questions';

import { colors, themeColors } from 'theme';
import { Col } from 'components/ReactGridSystem';
import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import VariableChooser from 'containers/BranchingLayout/VariableChooser';

import Text from 'components/Text';
import messages from '../../messages';
import { ReportTemplatesContext } from '../../utils';

const SectionFormula = ({
  intl: { formatMessage },
  formula,
  updateSection,
  getQuestionGroups,
}) => {
  useInjectSaga({
    key: 'getQuestionGroupsSaga',
    saga: getQuestionGroupsSaga,
  });

  const { sessionId, canEdit } = useContext(ReportTemplatesContext);

  useEffect(() => {
    getQuestionGroups(sessionId);
  }, []);

  const { selectedTemplateSection, selectedReportId } = useContext(
    ReportTemplatesContext,
  );

  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

  const handleFormulaUpdate = newFormula => {
    updateSection(
      { ...selectedTemplateSection, formula: newFormula },
      selectedReportId,
    );
  };

  return (
    <>
      <Row align="center" justify="between" style={{ width: '100%' }} nogutter>
        <Col>{formatMessage(messages.formula)}</Col>
        <Col align="end">
          <Box
            disabled={!canEdit}
            onClick={() => {
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
          includeAllVariables
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
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.formulaPlaceholder)}
          value={formula}
          onBlur={handleFormulaUpdate}
          disabled={!canEdit}
        />
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  updateSection: updateTemplateSectionRequest,
  getQuestionGroups: getQuestionGroupsRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

SectionFormula.propTypes = {
  formula: PropTypes.string,
  updateSection: PropTypes.func,
  getQuestionGroups: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  withConnect,
  injectIntl,
)(SectionFormula);
