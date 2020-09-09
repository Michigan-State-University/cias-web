import React from 'react';
import PropTypes from 'prop-types';

import search from 'assets/svg/search.svg';
import cross from 'assets/svg/cross.svg';

import Input from '.';
import {
  SearchInputStyled,
  SearchIcon,
  ClearButton,
  ClearIcon,
} from './styled';

const SearchInput = ({ icon, ...inputProps }) => {
  const { value, onChange } = inputProps;
  return (
    <SearchInputStyled>
      <Input {...inputProps} px={30} />
      <SearchIcon src={search} alt="search" />
      {value && (
        <ClearButton onClick={() => onChange({ target: { value: '' } })}>
          <ClearIcon src={cross} alt="clear" />
        </ClearButton>
      )}
    </SearchInputStyled>
  );
};

SearchInput.propTypes = {
  icon: PropTypes.any,
};

export default SearchInput;
