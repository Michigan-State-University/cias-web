import styled from 'styled-components';

const TR = styled.tr`
  height: ${(props) => (props.height ? `${props.height}px` : '47.5px')};
`;

export { TR };
