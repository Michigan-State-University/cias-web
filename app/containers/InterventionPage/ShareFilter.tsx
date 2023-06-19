import React, { useMemo } from 'react';
import { Col } from 'react-grid-system';

import globalMessages from 'global/i18n/globalMessages';

import Select from 'components/Select';
import { IntlShape } from 'react-intl';
import { SelectOption } from 'components/Select/types';

type Props = {
  formatMessage: IntlShape['formatMessage'];
  onChange: (values: string) => void;
  active: string;
};

const ShareFilter = ({ formatMessage, onChange, active }: Props) => {
  const options = useMemo(
    () =>
      Object.keys(globalMessages.sharingFilters).map((status) => ({
        value: status,
        // @ts-ignore
        label: formatMessage(globalMessages.sharingFilters[status]),
      })),
    [globalMessages.statuses],
  );

  const selectValue = active
    ? {
        value: active,
        // @ts-ignore
        label: formatMessage(globalMessages.sharingFilters[active]),
      }
    : null;

  const handleChange = (selectedValue: SelectOption<string>) =>
    onChange(selectedValue.value);

  return (
    <Col>
      <Select
        width={400}
        selectProps={{
          options,
          value: selectValue,
          onChange: handleChange,
          placeholder: formatMessage(globalMessages.allInterventions),
        }}
      />
    </Col>
  );
};

export default ShareFilter;
