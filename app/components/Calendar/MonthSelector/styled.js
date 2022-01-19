import Icon from 'components/Icon';
import styled from 'styled-components';
import { colors } from 'theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  margin-bottom: 32px;
`;

export const Arrow = styled(Icon).attrs((props) => ({
  stroke: props.disabled ? colors.lightGrey : colors.blackCoral,
}))`
  ${({ disabled }) => !disabled && 'cursor: pointer;'}
`;

export const Month = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

export const Year = styled.span`
  font-size: 20px;
  line-height: 20px;
`;
