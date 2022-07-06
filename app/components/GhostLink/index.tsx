import React, { CSSProperties, PropsWithChildren } from 'react';
import { LinkProps } from 'react-router-dom';

import { EmptyAnchor } from './styled';

type Props = PropsWithChildren<{
  width?: CSSProperties['width'];
  disabled?: boolean;
}> &
  Partial<Pick<LinkProps, 'to' | 'href' | 'target'>>;

const GhostLink = ({ disabled, children, ...props }: Props) => {
  const preventDefault = (e: any) => {
    if (disabled) {
      e.preventDefault();
    }
  };
  return (
    <EmptyAnchor onClick={preventDefault} disabled={disabled} {...props}>
      {children}
    </EmptyAnchor>
  );
};

export default GhostLink;
