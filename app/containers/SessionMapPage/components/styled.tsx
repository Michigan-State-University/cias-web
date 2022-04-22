import { ComponentProps, FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import { colors } from 'theme';
import Column from 'components/Column';

export const QuestionDetailsColumn: FunctionComponent<
  ComponentProps<typeof Column>
  // @ts-ignore
> = styled(Column)`
  border: 1px solid ${colors.linkWater};
  height: 100%;
  padding: 39px 20px 19px 20px;
  background: ${colors.white};
`;
