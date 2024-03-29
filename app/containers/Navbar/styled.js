import styled from 'styled-components';

import Row from 'components/Row';
import Comment from 'components/Comment';

import { elements, colors, hexToRgb, ZIndex, mediaQuery } from 'theme';
import { maxQueries } from 'components/Container/mediaQuery';

export const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: ${ZIndex.NAVBAR};
`;

export const NavbarStyled = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(227, 238, 251, 0.8);
  display: flex;
  align-items: center;
  height: ${elements.navbarHeight}px;

  gap: 24px;
  @media ${maxQueries.sm} {
    gap: 16px;
  }

  .user-name-info {
    white-space: nowrap;
    @media ${maxQueries.md} {
      display: none;
    }
  }
`;

export const RightPanel = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  @media ${maxQueries.sm} {
    gap: 16px;
  }
  flex-shrink: 0;
`;

export const DropDownContent = styled.div`
  position: absolute;
  right: 0;
  min-width: 150px;
  top: calc(100% + 5px);
  background-color: ${colors.white};
  text-align: center;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 0px 50px rgba(${hexToRgb(colors.black)}, 0.08);
  padding: 16px;
`;

export const StyledComment = styled(Comment)`
  color: ${colors.bluewood};

  &::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

export const StyledRow = styled(Row)`
  cursor: pointer;
  white-space: nowrap;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  a {
    color: black !important;
    text-decoration: none !important;
  }

  &:hover {
    ${StyledComment} {
      font-weight: bold;
    }

    a {
      color: black !important;
      text-decoration: none !important;
    }
  }
`;

export const DropDownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const MSULogoContainer = styled.div`
  ${mediaQuery.mobile`
    display: none
  `}
`;
