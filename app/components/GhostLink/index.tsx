import React, { CSSProperties, PropsWithChildren } from 'react';
import { LinkProps } from 'react-router-dom';

import { DisabledLink, EmptyAnchor } from './styled';

type Props = PropsWithChildren<{
  width?: CSSProperties['width'];
  disabled?: boolean;
}> &
  Partial<Pick<LinkProps, 'to' | 'href' | 'target'>>;

const GhostLink = ({ disabled, children, ...props }: Props) => {
  if (disabled) {
    return <DisabledLink {...props}>{children}</DisabledLink>;
  }

  return (
    <EmptyAnchor disabled={disabled} {...props}>
      {children}
    </EmptyAnchor>
  );
};

export default GhostLink;
