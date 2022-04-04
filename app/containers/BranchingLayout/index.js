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
import { injectIntl } from 'react-intl';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { colors, themeColors } from 'theme';

import VariableChooser from 'containers/VariableChooser';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import { StyledInput } from 'components/Input/StyledInput';
import { ModalType, useModal } from 'components/Modal';

import { DashedBox } from './styled';
import messages from './messages';
import Pattern from './Pattern';

function BranchingLayout({
  formulaIndex,
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
  disableBranchingToSession,
}) {
  const [patternsSize, setPatternSize] = useState(
    formula?.patterns?.length || 0,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (formula?.patterns?.length !== patternsSize) {
      setPatternSize(formula?.patterns?.length);
    }
  }, [formula]);
  const [targetChooserOpen, setTargetChooserOpen] = useState(-1);

  const handleDropdownClick = (value, index) => {
    if (value && onDropdownOpen) onDropdownOpen();
    setTargetChooserOpen(value ? index : -1);
  };

  const handleDeleteClick = (index, questionId) =>
    openDeleteModal({ index, questionId });

  const handleDeleteConfirm = () => {
    const { index, questionId } = caseToDelete;
    return onRemoveCase(index, questionId, formulaIndex);
  };

  const {
    openModal: openDeleteModal,
    Modal: DeleteModal,
    modalState: caseToDelete,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteCaseHeader),
      content: formatMessage(messages.deleteCaseMessage),
      confirmAction: handleDeleteConfirm,
    },
  });

  const handleRemoveTarget = (questionId, index, targetIndex) =>
    onRemoveTarget(questionId, index, targetIndex, formulaIndex);

  const handleUpdateTarget = (questionId, index, targetIndex, target) =>
    onUpdateTarget(questionId, index, targetIndex, target, formulaIndex);

  return (
    <>
      <DeleteModal />

      <Column>
        <Box padding={8} pt={24}>
          <Row align="center" justify="between">
            {formatMessage(messages.formula)}

            <VariableChooser
              disabled={disabled}
              sessionId={sessionId}
              interventionId={interventionId}
              onClick={(value) =>
                onFormulaUpdate(`${formula.payload}${value}`, id, formulaIndex)
              }
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
          <>
            <Box bg={colors.white} width="100%" mt={10} mb={20} padding={8}>
              <StyledInput
                disabled={disabled}
                type="multiline"
                rows={sessionBranching ? '1' : '5'}
                width="100%"
                placeholder={formatMessage(messages.formulaPlaceholder)}
                value={formula?.payload || ''}
                onBlur={(val) => onFormulaUpdate(val, id, formulaIndex)}
                forceBlur={isOpen}
              />
            </Box>

            {formula?.patterns?.map((pattern, index) => {
              const updatePattern = (patternObj) => {
                onUpdateCase(index, patternObj, id, formulaIndex);
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
                  onAddTarget={() => onAddTarget(id, index, formulaIndex)}
                  onRemoveCase={handleDeleteClick}
                  pattern={pattern}
                  questionId={id}
                  sessionBranching={sessionBranching}
                  setTargetChooserOpen={setTargetChooserOpen}
                  targetChooserOpen={targetChooserOpen}
                  updatePattern={updatePattern}
                  onUpdateTarget={handleUpdateTarget}
                  onRemoveTarget={handleRemoveTarget}
                  disableBranchingToSession={disableBranchingToSession}
                />
              );
            })}
          </>
          <DashedBox
            disabled={disabled}
            mt={20}
            onClick={() => !disabled && onAddCase(id, formulaIndex)}
          >
            {formatMessage(messages.newCase)}
          </DashedBox>
        </Box>
      </Column>
    </>
  );
}

BranchingLayout.propTypes = {
  formulaIndex: PropTypes.number,
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
  selectedQuestion: PropTypes.object,
  includeAllSessions: PropTypes.bool,
  includeCurrentSession: PropTypes.bool,
  isMultiSession: PropTypes.bool,
  disableBranchingToSession: PropTypes.bool,
};

BranchingLayout.defaultProps = {
  includeCurrentQuestion: true,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default compose(injectIntl, withConnect)(BranchingLayout);
