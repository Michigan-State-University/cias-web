/**
 *
 * BranchingLayout
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import Question from 'models/Session/Question';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { colors, themeColors } from 'theme';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import { StyledInput } from 'components/Input/StyledInput';
import VariableChooser from 'containers/VariableChooser';

import { DashedBox } from './styled';
import messages from './messages';
import Pattern from './Pattern';

function BranchingLayout({
  formula,
  intl: { formatMessage },
  onFormulaUpdate,
  id,
  onDropdownOpen,
  onUpdateCase,
  displayPatternTargetText,
  onRemoveCase,
  onAddCase,
  sessionBranching,
  disabled,
  includeAllVariables,
  includeCurrentQuestion,
  selectedQuestion,
  sessionId,
  interventionId,
  includeAllSessions,
  includeCurrentSession,
  isMultiSession,
  onAddTarget,
  onUpdateTarget,
  onRemoveTarget,
}) {
  const [patternsSize, setPatternSize] = useState(formula.patterns.length);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (formula.patterns.length !== patternsSize) {
      setPatternSize(formula.patterns.length);
    }
  }, [formula.patterns.length]);
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);

  const shouldDisplayElseStatement = formula.patterns.length !== 0;

  const handleDropdownClick = (value, index) => {
    if (value && onDropdownOpen) onDropdownOpen();
    setTargetChooserOpen(value ? index : -1);
  };

  return (
    <>
      <Column>
        <Row align="center" justify="between">
          {formatMessage(messages.formula)}

          <VariableChooser
            disabled={disabled}
            sessionId={sessionId}
            interventionId={interventionId}
            onClick={value => onFormulaUpdate(`${formula.payload}${value}`, id)}
            includeAllVariables={includeAllVariables}
            includeCurrentQuestion={includeCurrentQuestion}
            includeAllSessions={includeAllSessions}
            includeCurrentSession={includeCurrentSession}
            isMultiSession={isMultiSession}
            selectedQuestion={selectedQuestion}
            setIsOpen={setIsOpen}
          >
            <Text
              fontWeight="bold"
              color={themeColors.secondary}
              hoverDecoration="underline"
            >
              {formatMessage(messages.addVariable)}
            </Text>
          </VariableChooser>
        </Row>
        {formula && (
          <>
            <Box
              bg={colors.linkWater}
              width="100%"
              mt={10}
              mb={20}
              px={8}
              py={8}
            >
              <StyledInput
                disabled={disabled}
                type="multiline"
                rows={sessionBranching ? '1' : '5'}
                width="100%"
                placeholder={formatMessage(messages.formulaPlaceholder)}
                value={formula.payload}
                onBlur={val => onFormulaUpdate(val, id)}
                forceBlur={isOpen}
              />
            </Box>

            {formula.patterns.map((pattern, index) => {
              const updatePattern = patternObj => {
                onUpdateCase(index, patternObj, id);
              };
              return (
                <Pattern
                  newPattern={patternsSize <= index}
                  disabled={disabled}
                  displayPatternTargetText={displayPatternTargetText}
                  formatMessage={formatMessage}
                  handleDropdownClick={handleDropdownClick}
                  index={index}
                  key={index}
                  onAddTarget={() => onAddTarget(id, index)}
                  onRemoveCase={onRemoveCase}
                  pattern={pattern}
                  questionId={id}
                  sessionBranching={sessionBranching}
                  setTargetChooserOpen={setTargetChooserOpen}
                  targetChooserOpen={targetChooserOpen}
                  updatePattern={updatePattern}
                  onUpdateTarget={onUpdateTarget}
                  onRemoveTarget={onRemoveTarget}
                />
              );
            })}
            {shouldDisplayElseStatement && (
              // FormattedMessage needed for rich text to work
              <Text>
                <FormattedMessage
                  {...messages.else}
                  values={{
                    message: sessionBranching
                      ? formatMessage(messages.nextSession)
                      : formatMessage(messages.nextScreen),
                  }}
                />
              </Text>
            )}
          </>
        )}
        <DashedBox
          disabled={disabled}
          mt={20}
          onClick={() => !disabled && onAddCase(id)}
        >
          {formatMessage(messages.newCase)}
        </DashedBox>
      </Column>
    </>
  );
}

BranchingLayout.propTypes = {
  id: PropTypes.string,
  sessionId: PropTypes.string,
  interventionId: PropTypes.string,
  formula: PropTypes.object,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  intl: PropTypes.object,
  displayPatternTargetText: PropTypes.func,
  sessionBranching: PropTypes.bool,
  onDropdownOpen: PropTypes.func,
  onAddTarget: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onRemoveTarget: PropTypes.func,
  disabled: PropTypes.bool,
  includeAllVariables: PropTypes.bool,
  includeCurrentQuestion: PropTypes.bool,
  selectedQuestion: PropTypes.shape(Question),
  includeAllSessions: PropTypes.bool,
  includeCurrentSession: PropTypes.bool,
  isMultiSession: PropTypes.bool,
};

BranchingLayout.defaultProps = {
  includeCurrentQuestion: true,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(BranchingLayout);
