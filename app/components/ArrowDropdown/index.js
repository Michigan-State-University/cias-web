import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { boxShadows, colors } from 'theme';

import Box from 'components/Box';

import Dropdown from './Dropdown';
import { ArrowDropdownWrapper } from './styled';

const ArrowDropdown = ({
  children,
  width,
  dropdownContent,
  positionFrom,
  isOpened,
  setOpen,
}) => {
  const dropdown = useRef(null);

  const handleClick = event => {
    const { target } = event;
    if (isOpened && dropdown.current && !dropdown.current.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpened]);

  return (
    <ArrowDropdownWrapper ref={dropdown} width={width}>
      <Dropdown onClick={() => setOpen(!isOpened)} isOpened={isOpened}>
        {dropdownContent}
      </Dropdown>
      <Box
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows[1]}
        position="absolute"
        width="max-content"
        mt={15}
        {...(isOpened ? { zIndex: 1 } : { display: 'none' })}
        {...positionFrom === 'right' && { right: '0' }}
      >
        {children}
      </Box>
    </ArrowDropdownWrapper>
  );
};

ArrowDropdown.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  dropdownContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  positionFrom: PropTypes.oneOf(['left', 'right']),
  isOpened: PropTypes.bool,
  setOpen: PropTypes.func,
};

ArrowDropdown.defaultProps = {
  positionFrom: 'left',
};

export default ArrowDropdown;
