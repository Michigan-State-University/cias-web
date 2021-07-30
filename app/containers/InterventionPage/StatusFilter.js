import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { Col } from 'react-grid-system';

import {
  statusTypes,
  statusTypeToColorMap,
  statusTypeToFontColorMap,
} from 'models/Status/StatusTypes';
import globalMessages from 'global/i18n/globalMessages';

import ActionIcon from 'components/ActionIcon';
import { FilterText, StatusLabel } from './styled';

const StatusFilter = ({ formatMessage, onClick, active, onClear }) => {
  const labels = useMemo(
    () => Object.keys(globalMessages.statuses),
    [globalMessages.statuses],
  );

  const showIcon = active && !isEqual(statusTypes, active.sort());

  return (
    <>
      {labels.map((status) => (
        <Col
          xs="content"
          key={status}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          <StatusLabel
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
        </Col>
      ))}
      {showIcon && (
        <Col xs={1}>
          <ActionIcon
            height={15}
            width={15}
            onClick={onClear}
            background="none"
          />
        </Col>
      )}
    </>
  );
};

StatusFilter.propTypes = {
  formatMessage: PropTypes.func,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  active: PropTypes.array,
};
export default StatusFilter;
