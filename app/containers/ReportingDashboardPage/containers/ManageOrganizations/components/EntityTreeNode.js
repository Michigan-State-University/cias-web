import PropTypes from 'prop-types';
import React, { memo, useContext, useMemo } from 'react';

import { colors, themeColors } from 'theme';
import { EntityType } from 'global/reducers/organizations';

import OrganizationIcon from 'assets/svg/organization-icon.svg';
import HealthSystemIcon from 'assets/svg/health-system-icon.svg';
import ClinicIcon from 'assets/svg/clinic-icon.svg';

import Icon from 'components/Icon';
import Box from 'components/Box';

import EllipsisText from 'components/Text/EllipsisText';
import { ManageOrganizationsContext } from '../constants';
import { EntityRow, FullWidthContainer } from '../../../styled';

const EntityTreeNode = ({ deleted, id, name, onClick, type }) => {
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

  const iconFillColor = useMemo(() => {
    if (deleted) return colors.yellowRed;
    if (isSelected) return themeColors.secondary;

    return '';
  }, [isSelected, deleted]);

  const textColor = useMemo(() => {
    if (deleted) return colors.yellowRed;
    if (isSelected) return themeColors.secondary;

    return themeColors.text;
  }, [isSelected, deleted]);

  return (
    <FullWidthContainer>
      <EntityRow
        align="end"
        $isSelected={isSelected}
        $isDeleted={deleted}
        onClick={onClick}
      >
        <Icon src={icon} fill={iconFillColor} mr={8} />
        <Box>
          <EllipsisText
            width={200}
            fontWeight="bold"
            color={textColor}
            text={name}
          />
        </Box>
      </EntityRow>
    </FullWidthContainer>
  );
};

EntityTreeNode.propTypes = {
  deleted: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(EntityTreeNode);
