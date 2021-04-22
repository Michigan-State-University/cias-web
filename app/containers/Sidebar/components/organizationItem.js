import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import Text from 'components/Text';
import Box from 'components/Box';
import OrganizationIcon from 'assets/svg/organization-icon.svg';
import { useHistory, useLocation } from 'react-router';
import { themeColors } from 'theme';

const OrganizationItem = ({ organization: { id, name } }) => {
  const history = useHistory();
  const location = useLocation();
  const redirect = () => history.push(`/organization/${id}`);
  const active = location.pathname.includes(`organization/${id}`);

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
      <Box
        bg={active ? themeColors.secondary : ''}
        bgOpacity={active ? 0.2 : 1}
        onClick={redirect}
        key={id}
        padding={10}
        ml={-10}
        display="flex"
        align="center"
      >
        <Icon
          fill={active ? themeColors.secondary : ''}
          mr={10}
          src={OrganizationIcon}
          alt="organization"
        />
        <Text color={active ? themeColors.secondary : ''} fontWeight="bold">
          {name}
        </Text>
      </Box>
      {active && renderButtons()}
    </>
  );
};

OrganizationItem.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default OrganizationItem;
