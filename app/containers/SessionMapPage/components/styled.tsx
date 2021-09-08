import { ComponentProps, FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';
import { Handle } from 'react-flow-renderer';

import { colors } from 'theme';
import Column from 'components/Column';

import { sessionMapColors } from '../constants';

// !important used to override library styles
export const TargetHandle: FunctionComponent<
  ComponentProps<typeof Handle>
  // @ts-ignore
> = styled(Handle)`
  opacity: 0;
  cursor: default !important;
`;

export const SourceHandle: FunctionComponent<
  ComponentProps<typeof Handle>
  // @ts-ignore
> = styled(Handle)`
  cursor: default !important;
  background: ${colors.white} !important;
  border-color: ${sessionMapColors.edgeBase} !important;
  border-width: 2px !important;
  width: 10px !important;
  height: 10px !important;
`;

export const QuestionDetailsColumn: FunctionComponent<
  ComponentProps<typeof Column>
  // @ts-ignore
> = styled(Column)`
  border: 1px solid ${colors.linkWater};
  height: 100%;
  padding: 39px 20px 19px 20px;
  background: ${colors.white};
`;
