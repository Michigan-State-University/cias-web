import styled from 'styled-components';
import { Container } from 'react-grid-system';

import { colors, themeColors, paddings, boxShadows } from 'theme';
import Box from 'components/Box';

export const Tab = styled.div`
  position: relative;
  bottom: -3px;
  margin: 0 10px;
  padding-bottom: 7px;
  border-bottom-width: 2px;
  border-bottom-color: ${themeColors.secondary};
  border-bottom-style: ${({ isActive }) => (isActive ? 'solid' : 'none')};

  div {
    cursor: pointer;
  }

  a {
    color: ${({ isActive }) =>
      isActive ? themeColors.text : colors.grey} !important;
    text-decoration: none;
  }

  a:visited,
  a:hover {
    color: ${themeColors.text};
  }
`;

export const Spacer = styled.div`
  height: 1px;
  width: calc(100% + ${paddings.regular} * 2);
  margin-left: -${paddings.regular};
  background-color: ${colors.linkWater};
`;

export const ReportHeader = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: 0;
`;

export const SectionTitle = styled.div.attrs({ dir: 'auto' })`
  font-size: 13px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0;
  ${({ isSelected }) => isSelected && { color: themeColors.secondary }};
`;

export const SectionText = styled.p.attrs({ dir: 'auto' })`
  font-size: 15px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0;
  vertical-align: top;
  text-align: justify;
  margin: 0;
  ${({ isSelected }) => isSelected && { color: themeColors.secondary }};
`;

export const SectionContainer = styled(Container)`
  margin-bottom: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const CardBox = styled(Box)`
  width: 100%;
  background-color: ${colors.white};
  padding: 30px;
  box-shadow: ${boxShadows.selago};
`;
