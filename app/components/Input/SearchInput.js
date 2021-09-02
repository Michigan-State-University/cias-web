import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import search from 'assets/svg/search.svg';

import ActionIcon from 'components/ActionIcon';

import Input from '.';
import { SearchInputStyled, SearchIcon } from './styled';

const DEFAULT_DEBOUNCE = 0;

const SearchInput = ({
  icon,
  debounceTime,
  value,
  onChange,
  ...inputProps
}) => {
  const { width } = inputProps;

  const inputRef = useRef(null);

  useEffect(() => {
    if (value !== inputRef.current.value) {
      inputRef.current.value = value;
    }
  }, [value, inputRef]);

  const handleChange = useCallback(debounce(onChange, debounceTime), [
    debounceTime,
    onChange,
  ]);

  return (
    <SearchInputStyled width={width}>
      <Input {...inputProps} ref={inputRef} onChange={handleChange} px={30} />
      <SearchIcon src={search} alt="search" />
      {value && (
        <ActionIcon
          onClick={() => onChange({ target: { value: '' } })}
          height={15}
          width={15}
          ml={10}
          background="none"
        />
      )}
    </SearchInputStyled>
  );
};

SearchInput.propTypes = {
  icon: PropTypes.any,
  debounceTime: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  debounceTime: DEFAULT_DEBOUNCE,
};

export default SearchInput;
