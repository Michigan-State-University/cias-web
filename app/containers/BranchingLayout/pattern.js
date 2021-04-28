import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import InequalityChooser from 'components/InequalityChooser';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import produce from 'immer';
import { colors } from 'theme';
import ArrowToggle from 'components/ArrowToggle';
import messages from './messages';
import Target from './target';

const Pattern = ({
  pattern,
  formatMessage,
  disabled,
  updatePattern,
  onAddTarget,
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
    () => pattern.target.reduce((acc, { percentage }) => acc + +percentage, 0),
    [pattern.target],
  );
  const [showRandomization, setShowRandomization] = useState(newPattern);
  return (
    <>
      <Row align="center" mb={8} justify="around">
        <Box display="flex" align="center">
          <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
          <InequalityChooser
            disabled={disabled}
            onSuccessfulChange={value =>
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
          const onUpdateTarget = newValues => {
            /* eslint-disable default-case, no-param-reassign */
            const newTarget = produce(pattern.target, draft => {
              draft[targetIndex] = {
                ...draft[targetIndex],
                ...newValues,
              };
            });
            updatePattern({ ...pattern, target: newTarget });
          };
          const onDeleteTarget = () => {
            const newTarget = produce(pattern.target, draft =>
              draft.filter((_, deleteIndex) => deleteIndex !== targetIndex),
            );
            updatePattern({ ...pattern, target: newTarget });
          };

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
              onUpdateTarget={onUpdateTarget}
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
        <Text my={10} ml={70} color={colors.flamingo}>
          {formatMessage(messages.percentagesSumInvalid)}
        </Text>
      )}
    </>
  );
};

Pattern.propTypes = {
  pattern: PropTypes.object,
  onAddTarget: PropTypes.func,
  disabled: PropTypes.bool,
  newPattern: PropTypes.bool,
  sessionBranching: PropTypes.object,
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
