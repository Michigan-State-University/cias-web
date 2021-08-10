import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import search from 'assets/svg/search.svg';

import ActionIcon from 'components/ActionIcon';

import Input from '.';
import { SearchInputStyled, SearchIcon } from './styled';
import messages from './messages';

const SearchInput = ({ icon, ...inputProps }) => {
  const { formatMessage } = useIntl();

  const { value, onChange, width } = inputProps;

  return (
    <SearchInputStyled width={width}>
      <Input {...inputProps} px={30} />
      <SearchIcon src={search} alt="search" />
      {value && (
        <ActionIcon
          onClick={() => onChange({ target: { value: '' } })}
          height={15}
          width={15}
          ml={10}
          background="none"
          aria-label={formatMessage(messages.clearButtonLabel)}
          title={formatMessage(messages.clearButtonLabel)}
        />
      )}
    </SearchInputStyled>
  );
};

SearchInput.propTypes = {
  icon: PropTypes.any,
};

export default SearchInput;
