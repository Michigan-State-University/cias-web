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

import { themeColors } from 'theme';
import { StyledLink } from './styled';

const BackButton = ({ className, to, children }) => (
  <StyledLink to={to}>
    <Img src={triangleBack} alt="traingle" mr={8} mb={2} />
    <Text className={className} color={themeColors.secondary} fontWeight="bold">
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
