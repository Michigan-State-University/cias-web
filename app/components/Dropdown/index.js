import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import dots from 'assets/svg/dots.svg';

import { colors, boxShadows, themeColors, ZIndex } from 'theme';
import useOutsideClick from 'utils/useOutsideClick';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Icon from 'components/Icon';
import { TextButton } from 'components/Button';

import { StyledComment, ImageContainer, StyledRow } from './styled';

const Dropdown = ({
  options,
  top,
  disabled,
  dropdownWidth,
  trigger,
  buttonTriggerTitle,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);

  const dropdown = useRef(null);
  useOutsideClick(dropdown, () => setOpen(false), open);

  const getPosition = () => {
    if (top)
      return {
        bottom: '35px',
      };
    return { top: '35px' };
  };

  const callAction = (action) => {
    action();
    setOpen(false);
  };

  const handleClick = () => {
    if (!disabled) setOpen(!open);
  };

  return (
    <Box
      ref={dropdown}
      display="flex"
      justify="end"
      align="start"
      position="relative"
      disabled={disabled}
      {...restProps}
    >
      {trigger === 'icon' && (
        <ImageContainer onClick={handleClick}>
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
        >
          {buttonTriggerTitle}
        </TextButton>
      )}
      {/* TODO use popover here to make options visible in scrollable content */}
      {open && (
        <Row
          position="absolute"
          right="0"
          zIndex={ZIndex.DROPDOWN}
          width={dropdownWidth}
          {...getPosition()}
        >
          <Column bg={colors.white} shadow={boxShadows.black} borderRadius={10}>
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
        </Row>
      )}
    </Box>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  top: PropTypes.bool,
  disabled: PropTypes.bool,
  dropdownWidth: PropTypes.number,
  trigger: PropTypes.oneOf(['icon', 'button']),
  buttonTriggerTitle: PropTypes.string,
};

Dropdown.defaultProps = {
  trigger: 'icon',
};

export default Dropdown;
export * from './types';
