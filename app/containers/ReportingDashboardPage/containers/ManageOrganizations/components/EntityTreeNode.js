import PropTypes from 'prop-types';
import React, { memo, useContext, useMemo } from 'react';

import { themeColors } from 'theme';
import { EntityType } from 'global/reducers/organizations';

import OrganizationIcon from 'assets/svg/organization-icon.svg';
import HealthSystemIcon from 'assets/svg/health-system-icon.svg';
import ClinicIcon from 'assets/svg/clinic-icon.svg';

import Icon from 'components/Icon';
import Text from 'components/Text';

import { ManageOrganizationsContext } from '../constants';
import { EntityRow, FullWidthContainer } from '../../../styled';

const EntityTreeNode = ({ name, type, id, onClick }) => {
  const { selectedEntity } = useContext(ManageOrganizationsContext);

  const isSelected = useMemo(
    () => type === selectedEntity.type && id === selectedEntity.id,
    [id, type, selectedEntity],
  );

  const icon = useMemo(() => {
    switch (type) {
      case EntityType.organization:
        return OrganizationIcon;
      case EntityType.healthSystem:
        return HealthSystemIcon;
      case EntityType.clinic:
        return ClinicIcon;
      default:
        return null;
    }
  }, [type]);

  return (
    <FullWidthContainer>
      <EntityRow align="end" $isSelected={isSelected} onClick={onClick}>
        <Icon
          src={icon}
          fill={isSelected ? themeColors.secondary : ''}
          mr={8}
        />
        <Text
          fontWeight="bold"
          color={isSelected ? themeColors.secondary : themeColors.text}
        >
          {name}
        </Text>
      </EntityRow>
    </FullWidthContainer>
  );
};

EntityTreeNode.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(EntityTreeNode);
