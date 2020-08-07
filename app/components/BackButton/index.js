/**
 *
 * BackButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import Text from 'components/Text';
import triangleBack from 'assets/svg/triangle-back.svg';

import { StyledLink } from './styled';

const BackButton = ({ className, to, children }) => (
  <StyledLink to={to}>
    <Text className={className} type="button" fontWeight="bold">
      <Img src={triangleBack} alt="traingle" mr={8} mb={2} />
      {children}
    </Text>
  </StyledLink>
);

BackButton.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default BackButton;
