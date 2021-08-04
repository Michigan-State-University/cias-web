import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import dots from 'assets/svg/dots.svg';

import { colors, boxShadows } from 'theme';
import useOutsideClick from 'utils/useOutsideClick';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Icon from 'components/Icon';

import { StyledComment, ImageContainer, StyledRow } from './styled';

const Dropdown = ({ options, top, disabled, ...restProps }) => {
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

  const callAction = action => {
    action();
    setOpen(false);
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
      <ImageContainer
        onClick={() => {
          if (!disabled) setOpen(!open);
        }}
      >
        <Img src={dots} alt="dots" />
      </ImageContainer>
      {open && (
        <Row position="absolute" right="0" zIndex={999} {...getPosition()}>
          <Column bg={colors.white} shadow={boxShadows.black} borderRadius={10}>
            {options.map(option => (
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
};

export default Dropdown;
