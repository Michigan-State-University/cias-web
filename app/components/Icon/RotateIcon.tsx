import { FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import Icon from './index';

export type Props = {
  $rotate: boolean;
};

// @ts-ignore
export const RotateIcon: FunctionComponent<Props> = styled(Icon)`
  transition: transform 0.4s ease;
  ${({ $rotate }: Props) => ($rotate ? 'transform: rotate(180deg);' : '')}
`;
