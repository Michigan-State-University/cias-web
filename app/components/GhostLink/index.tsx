import React from 'react';

import { EmptyAnchor } from './styled';

interface Props {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  children: React.ReactNode;
  width?: string | number;
  disabled?: boolean;
}

const GhostLink = ({ disabled, href, children, target, width }: Props) => {
  const preventDefault = (e: any) => {
    if (disabled) {
      e.preventDefault();
    }
  };
  return (
    <EmptyAnchor
      onClick={preventDefault}
      href={href}
      target={target}
      width={width}
      disabled={disabled}
    >
      {children}
    </EmptyAnchor>
  );
};

export default GhostLink;
