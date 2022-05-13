import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';

import { statusTypeToColorMap } from 'models/Status/StatusTypes';
import globalMessages from 'global/i18n/globalMessages';
import { StatusLabel } from './styled';

const StatusFilter = ({ formatMessage, onClick, active }) => (
  <Row my={35} justify="between" width={250}>
    {Object.keys(globalMessages.statuses).map((status) => (
      <StatusLabel
        key={status}
        value={status}
        color={statusTypeToColorMap[status]}
        onClick={onClick}
        active={active === status}
      >
        <p>{formatMessage(globalMessages.statuses[status])}</p>
      </StatusLabel>
    ))}
  </Row>
);

StatusFilter.propTypes = {
  formatMessage: PropTypes.func,
  onClick: PropTypes.func,
  active: PropTypes.string,
};
export default StatusFilter;
