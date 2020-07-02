import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ArrowDropdownWrapper } from './styled';
import Dropdown from './Dropdown';

const ArrowDropdown = ({ children, width }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <ArrowDropdownWrapper width={width}>
      <Dropdown onClick={() => setIsOpened(!isOpened)} isOpened={isOpened}>
        {children}
      </Dropdown>
    </ArrowDropdownWrapper>
  );
};

ArrowDropdown.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
};

ArrowDropdown.defaultProps = {};

export default ArrowDropdown;
