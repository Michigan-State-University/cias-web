import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';

import search from 'assets/svg/search.svg';

import ActionIcon from 'components/ActionIcon';

import Input from '.';
import { SearchInputStyled, SearchIcon } from './styled';
import messages from './messages';

const DEFAULT_DEBOUNCE = 0;

const SearchInput = ({ icon, debounceTime, ...inputProps }) => {
  const { formatMessage } = useIntl();

  const { value, onChange, width } = inputProps;

  const handleChange = useCallback(debounce(onChange, debounceTime), [
    debounceTime,
  ]);

  return (
    <SearchInputStyled width={width}>
      <Input {...inputProps} onChange={handleChange} px={30} />
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
  debounceTime: PropTypes.number,
};

SearchInput.defaultProps = {
  debounceTime: DEFAULT_DEBOUNCE,
};

export default SearchInput;
