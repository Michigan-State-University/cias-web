import React, { useCallback, useRef } from 'react';
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
  const ref = useRef();

  const { onChange, width } = inputProps;

  const handleChange = useCallback(debounce(onChange, debounceTime), [
    debounceTime,
  ]);

  const handleClear = useCallback(() => {
    ref.current.value = '';
    handleChange({ target: { value: '' } });
  }, [handleChange]);

  return (
    <SearchInputStyled width={width}>
      <Input ref={ref} {...inputProps} onChange={handleChange} px={30} />
      <SearchIcon src={search} alt="search" />
      {ref.current?.value && (
        <ActionIcon
          onClick={handleClear}
          height={15}
          width={15}
          ml={10}
          background="none"
          ariaText={formatMessage(messages.clearButtonLabel)}
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
