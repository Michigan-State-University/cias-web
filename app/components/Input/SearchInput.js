import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';

import search from 'assets/svg/search.svg';

import ActionIcon from 'components/ActionIcon';

import Input from '.';
import { SearchInputStyled, SearchIcon } from './styled';
import messages from './messages';

const DEFAULT_DEBOUNCE = 0;

const SearchInput = ({
  icon,
  debounceTime,
  value,
  onChange,
  'data-cy': dataCy,
  ...inputProps
}) => {
  const { formatMessage } = useIntl();
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
    <SearchInputStyled data-cy={dataCy}>
      <Input
        {...inputProps}
        width="100%"
        ref={inputRef}
        onChange={handleChange}
        px={35}
      />
      <SearchIcon src={search} alt="search" />
      {value && (
        <ActionIcon
          onClick={() => onChange({ target: { value: '' } })}
          height={15}
          width={15}
          mx={0}
          background="none"
          ariaText={formatMessage(messages.clearButtonLabel)}
          position="absolute"
          right={12}
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
  'data-cy': PropTypes.string,
};

SearchInput.defaultProps = {
  debounceTime: DEFAULT_DEBOUNCE,
};

export default SearchInput;
