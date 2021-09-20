/**
 *
 * ActionIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import cross from 'assets/svg/cross.svg';

import Icon from 'components/Icon';

import { CrossLink, CrossButton } from './styled';
import messages from './messages';

const ActionIcon = ({ to, onClick, iconSrc, ariaText, ...restProps }) => {
  const { formatMessage } = useIntl();

  const icon = <Icon src={iconSrc} alt="cross" />;
  if (to)
    return (
      <CrossLink
        data-cy="back-intervention-button"
        to={to}
        title={ariaText ?? formatMessage(messages.defaultCrossButtonText)}
        aria-label={ariaText ?? formatMessage(messages.defaultCrossButtonText)}
        {...restProps}
      >
        {icon}
      </CrossLink>
    );
  if (onClick)
    return (
      <CrossButton
        onClick={onClick}
        title={ariaText ?? formatMessage(messages.defaultCrossButtonText)}
        aria-label={ariaText ?? formatMessage(messages.defaultCrossButtonText)}
        {...restProps}
      >
        {icon}
      </CrossButton>
    );
  return null;
};

ActionIcon.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  iconSrc: PropTypes.any,
  ariaText: PropTypes.string,
};

ActionIcon.defaultProps = {
  iconSrc: cross,
};

export default ActionIcon;
