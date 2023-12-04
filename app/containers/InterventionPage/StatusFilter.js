import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';

import interventionStatusesMessages from 'global/i18n/interventionStatusesMessages';

import Select from 'components/Select';
import messages from './messages';

const StatusFilter = ({ formatMessage, onChange, active }) => {
  const options = useMemo(
    () =>
      Object.keys(interventionStatusesMessages).map((status) => ({
        value: status,
        label: formatMessage(interventionStatusesMessages[status]),
      })),
    [interventionStatusesMessages],
  );

  const selectValue = active.map((status) => ({
    value: status,
    label: formatMessage(interventionStatusesMessages[status]),
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
