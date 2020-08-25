import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { archived, statusTypeToColorMap } from 'models/Status/StatusTypes';
import globalMessages from 'global/i18n/globalMessages';
import { StatusLabel } from './styled';

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
          <p>{formatMessage(globalMessages.statuses[status])}</p>
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
