import React from 'react';
import get from 'lodash/get';
import { components } from 'react-select';

import arrowDownSelect from 'assets/svg/arrow-down-select.svg';
import Img from 'components/Img';

const DropdownIndicator = props => {
  const isOpen = get(props, 'selectProps.menuIsOpen', false);
  const transform = isOpen ? 'rotate(180deg);' : '';
  const transition = isOpen ? 'transform 0.2s;' : '';
  return (
    <components.DropdownIndicator {...props}>
      <Img
        src={arrowDownSelect}
        transform={transform}
        transition={transition}
      />
    </components.DropdownIndicator>
  );
};

DropdownIndicator.propTypes = {
  ...components.DropdownIndicator.propTypes,
};

export { DropdownIndicator };
