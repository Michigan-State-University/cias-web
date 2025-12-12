import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DotsIcon from 'assets/svg/dots.svg';
import ArrowDownWhiteIcon from 'assets/svg/arrow-down-white.svg';

import { colors, boxShadows, themeColors, ZIndex } from 'theme';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { TextButton, Button } from 'components/Button';
import { PopoverModal } from 'components/Modal';

import { StyledComment, ImageContainer, StyledRow } from './styled';

const Dropdown = ({
  id,
  options,
  disabled,
  dropdownWidth,
  trigger,
  buttonTriggerTitle,
  buttonTriggerProps,
  dropdownTitle,
  loading,
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
          <Img src={DotsIcon} alt="dots" />
        </ImageContainer>
      )}
      {trigger === 'text-button' && (
        <TextButton
          buttonProps={{
            color: themeColors.secondary,
            ...buttonTriggerProps,
          }}
          disabled={disabled}
          onClick={handleClick}
          id={id}
          loading={loading}
        >
          {buttonTriggerTitle}
        </TextButton>
      )}
      {trigger === 'primary-button' && (
        <Button
          disabled={disabled}
          onClick={handleClick}
          id={id}
          loading={loading}
          px={24}
          display="flex"
          align="center"
          gap={8}
          {...buttonTriggerProps}
        >
          {buttonTriggerTitle}
          <Icon src={ArrowDownWhiteIcon} width={13} height={8} />
        </Button>
      )}
      {open && (
        <PopoverModal
          referenceElement={id}
          defaultPlacement="bottom"
          onClose={() => setOpen(false)}
          contentPadding="0px"
          offsetOptions={trigger === 'primary-button' ? 6 : 16}
          modalStyle={{
            backgroundColor: colors.white,
            borderColor: 'transparent',
            borderRadius: 10,
            boxShadow: boxShadows.selago,
            width: dropdownWidth,
            padding: 12,
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
            <Column gap={4}>
              {options.map((option) => (
                <StyledRow
                  disabled={option.disabled}
                  key={`el-dropdown-${option.id}`}
                  padding={8}
                  onClick={() => !option.disabled && callAction(option.action)}
                  align="center"
                >
                  {option.icon &&
                    (typeof option.icon === 'string' ? (
                      <Icon
                        src={option.icon}
                        fill={colors.greyishBlue}
                        alt="icon"
                        mr={4}
                        width={24}
                      />
                    ) : (
                      <Box mr={4} display="flex" align="center">
                        <option.icon size={24} color={colors.greyishBlue} />
                      </Box>
                    ))}
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
  trigger: PropTypes.oneOf(['icon', 'text-button', 'primary-button']),
  buttonTriggerTitle: PropTypes.string,
  buttonTriggerProps: PropTypes.object,
  dropdownTitle: PropTypes.string,
  loading: PropTypes.bool,
};

Dropdown.defaultProps = {
  trigger: 'icon',
};

export default Dropdown;
export * from './types';
