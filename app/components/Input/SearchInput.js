import React from 'react';
import PropTypes from 'prop-types';

import search from 'assets/svg/search.svg';
import CloseIcon from 'components/CloseIcon';
import Input from '.';
import { SearchInputStyled, SearchIcon } from './styled';

const SearchInput = ({ icon, ...inputProps }) => {
  const { value, onChange, width } = inputProps;
  return (
    <SearchInputStyled width={width}>
      <Input {...inputProps} px={30} />
      <SearchIcon src={search} alt="search" />
      {value && (
        <CloseIcon
          onClick={() => onChange({ target: { value: '' } })}
          position="absolute"
          right="-20px"
          top="14px"
          height={15}
          width={15}
          background="none"
        />
      )}
    </SearchInputStyled>
  );
};

SearchInput.propTypes = {
  icon: PropTypes.any,
};

export default SearchInput;
