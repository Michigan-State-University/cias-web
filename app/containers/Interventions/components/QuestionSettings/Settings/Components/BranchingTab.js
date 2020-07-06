import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ArrowDropdown from 'components/ArrowDropdown';
import Box from 'components/Box';
import Column from 'components/Column';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import { StyledInput } from 'components/Input/StyledInput';
import { colors, themeColors } from 'theme';
import { findQuestionIndex } from 'models/Intervention/utils';
import { makeSelectQuestions } from 'containers/Interventions/containers/EditInterventionPage/selectors';

import messages from './messages';
import TargetQuestionChooser from '../../TargetQuestionChooser';
import VariableChooser from '../../VariableChooser';
import { DashedBox, CaseInput } from './styled';
import {
  updateFormula,
  addFormulaCase,
  removeFormulaCase,
  updateFormulaCase,
} from '../actions';

const BranchingTab = ({
  formatMessage,
  formula,
  id,
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  questions,
}) => {
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);
  const [variableChooserOpen, setVariableChooserOpen] = useState(false);

  const displayPatternTargetText = questionId => {
    const selectedIndex = findQuestionIndex(questions, id);
    const targetIndex = findQuestionIndex(questions, questionId);

    if (selectedIndex === targetIndex - 1)
      return formatMessage(messages.nextScreen);

    if (targetIndex !== -1) return questions[targetIndex].title;

    return formatMessage(messages.selectQuestion);
  };

  return (
    <Fragment>
      <Column>
        <Row align="center" justify="between">
          {formatMessage(messages.formula)}
          <Box
            onClick={() => setVariableChooserOpen(!variableChooserOpen)}
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
        </Row>
        {formula && (
          <Fragment>
            <Box
              bg={colors.linkWater}
              width="100%"
              mt={10}
              mb={20}
              px={8}
              py={8}
            >
              <StyledInput
                type="multiline"
                rows="5"
                width="auto"
                placeholder={formatMessage(messages.formulaPlaceholder)}
                value={formula.payload}
                onBlur={val => onFormulaUpdate(val, id)}
              />
            </Box>
            <Box position="relative">
              <VariableChooser
                visible={variableChooserOpen}
                setOpen={setVariableChooserOpen}
                onClick={value => {
                  setVariableChooserOpen(false);
                  onFormulaUpdate(`${formula.payload}${value}`, id);
                }}
              />
            </Box>
            {formula.patterns.map((pattern, index) => (
              <Row
                key={`${id}-settings-branching-case-${index}`}
                align="center"
                mb={8}
              >
                <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
                <Box bg={colors.linkWater} mx={10}>
                  <CaseInput
                    px={0}
                    py={12}
                    textAlign="center"
                    placeholder="..."
                    value={pattern.match}
                    onBlur={value =>
                      onUpdateCase(index, { ...pattern, match: value }, id)
                    }
                  />
                </Box>
                <Text whiteSpace="pre" mr={10}>
                  {formatMessage(messages.goTo)}
                </Text>
                <ArrowDropdown
                  width="100%"
                  positionFrom="right"
                  setOpen={value => setTargetChooserOpen(value ? index : -1)}
                  isOpened={index === targetChooserOpen}
                  dropdownContent={
                    <Box maxWidth={70}>
                      <Text
                        textOverflow="ellipsis"
                        whiteSpace="pre"
                        overflow="hidden"
                      >
                        {displayPatternTargetText(pattern.target)}
                      </Text>
                    </Box>
                  }
                >
                  <TargetQuestionChooser
                    pattern={pattern}
                    onClick={value => {
                      setTargetChooserOpen(false);
                      onUpdateCase(index, { ...pattern, target: value }, id);
                    }}
                  />
                </ArrowDropdown>
                <Img
                  ml={10}
                  src={binNoBg}
                  onClick={() => onRemoveCase(index, id)}
                  clickable
                />
              </Row>
            ))}
          </Fragment>
        )}
        <DashedBox mt={20} onClick={() => onAddCase(id)}>
          {formatMessage(messages.newCase)}
        </DashedBox>
      </Column>
    </Fragment>
  );
};

BranchingTab.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  id: PropTypes.string,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BranchingTab);
