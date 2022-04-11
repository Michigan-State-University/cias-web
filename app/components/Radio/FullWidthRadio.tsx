import { ComponentProps, FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import Radio from './Radio';

// @ts-ignore
const FullWidthRadio: FunctionComponent<ComponentProps<typeof Radio>> = styled(
  Radio,
)`
  width: 100% !important;
`;

export default FullWidthRadio;
