import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import InequalityChooser from 'components/InequalityChooser';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import H3 from 'components/H3';
import Divider from 'components/Divider';
import TextButton from 'components/Button/TextButton';

import binNoBg from 'assets/svg/bin-no-bg.svg';
import { themeColors, colors } from 'theme';
import messages from './messages';
import TargetList from './TargetList';

const Pattern = ({
  pattern,
  formatMessage,
  disabled,
  updatePattern,
  onAddTarget,
  onUpdateTarget,
  onRemoveTarget,
  onRemoveCase,
  handleDropdownClick,
  index,
  sessionBranching,
  targetChooserOpen,
  displayPatternTargetText,
  setTargetChooserOpen,
  questionId,
  disableBranchingToSession,
}) => {
  const sumPercentages = useMemo(
    () =>
      pattern.target.reduce((acc, { probability }) => acc + +probability, 0),
    [pattern.target],
  );

  const isOnlyTarget = pattern.target.length === 1;

  return (
    <>
      <Box display="flex" justify="between" align="center" mt={index > 0 && 16}>
        <H3>
          <FormattedMessage {...messages.case} values={{ index: index + 1 }} />
        </H3>
        {!disabled && (
          <Img
            ml={10}
            src={binNoBg}
            onClick={() => onRemoveCase(index, questionId)}
            clickable
            width="15px"
            height="15px"
          />
        )}
      </Box>
      <Divider my={16} />
      <Row align="center" mb={8}>
        <Box display="flex" align="center">
          <Text whiteSpace="pre" fontWeight="bold">
            {formatMessage(messages.if)}
          </Text>
          <InequalityChooser
            height={50}
            width={56}
            disabled={disabled}
            onSuccessfulChange={(value) =>
              updatePattern({ ...pattern, match: value })
            }
            inequalityValue={pattern.match}
            bg={colors.white}
          />
        </Box>
        {isOnlyTarget && (
          <TargetList
            pattern={pattern}
            index={index}
            onUpdateTarget={onUpdateTarget}
            targetChooserOpen={targetChooserOpen}
            questionId={questionId}
            onRemoveTarget={onRemoveTarget}
            disabled={disabled}
            displayPatternTargetText={displayPatternTargetText}
            handleDropdownClick={handleDropdownClick}
            sessionBranching={sessionBranching}
            setTargetChooserOpen={setTargetChooserOpen}
            sumPercentages={sumPercentages}
            disableBranchingToSession={disableBranchingToSession}
            isOnlyTarget
          />
        )}
      </Row>
      {!isOnlyTarget && (
        <TargetList
          pattern={pattern}
          index={index}
          onUpdateTarget={onUpdateTarget}
          targetChooserOpen={targetChooserOpen}
          questionId={questionId}
          onRemoveTarget={onRemoveTarget}
          disabled={disabled}
          displayPatternTargetText={displayPatternTargetText}
          handleDropdownClick={handleDropdownClick}
          sessionBranching={sessionBranching}
          setTargetChooserOpen={setTargetChooserOpen}
          sumPercentages={sumPercentages}
          disableBranchingToSession={disableBranchingToSession}
        />
      )}
      <Box display="flex" justify="end">
        <TextButton
          buttonProps={{
            width: 'fit-content',
            fontWeight: 'bold',
            color: themeColors.secondary,
          }}
          onClick={onAddTarget}
          disabled={disabled}
        >
          {formatMessage(messages.addRandomization)}
        </TextButton>
      </Box>
      {sumPercentages !== 100 && (
        <Text my={16} ml={90} color={themeColors.warning}>
          {formatMessage(messages.percentagesSumInvalid)}
        </Text>
      )}
    </>
  );
};

Pattern.propTypes = {
  pattern: PropTypes.object,
  disabled: PropTypes.bool,
  onAddTarget: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onRemoveTarget: PropTypes.func,
  sessionBranching: PropTypes.bool,
  handleDropdownClick: PropTypes.func,
  formatMessage: PropTypes.func,
  targetChooserOpen: PropTypes.number,
  index: PropTypes.number,
  updatePattern: PropTypes.func,
  onRemoveCase: PropTypes.func,
  setTargetChooserOpen: PropTypes.func,
  displayPatternTargetText: PropTypes.func,
  questionId: PropTypes.string,
  disableBranchingToSession: PropTypes.bool,
};

export default Pattern;
