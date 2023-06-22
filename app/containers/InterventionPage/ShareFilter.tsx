import React, { useMemo } from 'react';
import { Col } from 'react-grid-system';
import { IntlShape } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';

import Select from 'components/Select';
import { SelectOption } from 'components/Select/types';
import { SharingFilter } from 'models/Intervention/SharingFilter';

type Props = {
  formatMessage: IntlShape['formatMessage'];
  onChange: (values: string | null) => void;
  active: SharingFilter | null;
};

const ShareFilter = ({ formatMessage, onChange, active }: Props) => {
  const options = useMemo(() => {
    const filterOptions = Object.values(SharingFilter).map((filter) => ({
      value: filter,
      // @ts-ignore
      label: formatMessage(globalMessages.sharingFilters[filter]),
    }));
    return [
      { value: null, label: formatMessage(globalMessages.allInterventions) },
      ...filterOptions,
    ];
  }, [SharingFilter]);

  const selectValue = active
    ? {
        value: active,
        // @ts-ignore
        label: formatMessage(globalMessages.sharingFilters[active]),
      }
    : null;

  const handleChange = (selectedValue: SelectOption<SharingFilter | null>) =>
    onChange(selectedValue.value);

  return (
    <Col>
      <Select
        selectProps={{
          options,
          value: selectValue,
          onChange: handleChange,
          placeholder: formatMessage(globalMessages.allInterventions),
          clearable: true,
        }}
      />
    </Col>
  );
};

export default ShareFilter;
