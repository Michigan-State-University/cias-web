import React from 'react';

import { EmptyAnchor } from './styled';

interface Props {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  children: React.ReactNode;
}

const GhostLink = ({ href, children, target }: Props) => (
  <EmptyAnchor href={href} target={target}>
    {children}
  </EmptyAnchor>
);

export default GhostLink;
