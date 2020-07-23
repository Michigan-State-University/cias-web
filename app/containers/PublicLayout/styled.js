import styled from 'styled-components';

import { colors, mediaQuery } from 'theme';

const SIDEBAR_WIDTH = '50vw';

export const Background = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  min-width: 100%;
  min-height: 100%;
  background: ${colors.zirkon};
  ${mediaQuery.tablet`
    flex-direction: column;
  `}
`;

export const TopBackground = styled.div`
  position: absolute;
  z-index: -1;
  background: ${colors.white};
  ${mediaQuery.tablet`
    background: transparent;
    height: 400px;
    width: 100%;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex: 0.75;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
  padding: 0 20px 30px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(227, 238, 251, 0.8);
  position: fixed;
  height: 100vh;
  width: ${SIDEBAR_WIDTH};
  justify-content: center;
  ${mediaQuery.tablet`
    background: ${colors.white};
    position: relative;
    height: auto;
    width: 100%;
    justify-content: flex-start;
    background: none;
    padding: 30px 15px;
    flex: initial;
  `}
`;

export const Logo = styled.img`
  margin-bottom: 30px;
  height: 100%;
  width: 100%;
  max-height: 213px;
  max-width: 500px;
  ${mediaQuery.tablet`
    height: 97px;
    width: 101px;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;
  margin-left: ${SIDEBAR_WIDTH};
  ${mediaQuery.tablet`
    margin-left: 0;
    align-items: flex-start;
  `}
`;
