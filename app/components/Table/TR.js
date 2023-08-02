import styled from 'styled-components';

const TR = styled.tr`
  height: ${({ height }) => {
    if (height === 'auto') return height;
    return height ? `${height}px` : '47.5px';
  }};
`;

export { TR };
