import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import InequalityChooser from 'components/InequalityChooser';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import { themeColors } from 'theme';
import ArrowToggle from 'components/ArrowToggle';
import messages from './messages';
import Target from './Target';

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
  newPattern,
}) => {
  const sumPercentages = useMemo(
    () =>
      pattern.target.reduce((acc, { probability }) => acc + +probability, 0),
    [pattern.target],
  );
  const [showRandomization, setShowRandomization] = useState(newPattern);
  return (
    <>
      <Row
        align="center"
        mb={8}
        justify={sessionBranching ? 'start' : 'around'}
      >
        <Box display="flex" align="center">
          <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
          <InequalityChooser
            disabled={disabled}
            onSuccessfulChange={(value) =>
              updatePattern({ ...pattern, match: value })
            }
            inequalityValue={pattern.match}
          />
        </Box>
        <ArrowToggle
          setState={setShowRandomization}
          state={showRandomization}
          toggleDownMessage={formatMessage(messages.hideRandomization)}
          toggleUpMessage={formatMessage(messages.showRandomization)}
        />
        {!disabled && (
          <Img
            ml={10}
            src={binNoBg}
            onClick={() => onRemoveCase(index, questionId)}
            clickable
          />
        )}
      </Row>
      {showRandomization &&
        pattern.target.map((target, targetIndex) => {
          const uniqueTargetIndex = index * 100 + targetIndex;
          const isChooserOpened = uniqueTargetIndex === targetChooserOpen;
          const updateTarget = (newValues) =>
            onUpdateTarget(questionId, index, targetIndex, {
              ...target,
              ...newValues,
            });
          const onDeleteTarget = () =>
            onRemoveTarget(questionId, index, targetIndex);

          return (
            <Target
              isOnlyTarget={pattern.target.length === 1}
              disabled={disabled}
              displayPatternTargetText={displayPatternTargetText}
              formatMessage={formatMessage}
              handleDropdownClick={handleDropdownClick}
              isChooserOpened={isChooserOpened}
              key={uniqueTargetIndex}
              onDeleteTarget={onDeleteTarget}
              onUpdateTarget={updateTarget}
              sessionBranching={sessionBranching}
              setTargetChooserOpen={setTargetChooserOpen}
              target={target}
              uniqueTargetIndex={uniqueTargetIndex}
              invalidPercentage={sumPercentages !== 100}
            />
          );
        })}
      {showRandomization && (
        <Target
          sessionBranching={sessionBranching}
          onAddTarget={onAddTarget}
          formatMessage={formatMessage}
          displayPatternTargetText={displayPatternTargetText}
        />
      )}
      {sumPercentages !== 100 && showRandomization && (
        <Text my={10} ml={70} color={themeColors.warning}>
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
  newPattern: PropTypes.bool,
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
};

export default Pattern;
