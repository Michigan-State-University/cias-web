import { style } from 'components/BaseComponentStyles';
import styled from 'styled-components';

const TH = styled.th`
  width: ${props => props.width};
  ${style};
`;

TH.defaultProps = {
  width: '120px',
};

export { TH };
