import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Box from 'components/Box';
import PlusCircle from 'components/Circle/PlusCircle';
import { colors } from 'theme';
import useOutsideClick from 'utils/useOutsideClick';

const PillsSelect = ({
  addNewText,
  data,
  value,
  onSelected,
  disabled,
  emptyText,
}) => {
  const dropdown = useRef(null);

  const [dropdownOpen, setDropDownOpen] = useState(false);

  useOutsideClick(dropdown, () => setDropDownOpen(false), dropdownOpen);

  const { selectedPills, notSelectedPills } = useMemo(
    () =>
      data.reduce(
        (acc, current) => {
          const key = value?.includes(current.value)
            ? 'selectedPills'
            : 'notSelectedPills';
          acc[key].push(current);
          return acc;
        },
        { selectedPills: [], notSelectedPills: [] },
      ),
    [value, data],
  );

  const onFilter = deleteId => () => {
    const newSelectedValue = selectedPills
      .filter(({ value: id }) => id !== deleteId)
      .map(({ value: id }) => id);
    onSelected(newSelectedValue);
  };

  return (
    <Box
      mt={10}
      display="inline-flex"
      width="100%"
      flexWrap="wrap"
      align="center"
      gap={10}
    >
      {selectedPills.map(({ label, value: id }) => (
        <Box
          key={id}
          px={10}
          py={5}
          display="flex"
          bg={colors.mystic}
          disabled={disabled}
        >
          {label}
          {!disabled && (
            <Text ml={10} cursor="pointer" onClick={onFilter(id)}>
              X
            </Text>
          )}
        </Box>
      ))}
      <div style={{ position: 'relative' }}>
        {notSelectedPills.length > 0 && !disabled && (
          <PlusCircle
            mr={12}
            size="18px"
            bg={colors.bluewood}
            cursor="pointer"
            onClick={() => {
              setDropDownOpen(true);
            }}
          />
        )}
        {dropdownOpen && (
          <Box
            ref={dropdown}
            position="absolute"
            bg={colors.white}
            width={200}
            top={30}
            left={0}
            padding={15}
            transform="translateX(-50%)"
            shadow="0px 0px 50px rgb(0 0 0 / 30%)"
            zIndex={1}
            maxHeight={300}
            overflow="scroll"
          >
            {notSelectedPills.map(({ label, value: id }) => (
              <Box
                key={id}
                px={15}
                py={5}
                mb={5}
                bg={colors.mystic}
                width="100%"
                onClick={() => {
                  onSelected([...value, id]);
                  setDropDownOpen(false);
                }}
                cursor="pointer"
              >
                {label}
              </Box>
            ))}
          </Box>
        )}
      </div>
      {selectedPills.length === 0 && !disabled && (
        <Text cursor="pointer" onClick={() => setDropDownOpen(true)}>
          {addNewText}
        </Text>
      )}

      {selectedPills.length === 0 && disabled && <Text>{emptyText}</Text>}
    </Box>
  );
};

PillsSelect.propTypes = {
  addNewText: PropTypes.string,
  emptyText: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, id: PropTypes.any }),
  ).isRequired,
  value: PropTypes.array,
  onSelected: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PillsSelect;
