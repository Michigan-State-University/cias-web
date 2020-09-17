/**
 *
 * CloseIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import cross from 'assets/svg/cross.svg';
import { CrossLink, CrossButton } from './styled';

const CloseIcon = ({ to, onClick, ...restProps }) => {
  const icon = <Icon src={cross} alt="cross" />;
  if (to) return <CrossLink to={to}>{icon}</CrossLink>;
  if (onClick)
    return (
      <CrossButton onClick={onClick} {...restProps}>
        {icon}
      </CrossButton>
    );
  return null;
};

CloseIcon.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default CloseIcon;
