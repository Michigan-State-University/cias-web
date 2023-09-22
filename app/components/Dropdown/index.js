import React, { useState } from 'react';
import PropTypes from 'prop-types';

import dots from 'assets/svg/dots.svg';

import { colors, boxShadows, themeColors, ZIndex } from 'theme';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { TextButton } from 'components/Button';
import { PopoverModal } from 'components/Modal';

import { StyledComment, ImageContainer, StyledRow } from './styled';

const Dropdown = ({
  id,
  options,
  disabled,
  dropdownWidth,
  trigger,
  buttonTriggerTitle,
  dropdownTitle,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);

  const callAction = (action) => {
    action();
    setOpen(false);
  };

  const handleClick = () => {
    if (!disabled) setOpen(!open);
  };

  return (
    <Box
      display="flex"
      justify="end"
      align="start"
      position="relative"
      disabled={disabled}
      {...restProps}
    >
      {trigger === 'icon' && (
        <ImageContainer onClick={handleClick} id={id}>
          <Img src={dots} alt="dots" />
        </ImageContainer>
      )}
      {trigger === 'button' && (
        <TextButton
          buttonProps={{
            color: themeColors.secondary,
          }}
          disabled={disabled}
          onClick={handleClick}
          id={id}
        >
          {buttonTriggerTitle}
        </TextButton>
      )}
      {open && (
        <PopoverModal
          referenceElement={id}
          defaultPlacement="bottom"
          onClose={() => setOpen(false)}
          contentPadding="0px"
          offsetOptions={16}
          modalStyle={{
            backgroundColor: colors.white,
            borderColor: 'transparent',
            borderRadius: 10,
            boxShadow: boxShadows.selago,
            width: dropdownWidth,
          }}
          hideArrow
          zIndex={ZIndex.DROPDOWN}
        >
          <Column>
            {dropdownTitle && (
              <Text fontSize={15} fontWeight="bold" margin="16px 16px 8px 8px">
                {dropdownTitle}
              </Text>
            )}
            {options.map((option) => (
              <StyledRow
                disabled={option.disabled}
                key={`el-dropdown-${option.id}`}
                padding={8}
                onClick={() => !option.disabled && callAction(option.action)}
                align="center"
              >
                {option.icon && (
                  <Icon
                    src={option.icon}
                    fill={colors.greyishBlue}
                    alt="icon"
                    mr={12}
                    width={18}
                  />
                )}
                <StyledComment
                  color={option.color || colors.bluewood}
                  whiteSpace="nowrap"
                  title={option.label}
                >
                  {option.label}
                </StyledComment>
              </StyledRow>
            ))}
          </Column>
        </PopoverModal>
      )}
    </Box>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  dropdownWidth: PropTypes.number,
  trigger: PropTypes.oneOf(['icon', 'button']),
  buttonTriggerTitle: PropTypes.string,
  dropdownTitle: PropTypes.string,
};

Dropdown.defaultProps = {
  trigger: 'icon',
};

export default Dropdown;
export * from './types';
