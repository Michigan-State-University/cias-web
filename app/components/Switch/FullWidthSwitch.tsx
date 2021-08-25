import { ComponentProps, FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import Switch from './Switch';

const FullWidthSwitch: FunctionComponent<
  ComponentProps<typeof Switch>
  // @ts-ignore
> = styled(Switch)`
  width: 100% !important;
`;

export default FullWidthSwitch;
