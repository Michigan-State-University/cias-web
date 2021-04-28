import React, { memo } from 'react';

import { SettingsContainer } from 'containers/ReportingDashboardPage/styled';

import OrganizationSettings from './components/OrganizationSettings';

/**
 * General container for Organization, Health System and Clinic
 */
const Settings = () => (
  <SettingsContainer>
    <OrganizationSettings />
  </SettingsContainer>
);

Settings.propTypes = {};

export default memo(Settings);
