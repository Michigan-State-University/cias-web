import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';

import globalMessages from 'global/i18n/globalMessages';

import Select from 'components/Select';
import messages from './messages';

const StatusFilter = ({ formatMessage, onChange, active }) => {
  const options = useMemo(
    () =>
      Object.keys(globalMessages.statuses).map((status) => ({
        value: status,
        label: formatMessage(globalMessages.statuses[status]),
      })),
    [globalMessages.statuses],
  );

  const selectValue = active.map((status) => ({
    value: status,
    label: formatMessage(globalMessages.statuses[status]),
  }));

  const handleChange = (values) => onChange(values.map(({ value }) => value));

  return (
    <Col>
      <Select
        selectProps={{
          isMulti: true,
          options,
          formatLabel: (label) => label,
          value: selectValue,
          onChange: handleChange,
          placeholder: formatMessage(messages.statusFilterPlaceholder),
        }}
      />
    </Col>
  );
};

StatusFilter.propTypes = {
  formatMessage: PropTypes.func,
  onChange: PropTypes.func,
  active: PropTypes.array,
};
export default StatusFilter;
