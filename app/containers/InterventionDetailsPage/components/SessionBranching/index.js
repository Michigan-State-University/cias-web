/**
 *
 * SessionBranching
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectReducer } from 'redux-injectors';
import find from 'lodash/find';

import Row from 'components/Row';
import Column from 'components/Column';
import Switch from 'components/Switch';
import Text from 'components/Text';
import Box from 'components/Box';
import BranchingLayout from 'containers/BranchingLayout';
import BoxCollapse from 'components/BoxCollapse';
import HoverableBox from 'components/Box/HoverableBox';
import PlusCircle from 'components/Circle/PlusCircle';
import { ImageButton } from 'components/Button/ImageButton';

import copy from 'assets/svg/copy.svg';

import { colors, themeColors } from 'theme';

import {
  makeSelectIntervention,
  addFormulaCase,
  changeFormulaStatus,
  removeFormulaCase,
  updateFormula,
  updateFormulaCase,
  changeCurrentSession,
  addFormulaTarget,
  removeFormulaTarget,
  updateFormulaTarget,
  addNewFormula,
  removeFormula,
} from 'global/reducers/intervention';
import {
  questionGroupsReducer,
  makeSelectQuestionGroupsSessionId,
  getQuestionGroupsRequest,
} from 'global/reducers/questionGroups';
import { duplicateFormula } from 'global/reducers/intervention/sessionSettings/actions';
import messages from './messages';

function SessionBranching({
  intl: { formatMessage },
  nextSessionName,
  status,
  onChangeFormulaStatus,
  formulas,
  session: { id, position, intervention_id: interventionId },
  onFormulaUpdate,
  onAddCase,
  onRemoveCase,
  onUpdateCase,
  intervention,
  changeSessionIndex,
  fetchQuestions,
  disabled,
  activeSessionId,
  onAddTarget,
  onUpdateTarget,
  onDeleteTarget,
  onAddFormula,
  onRemoveFormula,
  onDuplicateFormula,
}) {
  const displayPatternTargetText = (target) => {
    if (!target || target.id === '')
      return formatMessage(messages.selectSession);
    const session = find(
      intervention.sessions,
      (value) => value.id === target.id,
    );
    return session ? session.name : formatMessage(messages.selectSession);
  };

  const handleFormulaStatus = (value) => onChangeFormulaStatus(value, id);

  const handleClickAddVariable = () => {
    if (id !== activeSessionId) {
      changeSessionIndex(position - 1);
      fetchQuestions(id);
    }
  };

  const extraIcon = (index) => (
    <ImageButton
      src={copy}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onDuplicateFormula(id, index);
      }}
      title={formatMessage(messages.copyFormula)}
      disabled={disabled}
      fill={colors.manatee}
      iconProps={{
        width: 16,
        height: 16,
        mr: 10,
        mt: 2,
      }}
    />
  );

  return (
    <>
      <Row py={18} px={62} align="between" justify="between">
        <Column xs={12} justify="center">
          <Row align="center" width="100%">
            {(status || nextSessionName) && (
              <>
                <Text fontSize={13}>{formatMessage(messages.nextSession)}</Text>
                <Text ml={10} fontSize={13} fontWeight="bold">
                  {status ? formatMessage(messages.formula) : nextSessionName}
                </Text>
              </>
            )}
          </Row>
        </Column>
        <Column xs={4}>
          <Row justify="end" align="center" width="100%">
            <Switch
              id={`session-${id}-formula-switch-label`}
              disabled={disabled}
              ml={10}
              checked={status}
              onToggle={handleFormulaStatus}
            >
              <Text whiteSpace="pre">{formatMessage(messages.useFormula)}</Text>
            </Switch>
          </Row>
        </Column>
      </Row>
      {status && (
        <Row mx={62} py={20}>
          <Column>
            {formulas?.length > 0 &&
              formulas.map((formula, index) => (
                <BoxCollapse
                  key={`formula-${index}`}
                  mb={16}
                  padding={4}
                  label={formatMessage(messages.formulaTitle, {
                    index: index + 1,
                  })}
                  extraIcons={extraIcon(index)}
                  onDelete={() => onRemoveFormula(id, index)}
                  labelBgColor={colors.lightStealBlue}
                  labelBgOpacity={0.4}
                  labelPadding={8}
                  binFillColor={colors.manatee}
                  arrowColor={themeColors.secondary}
                  binProps={{
                    width: 16,
                    height: 16,
                  }}
                  contentStyle={{
                    px: 8,
                  }}
                  shouldBeOpenOnStart
                >
                  <BranchingLayout
                    formulaIndex={index}
                    disabled={disabled}
                    displayPatternTargetText={displayPatternTargetText}
                    formatMessage={formatMessage}
                    formula={formula}
                    id={id}
                    interventionId={interventionId}
                    onAddCase={onAddCase}
                    onDropdownOpen={handleClickAddVariable}
                    onFormulaUpdate={onFormulaUpdate}
                    onRemoveCase={onRemoveCase}
                    onUpdateCase={onUpdateCase}
                    sessionId={id}
                    includeAllVariables
                    includeCurrentSession
                    isMultiSession
                    sessionBranching
                    onAddTarget={onAddTarget}
                    onUpdateTarget={onUpdateTarget}
                    onRemoveTarget={onDeleteTarget}
                  />
                </BoxCollapse>
              ))}
            <HoverableBox px={21} py={14} onClick={() => onAddFormula(id)}>
              <Box>
                <Row align="center">
                  <PlusCircle mr={12} />
                  <Text fontWeight="bold" color={themeColors.secondary}>
                    <FormattedMessage {...messages.addNewFormula} />
                  </Text>
                </Row>
              </Box>
            </HoverableBox>
          </Column>
        </Row>
      )}
    </>
  );
}

SessionBranching.propTypes = {
  intl: PropTypes.object,
  nextSessionName: PropTypes.string,
  status: PropTypes.bool,
  onChangeFormulaStatus: PropTypes.func,
  session: PropTypes.object,
  formulas: PropTypes.array,
  onFormulaUpdate: PropTypes.func,
  onAddCase: PropTypes.func,
  onRemoveCase: PropTypes.func,
  onUpdateCase: PropTypes.func,
  intervention: PropTypes.object,
  changeSessionIndex: PropTypes.func,
  fetchQuestions: PropTypes.func,
  disabled: PropTypes.bool,
  activeSessionId: PropTypes.string,
  onAddTarget: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onDeleteTarget: PropTypes.func,
  onAddFormula: PropTypes.func,
  onRemoveFormula: PropTypes.func,
  onDuplicateFormula: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  activeSessionId: makeSelectQuestionGroupsSessionId(),
});

const mapDispatchToProps = {
  onFormulaUpdate: updateFormula,
  onAddCase: addFormulaCase,
  onRemoveCase: removeFormulaCase,
  onUpdateCase: updateFormulaCase,
  onChangeFormulaStatus: changeFormulaStatus,
  changeSessionIndex: changeCurrentSession,
  fetchQuestions: getQuestionGroupsRequest,
  onAddTarget: addFormulaTarget,
  onUpdateTarget: updateFormulaTarget,
  onDeleteTarget: removeFormulaTarget,
  onAddFormula: addNewFormula,
  onRemoveFormula: removeFormula,
  onDuplicateFormula: duplicateFormula,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  injectIntl,
  withConnect,
)(SessionBranching);
