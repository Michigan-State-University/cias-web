import React, { memo, useContext } from 'react';

import { EntityType } from 'global/reducers/organizations';

import Loader from 'components/Loader';

import OrganizationSettings from './components/OrganizationSettings';
import HealthSystemSettings from './components/HealthSystemSettings';
import ClinicSettings from './components/ClinicSettings';

import { ManageOrganizationsContext } from './constants';
import { SettingsContainer } from '../../styled';

/**
 * General container for Organization, Health System and Clinic
 */
const Settings = () => {
  const {
    selectedEntity,
    organization,
    loaders: { fetchOrganization: fetchOrganizationLoader },
  } = useContext(ManageOrganizationsContext);

  const wrapper = component => (
    <SettingsContainer>{component}</SettingsContainer>
  );

  if (!organization && fetchOrganizationLoader)
    return wrapper(<Loader type="inline" />);

  switch (selectedEntity?.type) {
    case EntityType.organization:
      return wrapper(<OrganizationSettings />);
    case EntityType.healthSystem:
      return wrapper(<HealthSystemSettings />);
    case EntityType.clinic:
      return wrapper(<ClinicSettings />);
    default:
      return null;
  }
};

Settings.propTypes = {};

export default memo(Settings);
