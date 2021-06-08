/**
 *
 * ShareBoxModalParent
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import H2 from 'components/H2';
import { SessionIndex } from '../styled';

const ShareBoxModalParent = ({ position, name, children }) => (
  <Box height="fit-content" width={500} mt={20}>
    <Box display="flex" align="center">
      <SessionIndex>{position}</SessionIndex>
      <H2 ml={15}>{name}</H2>
    </Box>
    {children}
  </Box>
);

ShareBoxModalParent.propTypes = {
  position: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
};

export default ShareBoxModalParent;
