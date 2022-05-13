import { ComponentProps, FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Handle } from 'react-flow-renderer';

import { colors } from 'theme';

// !important used to override library styles
export const TargetHandle: FunctionComponent<
  ComponentProps<typeof Handle>
  // @ts-ignore
> = styled(Handle)`
  opacity: 0;
  cursor: default !important;
`;

interface SourceHandleProps extends ComponentProps<typeof Handle> {
  color: string;
}

// @ts-ignore
export const SourceHandle: FunctionComponent<SourceHandleProps> = styled(
  Handle,
)`
  cursor: default !important;
  background: ${colors.white} !important;
  border-color: ${({ color }: SourceHandleProps) => color} !important;
  border-width: 2px !important;
  width: 10px !important;
  height: 10px !important;
`;
