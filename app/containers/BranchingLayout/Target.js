import React from 'react';
import PropTypes from 'prop-types';
import ArrowDropdown from 'components/ArrowDropdown';
import Box from 'components/Box';
import Img from 'components/Img';
import StyledInput from 'components/Input/StyledInput';
import Text from 'components/Text';
import EllipsisText from 'components/Text/EllipsisText';
import { colors } from 'theme';
import { numericValidator } from 'utils/validators';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import messages from './messages';
import TargetQuestionChooser from './TargetQuestionChooser';

const Target = ({
  target,
  disabled,
  onUpdateTarget,
  formatMessage,
  handleDropdownClick,
  uniqueTargetIndex,
  displayPatternTargetText,
  isChooserOpened,
  sessionBranching,
  setTargetChooserOpen,
  onDeleteTarget,
  invalidPercentage,
  isOnlyTarget,
  disableBranchingToSession,
  bg,
}) => (
  <Box
    display="flex"
    align="center"
    justify={sessionBranching ? 'start' : 'end'}
    ml={sessionBranching ? 80 : null}
  >
    <Box
      display="flex"
      align="center"
      justify="end"
      mr={isOnlyTarget ? 25 : null}
    >
      {!isOnlyTarget && (
        <Box bg={bg || colors.linkWater} mx={6} position="relative">
          <StyledInput
            height={50}
            hasError={invalidPercentage}
            width={56}
            disabled={disabled}
            px={0}
            py={12}
            textAlign="center"
            placeholder=".."
            value={target ? target.probability : ''}
            validator={numericValidator}
            onBlur={(probability) => onUpdateTarget({ probability })}
            sufix="%"
          />
        </Box>
      )}
      <Text whiteSpace="pre" mr={6} fontWeight="bold">
        {formatMessage(messages.percentGoTo)}
      </Text>
      <ArrowDropdown
        bg={colors.white}
        disabled={disabled}
        width={isOnlyTarget ? 140 : 120}
        positionFrom="right"
        setOpen={(value) => {
          handleDropdownClick(value, uniqueTargetIndex);
        }}
        isOpened={isChooserOpened}
        dropdownContent={
          <Box data-cy={`select-question-${uniqueTargetIndex}`}>
            <EllipsisText
              text={displayPatternTargetText(target)}
              fontSize={13}
              width={isOnlyTarget ? 120 : 85}
            />
          </Box>
        }
      >
        <TargetQuestionChooser
          sessionBranching={sessionBranching}
          isVisible={isChooserOpened}
          target={target}
          onClick={(value) => {
            setTargetChooserOpen(-1);
            onUpdateTarget(value);
          }}
          disableBranchingToSession={disableBranchingToSession}
        />
      </ArrowDropdown>
    </Box>

    {!disabled && !isOnlyTarget && (
      <Img
        width="15px"
        height="15px"
        ml={10}
        src={binNoBg}
        onClick={onDeleteTarget}
        clickable
      />
    )}
  </Box>
);

Target.propTypes = {
  target: PropTypes.object,
  disabled: PropTypes.bool,
  onUpdateTarget: PropTypes.func,
  formatMessage: PropTypes.func,
  handleDropdownClick: PropTypes.func,
  uniqueTargetIndex: PropTypes.number,
  displayPatternTargetText: PropTypes.func,
  isChooserOpened: PropTypes.bool,
  invalidPercentage: PropTypes.bool,
  isOnlyTarget: PropTypes.bool,
  sessionBranching: PropTypes.bool,
  setTargetChooserOpen: PropTypes.func,
  onDeleteTarget: PropTypes.func,
  disableBranchingToSession: PropTypes.bool,
  bg: PropTypes.string,
};

export default Target;
