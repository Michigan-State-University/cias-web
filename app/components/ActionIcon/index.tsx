/**
 *
 * ActionIcon
 *
 */

import React, { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import Icon from 'components/Icon';

import cross from 'assets/svg/cross.svg';

import { CrossLink, CrossButton } from './styled';
import messages from './messages';

type Props = PropsWithChildren<{
  to?: string;
  onClick?: () => void;
  iconSrc: SVGElement;
  ariaText: string;
}> &
  Record<string, unknown>;

const ActionIcon = ({
  to,
  onClick,
  iconSrc = cross,
  ariaText,
  children,
  ...restProps
}: Props) => {
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
        {children}
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
        {children}
      </CrossButton>
    );
  return null;
};

export default ActionIcon;
