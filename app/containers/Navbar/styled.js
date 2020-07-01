import styled from 'styled-components';

import { colors, elements } from 'theme';
export const NavbarStyled = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(227, 238, 251, 0.8);
  display: flex;
  align-items: center;
  z-index: 10;
  height: ${elements.navbarHeight}px;
`;

export const RightPanel = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
`;

export const CrossContainer = styled.div`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.linkWater};
  margin-right: 35px;
  cursor: pointer;
`;

export const DropDownContent = styled.div`
  position: absolute;
  min-width: 150px;
  top: calc(100% + 5px);
  border: 1px solid black;
  background-color: #ececec;
  text-align: center;
  color: black;
  border-radius: 10px;
  div {
    padding: 5px 0;
    cursor: pointer;
    border-bottom: 1px solid black;
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const DropDownContainer = styled.div`
  position: relative;
`;
