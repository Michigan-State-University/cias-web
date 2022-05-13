import { FunctionComponent, MutableRefObject } from 'react';
// @ts-ignore
import styled from 'styled-components';

type ScrollbarContainerProps = {
  horizontal?: boolean;
  containerThickness: number;
  ref: MutableRefObject<Nullable<HTMLDivElement>>;
};

// @ts-ignore
export const ScrollbarContainer: FunctionComponent<ScrollbarContainerProps> = styled.div`
  height: ${({ horizontal, containerThickness }: ScrollbarContainerProps) =>
    horizontal ? `${containerThickness}px` : '100%'};
  width: ${({ horizontal, containerThickness }: ScrollbarContainerProps) =>
    !horizontal ? `${containerThickness}px` : '100%'};
  position: relative;
  display: flex;
  flex-direction: ${({ horizontal }: ScrollbarContainerProps) =>
    horizontal ? 'column' : 'row'};
  justify-content: flex-end;
`;
