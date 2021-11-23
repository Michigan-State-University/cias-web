import { Filter } from './types';

export const mapNewFiltersAfterSelect = <T>(
  filters: Filter<T>[],
  selectedValue: T,
) =>
  filters.map((filter) => {
    const { value, active } = filter;

    if (value === selectedValue) return { ...filter, active: !active };
    return filter;
  });
