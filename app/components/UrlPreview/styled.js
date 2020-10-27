import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/Text';
import H3 from 'components/H3';

export const Thumbnail = styled.div`
  background-image: url("${props => props.image}");
  background-size: cover;
  background-color: ${colors.grey};
  background-position: center;
  width: 30%;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  &:hover{
  cursor: pointer;
  }
`;

export const Url = styled.a`
  text-decoration: none !important;
  color: ${colors.bluewood};
`;

export const ClampedText = styled(Text)`
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  -o-box-orient: vertical;
  display: -webkit-box;
`;

export const ClampedTitle = styled(H3)`
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  -o-box-orient: vertical;
  display: -webkit-box;
`;
