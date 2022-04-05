import React, { useCallback, useState } from 'react';
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
  formulaIndex,
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
  bg,
  disableBranchingToSession,
}) => {
  const [width, setWidth] = useState(0);

  const onRefChange = useCallback(
    (node) => setWidth(node?.offsetWidth ?? 0),
    [],
  );

  const maxSelectTextWidth = width - 35;

  return (
    <Box display="flex" align="center" width="100%">
      <Box display="flex" align="center" width="100%">
        {!isOnlyTarget && (
          <Box bg={bg || colors.linkWater} mr={6} ml={88} position="relative">
            <StyledInput
              hasError={invalidPercentage}
              width={56}
              height={50}
              disabled={disabled}
              px={0}
              py={12}
              textAlign="center"
              placeholder=".."
              value={target ? target.probability : ''}
              validator={numericValidator}
              onBlur={(probability) =>
                onUpdateTarget({ probability }, formulaIndex)
              }
              sufix="%"
            />
          </Box>
        )}
        <Text whiteSpace="pre" mr={6} fontWeight="bold">
          {formatMessage(messages.percentGoTo)}
        </Text>
        <Box ref={onRefChange} width="100%">
          <ArrowDropdown
            bg={colors.white}
            disabled={disabled}
            width="100%"
            positionFrom="right"
            setOpen={(value) => {
              handleDropdownClick(value, uniqueTargetIndex);
            }}
            isOpened={isChooserOpened}
            dropdownContent={
              <Box
                data-cy={`select-question-${uniqueTargetIndex}`}
                width="100%"
              >
                <EllipsisText
                  text={displayPatternTargetText(target)}
                  fontSize={13}
                  width={maxSelectTextWidth}
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
                onUpdateTarget(value, formulaIndex);
              }}
              disableBranchingToSession={disableBranchingToSession}
            />
          </ArrowDropdown>
        </Box>
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
};

Target.propTypes = {
  formulaIndex: PropTypes.number,
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
  bg: PropTypes.string,
  disableBranchingToSession: PropTypes.bool,
};

export default Target;
