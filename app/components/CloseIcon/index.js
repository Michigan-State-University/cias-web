/**
 *
 * CloseIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import cross from 'assets/svg/cross.svg';

import { CrossLink, CrossButton } from './styled';

const CloseIcon = ({ to, onClick }) => {
  const img = <Img src={cross} alt="cross" />;
  if (to) return <CrossLink to={to}>{img}</CrossLink>;
  if (onClick) return <CrossButton onClick={onClick}>{img}</CrossButton>;
  return null;
};

CloseIcon.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default CloseIcon;
