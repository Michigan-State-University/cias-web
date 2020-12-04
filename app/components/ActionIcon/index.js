/**
 *
 * ActionIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import cross from 'assets/svg/cross.svg';
import { CrossLink, CrossButton } from './styled';

const ActionIcon = ({ to, onClick, iconSrc, ...restProps }) => {
  const icon = <Icon src={iconSrc} alt="cross" />;
  if (to)
    return (
      <CrossLink data-cy="back-intervention-button" to={to}>
        {icon}
      </CrossLink>
    );
  if (onClick)
    return (
      <CrossButton onClick={onClick} {...restProps}>
        {icon}
      </CrossButton>
    );
  return null;
};

ActionIcon.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  iconSrc: PropTypes.any,
};

ActionIcon.defaultProps = {
  iconSrc: cross,
};

export default ActionIcon;
