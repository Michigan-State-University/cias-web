import React, { PropsWithChildren } from 'react';

import H2 from 'components/H2';

import { SectionHeaderContainer } from './styled';

export type Props = PropsWithChildren<{ title: string }> &
  Record<string, unknown>;

const SectionHeader = ({ title, children, ...containerProps }: Props) => (
  <SectionHeaderContainer {...containerProps}>
    <H2>{title}</H2>
    {children}
  </SectionHeaderContainer>
);

export default SectionHeader;
