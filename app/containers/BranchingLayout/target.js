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
import PlusCircle from 'components/Circle/PlusCircle';
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
  onAddTarget,
  isOnlyTarget,
}) => {
  const onTargetClick = e => {
    if (onAddTarget) {
      e.stopPropagation();
      onAddTarget();
    }
  };
  return (
    <Box
      onClick={onTargetClick}
      display="flex"
      align="center"
      justify="end"
      cursor={onAddTarget ? 'pointer' : undefined}
    >
      <Box
        opacity={onAddTarget ? 0.3 : 1}
        display="flex"
        align="center"
        justify="end"
        mr={isOnlyTarget ? 25 : null}
      >
        <Box bg={colors.linkWater} mx={6}>
          <StyledInput
            hasError={invalidPercentage}
            width={50}
            disabled={disabled || !!onAddTarget}
            cursor={onAddTarget ? 'pointer' : undefined}
            px={0}
            py={12}
            textAlign="center"
            placeholder=".."
            value={target ? target.probability : null}
            validator={numericValidator}
            onBlur={probability => onUpdateTarget({ probability })}
          />
        </Box>
        <Text whiteSpace="pre" mr={6}>
          {formatMessage(messages.percentGoTo)}
        </Text>
        <ArrowDropdown
          disabled={disabled}
          width={130}
          positionFrom="right"
          setOpen={value => {
            if (!onAddTarget) {
              handleDropdownClick(value, uniqueTargetIndex);
            }
          }}
          isOpened={isChooserOpened}
          childWidthScope="child"
          dropdownContent={
            <Box
              maxWidth={100}
              data-cy={`select-question-${uniqueTargetIndex}`}
            >
              <EllipsisText
                text={displayPatternTargetText(target)}
                fontSize={13}
              />
            </Box>
          }
        >
          <TargetQuestionChooser
            sessionBranching={sessionBranching}
            isVisible={isChooserOpened}
            target={target}
            onClick={value => {
              setTargetChooserOpen(-1);
              onUpdateTarget(value);
            }}
          />
        </ArrowDropdown>
      </Box>
      {!disabled && !onAddTarget && !isOnlyTarget && (
        <Img
          width="15px"
          height="15px"
          ml={10}
          src={binNoBg}
          onClick={onDeleteTarget}
          clickable
        />
      )}
      {!!onAddTarget && <PlusCircle opacity={1} ml={10} size="15px" />}
    </Box>
  );
};

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
  sessionBranching: PropTypes.object,
  setTargetChooserOpen: PropTypes.func,
  onDeleteTarget: PropTypes.func,
  onAddTarget: PropTypes.func,
};

export default Target;
