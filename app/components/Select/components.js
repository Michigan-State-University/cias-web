import React from 'react';
import get from 'lodash/get';
import { components } from 'react-select';

import Checkbox from 'components/Checkbox';
import ToggleArrow from 'components/ToggleArrow';

import { OptionContainer } from './styled';

const DropdownIndicator = (props) => {
  const isOpen = get(props, 'selectProps.menuIsOpen', false);
  return (
    <components.DropdownIndicator {...props}>
      <ToggleArrow facingUp={isOpen} />
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
      <Checkbox id={label} checked={isSelected} mr={15}>
        {getLabel()}
      </Checkbox>
    </OptionContainer>
  );
};

Option.propTypes = components.Option.propTypes;

export { DropdownIndicator, Option };
