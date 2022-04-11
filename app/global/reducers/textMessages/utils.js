import globalMessages from 'global/i18n/globalMessages';
import { textMessageTypeColors } from 'models/TextMessage/TextMessageTypeColors';
import { formatMessage } from 'utils/intlOutsideReact';

export const generateFiltersArray = (types) =>
  types.map((type) => ({
    value: type,
    label: formatMessage(globalMessages[type]),
    color: textMessageTypeColors.get(type),
    active: true,
  }));

export const mapFiltersToStringArray = (filters) => {
  const selectedFilters = filters.filter(({ active }) => active);

  return selectedFilters.map(({ value }) => value);
};
