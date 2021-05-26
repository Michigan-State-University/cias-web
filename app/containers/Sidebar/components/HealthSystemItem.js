import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';

import HealthSystemIcon from 'assets/svg/health-system-icon.svg';

import ReportingDashboardItem from './RaportingDashboardItem';

const HealthSystemItem = ({ healthSystem: { id, name } }) => {
  const history = useHistory();
  const location = useLocation();
  const redirect = () => history.push(`/health-system/${id}`);
  const active = location.pathname.includes(`health-system/${id}`);

  return (
    <ReportingDashboardItem
      redirect={redirect}
      active={active}
      icon={HealthSystemIcon}
      alt={`health_system-${name}`}
      name={name}
    />
  );
};

HealthSystemItem.propTypes = {
  healthSystem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default HealthSystemItem;
