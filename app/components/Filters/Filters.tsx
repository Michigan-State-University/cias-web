import React, {
  CSSProperties,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import isEqual from 'lodash/isEqual';

import { Col, Container, Row } from 'components/ReactGridSystem';
import { ClearFiltersButton } from 'components/ActionIcons';

import { FilterTile } from './FilterTile';
import { Filter } from './types';
import { mapNewFiltersAfterSelect } from './utils';

type Props<T> = {
  filters?: Filter<T>[];
  initialFilters: Filter<T>[];
  onChange: (filters: Filter<T>[]) => void;
  style: Partial<CSSProperties>;
};

const Component = <T,>({
  initialFilters,
  filters,
  onChange,
  style,
}: Props<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<Filter<T>[]>(
    filters ?? initialFilters,
  );

  useEffect(() => {
    if (filters && !isEqual(filters, selectedFilters))
      setSelectedFilters(filters);
  }, [filters]);

  const clearFilters = () => {
    setSelectedFilters(initialFilters);
    onChange(initialFilters);
  };

  const showClearFilters = useMemo(
    () => !isEqual(initialFilters, selectedFilters),
    [selectedFilters],
  );

  const handleFilterClick = (selectedValue: T) => {
    const newFilters = mapNewFiltersAfterSelect(selectedFilters, selectedValue);

    setSelectedFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <Container style={style} fluid>
      <Row align="center">
        {selectedFilters.map(({ active, color, label, value }, index) => (
          <Col key={index} xs="content" style={{ marginBottom: 10 }}>
            <FilterTile
              text={label}
              onClick={() => handleFilterClick(value)}
              color={color}
              active={active}
            />
          </Col>
        ))}

        {showClearFilters && (
          <Col xs={1} style={{ marginBottom: 10 }}>
            {/* @ts-ignore */}
            <ClearFiltersButton onClick={clearFilters} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export const Filters = memo(Component);
