import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Target from './Target';

export const TargetList = ({
  pattern,
  index,
  onUpdateTarget,
  targetChooserOpen,
  questionId,
  onRemoveTarget,
  isOnlyTarget,
  disabled,
  displayPatternTargetText,
  handleDropdownClick,
  sessionBranching,
  setTargetChooserOpen,
  sumPercentages,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {pattern.target.map((target, targetIndex) => {
        const uniqueTargetIndex = index * 100 + targetIndex;
        const isChooserOpened = uniqueTargetIndex === targetChooserOpen;
        const updateTarget = newValues =>
          onUpdateTarget(questionId, index, targetIndex, {
            ...target,
            ...newValues,
          });
        const onDeleteTarget = () =>
          onRemoveTarget(questionId, index, targetIndex);

        return (
          <Target
            isOnlyTarget={isOnlyTarget}
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
            bg={colors.white}
          />
        );
      })}
    </>
  );
};

TargetList.propTypes = {
  pattern: PropTypes.object,
  index: PropTypes.number,
  onUpdateTarget: PropTypes.func,
  targetChooserOpen: PropTypes.number,
  questionId: PropTypes.string,
  onRemoveTarget: PropTypes.func,
  disabled: PropTypes.bool,
  displayPatternTargetText: PropTypes.func,
  handleDropdownClick: PropTypes.func,
  sessionBranching: PropTypes.bool,
  setTargetChooserOpen: PropTypes.func,
  sumPercentages: PropTypes.number,
  isOnlyTarget: PropTypes.bool,
};

export default memo(TargetList);
