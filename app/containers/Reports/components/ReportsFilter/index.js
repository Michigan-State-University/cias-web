import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import Selector from 'components/Selector';
import Checkbox from 'components/Checkbox';

import messages from './messages';

export function ReportsFilter({
  formatMessage,
  changeFilter,
  changeSort,
  activeFilters,
  activeSort,
  sortOptions,
  filterOptions,
  disableFilter,
  noContent,
}) {
  return (
    <Row my={24} align="center" justify={disableFilter ? 'end' : 'between'}>
      {!disableFilter && (
        <Row align="center">
          <Text mr={15} fontWeight="bold">
            {formatMessage(messages.filterLabel)}
          </Text>
          {filterOptions.map((option) => (
            <Row key={option} align="center">
              <Checkbox
                id={option}
                onChange={() => changeFilter(option)}
                width={20}
                checked={activeFilters.includes(option)}
              >
                <Text fontSize={15} mr={15}>
                  {formatMessage(messages[option])}
                </Text>
              </Checkbox>
            </Row>
          ))}
        </Row>
      )}
      <Row minWidth={150}>
        {!noContent && (
          <Selector
            options={sortOptions}
            activeOption={{
              value: activeSort,
              label: formatMessage(messages[activeSort]),
            }}
            rightPosition="315"
            setOption={changeSort}
            ariaLabel={formatMessage(messages.selectorAriaLabel)}
          />
        )}
      </Row>
    </Row>
  );
}

ReportsFilter.propTypes = {
  formatMessage: PropTypes.func,
  changeSort: PropTypes.func,
  changeFilter: PropTypes.func,
  activeFilters: PropTypes.array,
  activeSort: PropTypes.string,
  disableFilter: PropTypes.bool,
  noContent: PropTypes.bool,
  sortOptions: PropTypes.array,
  filterOptions: PropTypes.array,
};
