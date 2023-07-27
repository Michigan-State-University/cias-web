import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import OrganizationIcon from 'assets/svg/organization-icon.svg';

import { themeColors } from 'theme';

import { RoutePath } from 'global/constants';
import { makeSelectIntervention } from 'global/reducers/intervention';

import { parametrizeRoutePath } from 'utils/router';

import Text from 'components/Text';
import Box from 'components/Box';

import ReportingDashboardItem from './ReportingDashboardItem';

const OrganizationItem = ({
  organization: { id, name },
  canAccessOrganizations,
}) => {
  const history = useHistory();
  const location = useLocation();

  // selectors
  const { organizationId, id: interventionId } =
    useSelector(makeSelectIntervention()) ?? {};

  const redirect = () => {
    const path = parametrizeRoutePath(
      canAccessOrganizations
        ? RoutePath.MANAGE_ORGANIZATIONS
        : RoutePath.DASHBOARD_VIEW,
      { organizationId: id },
    );
    history.push(path);
  };

  const isCurrentOrganizationPage = () =>
    location.pathname.includes(
      parametrizeRoutePath(RoutePath.MANAGE_ORGANIZATIONS, {
        organizationId: id,
      }),
    );

  const isCurrentOrganizationInterventionPage = () =>
    id === organizationId &&
    location.pathname.includes(`interventions/${interventionId}`);

  const active =
    isCurrentOrganizationPage() || isCurrentOrganizationInterventionPage();

  const buttons = [
    {
      text: 'Manage organizations',
      path: parametrizeRoutePath(RoutePath.MANAGE_ORGANIZATIONS, {
        organizationId: id,
      }),
    },
    {
      text: 'Dashboard setup',
      path: parametrizeRoutePath(RoutePath.DASHBOARD_SETUP, {
        organizationId: id,
      }),
    },
    {
      text: 'Dashboard view',
      path: parametrizeRoutePath(RoutePath.DASHBOARD_VIEW, {
        organizationId: id,
      }),
    },
  ];

  const renderButtons = () => (
    <Box mt={20} ml={20}>
      {buttons.map(({ text, path }, index) => {
        const buttonActive = location.pathname === path;
        return (
          <Text
            clickable
            key={index}
            my={20}
            onClick={() => history.push(path)}
            color={buttonActive ? themeColors.secondary : ''}
            fontWeight="bold"
          >
            {text}
          </Text>
        );
      })}
    </Box>
  );

  return (
    <>
      <ReportingDashboardItem
        redirect={redirect}
        active={active}
        icon={OrganizationIcon}
        alt={`organization-${name}`}
        name={name}
      />
      {active && canAccessOrganizations && renderButtons()}
    </>
  );
};

OrganizationItem.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  canAccessOrganizations: PropTypes.bool,
};

export default OrganizationItem;
