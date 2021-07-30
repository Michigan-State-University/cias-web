import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { boxShadows, colors } from 'theme';

import Box from 'components/Box';

import useOutsideClick from 'utils/useOutsideClick';
import { ArrowDropdownContext } from 'components/ArrowDropdown/utils';
import Dropdown from './Dropdown';
import { ArrowDropdownWrapper } from './styled';

const ArrowDropdown = ({
  children,
  width,
  dropdownContent,
  positionFrom,
  isOpened,
  setOpen,
  childWidthScope,
  disabled,
}) => {
  const dropdown = useRef(null);
  const buttonRef = useRef(null);
  useOutsideClick(dropdown, () => setOpen(false), isOpened);

  return (
    <ArrowDropdownWrapper ref={dropdown} width={width}>
      <Dropdown
        ref={buttonRef}
        disabled={disabled}
        onClick={() => setOpen && setOpen(!isOpened)}
        isOpened={isOpened}
      >
        {dropdownContent}
      </Dropdown>
      <Box
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width={childWidthScope === 'child' ? 'max-content' : '100%'}
        {...(isOpened ? { zIndex: 1 } : { display: 'none' })}
        {...(positionFrom === 'right' && { right: '0' })}
      >
        <ArrowDropdownContext.Provider value={{ ref: buttonRef }}>
          {children}
        </ArrowDropdownContext.Provider>
      </Box>
    </ArrowDropdownWrapper>
  );
};

ArrowDropdown.propTypes = {
  children: PropTypes.node,
  childWidthScope: PropTypes.oneOf(['parent', 'child']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dropdownContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  positionFrom: PropTypes.oneOf(['left', 'right']),
  isOpened: PropTypes.bool,
  setOpen: PropTypes.func,
  disabled: PropTypes.bool,
};

ArrowDropdown.defaultProps = {
  positionFrom: 'left',
  childWidthScope: 'child',
};

export default ArrowDropdown;
