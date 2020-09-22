import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import {
  archived,
  statusTypeToColorMap,
  statusTypeToFontColorMap,
} from 'models/Status/StatusTypes';
import globalMessages from 'global/i18n/globalMessages';

import CloseIcon from 'components/CloseIcon';
import { FilterText, StatusLabel } from './styled';

const StatusFilter = ({ formatMessage, onClick, active, onClear }) => {
  const filterArchived = statuses =>
    statuses.filter(status => status !== archived);

  const labels = useMemo(
    () =>
      filterArchived(Object.keys(globalMessages.statuses)).filter(
        status => status !== archived,
      ),
    [globalMessages.statuses],
  );

  const showIcon = active && filterArchived(active).length !== labels.length;

  return (
    <Row align="center" width="100%">
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
      {showIcon && (
        <CloseIcon
          height={15}
          width={15}
          mx={10}
          onClick={onClear}
          background="none"
        />
      )}
    </Row>
  );
};

StatusFilter.propTypes = {
  formatMessage: PropTypes.func,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  active: PropTypes.array,
};
export default StatusFilter;
