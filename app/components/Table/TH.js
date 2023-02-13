import { style, padding } from 'components/BaseComponentStyles';
import styled from 'styled-components';

const TH = styled.th`
  width: ${(props) => props.width};
  ${padding};
  ${style};
`;

TH.defaultProps = {
  width: '120px',
};

export { TH };
