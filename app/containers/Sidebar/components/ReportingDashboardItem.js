import React from 'react';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Text from 'components/Text';

const ReportingDashboardItem = ({ active, redirect, icon, name, alt, id }) => (
  <>
    <Box
      clickable
      bg={active ? themeColors.secondary : ''}
      bgOpacity={active ? 0.2 : 1}
      onClick={redirect}
      key={id}
      padding={10}
      ml={-10}
      display="flex"
      align="center"
      mb={5}
    >
      <Icon
        fill={active ? themeColors.secondary : ''}
        mr={10}
        src={icon}
        alt={alt}
      />
      <Text color={active ? themeColors.secondary : ''} fontWeight="bold">
        {name}
      </Text>
    </Box>
  </>
);

ReportingDashboardItem.propTypes = {
  active: PropTypes.bool,
  redirect: PropTypes.func,
  icon: PropTypes.node,
  name: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
};

export default ReportingDashboardItem;
