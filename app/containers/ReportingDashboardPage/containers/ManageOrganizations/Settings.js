import React, { memo, useContext, useState } from 'react';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const commonProps = {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  };

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
      return wrapper(<OrganizationSettings {...commonProps} />);
    case EntityType.healthSystem:
      return wrapper(<HealthSystemSettings {...commonProps} />);
    case EntityType.clinic:
      return wrapper(<ClinicSettings {...commonProps} />);
    default:
      return null;
  }
};

Settings.propTypes = {};

export default memo(Settings);
