import React from 'react';
import PropTypes from 'prop-types';

import decideIfPassValue from 'utils/decideIfPassValue';
import Column from 'components/Column';
import Text from 'components/Text';
import { themeColors, colors, boxShadows } from 'theme';

const ElementsContainer = ({
  options,
  selectedOption,
  setOption,
  toggleActive,
}) => {
  const handleSelectOption = id => {
    toggleActive();
    setOption(id);
  };

  return (
    <Column
      bg={colors.white}
      shadow={boxShadows.selago}
      px={20}
      py={15}
      align="start"
    >
      {options.map(({ label, id }, index) => {
        const isSelected = id === selectedOption.id;
        return (
          <Text
            key={`el-text-option-${id}`}
            color={isSelected ? themeColors.secondary : null}
            mb={decideIfPassValue({
              index,
              arrayLength: options.length,
              value: 10,
            })}
            fontWeight="bold"
            whiteSpace="nowrap"
            clickable
            onClick={() => handleSelectOption(id)}
            role="option"
          >
            {label}
          </Text>
        );
      })}
    </Column>
  );
};

ElementsContainer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string }),
  ),
  setOption: PropTypes.func,
  toggleActive: PropTypes.func,
  selectedOption: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default ElementsContainer;
