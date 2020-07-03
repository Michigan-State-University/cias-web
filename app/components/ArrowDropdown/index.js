import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { boxShadows, colors } from 'theme';
import { outsideClickHandler } from 'utils/outsideClickHandler';

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

  useEffect(() => {
    if (isOpened) {
      const cleanUp = outsideClickHandler(dropdown, () => setOpen(false));

      return cleanUp;
    }
  }, [isOpened]);

  return (
    <ArrowDropdownWrapper ref={dropdown} width={width}>
      <Dropdown
        onClick={() => setOpen && setOpen(!isOpened)}
        isOpened={isOpened}
      >
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
