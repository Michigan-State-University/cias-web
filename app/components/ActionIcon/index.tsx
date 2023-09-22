/**
 *
 * ActionIcon
 *
 */

import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import Icon from 'components/Icon';
import { LayoutProps, MarginProps } from 'components/BaseComponentStyles';

import cross from 'assets/svg/cross.svg';

import { CrossLink, CrossButton } from './styled';
import messages from './messages';

type Props = PropsWithChildren<{
  to?: string;
  onClick?: MouseEventHandler;
  iconSrc: SVGElement;
  ariaText: string;
}> &
  LayoutProps &
  MarginProps &
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

  const icon = <Icon src={iconSrc} alt={ariaText} />;
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
