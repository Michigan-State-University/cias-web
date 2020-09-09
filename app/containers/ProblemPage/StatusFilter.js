import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  archived,
  statusTypeToColorMap,
  statusTypeToFontColorMap,
} from 'models/Status/StatusTypes';
import globalMessages from 'global/i18n/globalMessages';
import { StatusLabel, FilterText } from './styled';

const StatusFilter = ({ formatMessage, onClick, active }) => {
  const labels = useMemo(
    () =>
      Object.keys(globalMessages.statuses).filter(
        status => status !== archived,
      ),
    [globalMessages.statuses],
  );
  return (
    <>
      {labels.map(status => (
        <StatusLabel
          key={status}
          value={status}
          color={statusTypeToColorMap[status]}
          onClick={onClick}
          active={active.includes(status)}
        >
          <FilterText
            color={statusTypeToFontColorMap[status]}
            active={active.includes(status)}
          >
            {formatMessage(globalMessages.statuses[status])}
          </FilterText>
        </StatusLabel>
      ))}
    </>
  );
};

StatusFilter.propTypes = {
  formatMessage: PropTypes.func,
  onClick: PropTypes.func,
  active: PropTypes.array,
};
export default StatusFilter;
