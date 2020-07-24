import React from 'react';
import get from 'lodash/get';
import { components } from 'react-select';

import arrowDownSelect from 'assets/svg/arrow-down-select.svg';

import Img from 'components/Img';
import Checkbox from 'components/Checkbox';

import { OptionContainer } from './styled';

const DropdownIndicator = props => {
  const isOpen = get(props, 'selectProps.menuIsOpen', false);
  const transform = isOpen ? 'rotate(180deg);' : '';
  const transition = 'transform 0.2s;';
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

DropdownIndicator.propTypes = components.DropdownIndicator.propTypes;

const Option = ({
  innerProps,
  innerRef,
  data,
  isSelected,
  isFocused,
  selectProps,
}) => {
  const { label, additionalData } = data;
  const { formatLabel } = selectProps;
  const getLabel = () => {
    if (!additionalData) return formatLabel(label);
    return formatLabel(label, additionalData);
  };
  return (
    <OptionContainer
      ref={innerRef}
      {...innerProps}
      isFocused={isFocused}
      className="custom-option"
    >
      <Checkbox checked={isSelected} mr={15} />
      <span>{getLabel()}</span>
    </OptionContainer>
  );
};

Option.propTypes = components.Option.propTypes;

export { DropdownIndicator, Option };
