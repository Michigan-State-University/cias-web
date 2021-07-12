import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import OrganizationIcon from 'assets/svg/organization-icon.svg';

import { themeColors } from 'theme';
import { makeSelectIntervention } from 'global/reducers/intervention';

import Text from 'components/Text';
import Box from 'components/Box';

import ReportingDashboardItem from './ReportingDashboardItem';

const OrganizationItem = ({
  organization: { id, name },
  canAccessOrganizations,
}) => {
  // selectors
  const { organizationId } = useSelector(makeSelectIntervention()) ?? {};

  const history = useHistory();
  const location = useLocation();
  const redirect = () => {
    const suffix = canAccessOrganizations ? `` : `/dashboard`;
    history.push(`/organization/${id}${suffix}`);
  };

  const active =
    location.pathname.includes(`organization/${id}`) || id === organizationId;

  const buttons = [
    {
      text: 'Manage organizations',
      path: `/organization/${id}`,
    },
    {
      text: 'Dashboard setup',
      path: `/organization/${id}/dashboard-setup`,
    },
    {
      text: 'Dashboard view',
      path: `/organization/${id}/dashboard`,
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
