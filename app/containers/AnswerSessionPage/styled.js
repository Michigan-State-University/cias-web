import styled, { css } from 'styled-components';

import { elements, colors, mediaQuery, themeColors } from 'theme';
import { sizes, DESKTOP_MODE } from 'utils/previewMode';

import { Button } from 'components/Button';
import GhostLink from 'components/GhostLink';

export const StyledButton = styled(Button)`
  width: ${({ isDesktop }) => (isDesktop ? '40%' : '80%')};
  ${mediaQuery.mobile`
    width: 80%;
  `}
`;

export const StyledGhostLink = styled(GhostLink)`
  width: ${({ isDesktop }) => (isDesktop ? '40%' : '80%')};
  ${mediaQuery.mobile`
    width: 80%;
  `}
`;

export const AnswerInterventionContent = styled.div`
  align-items: flex-start;
  display: flex;
  position: relative;
  flex-grow: 1;
`;

export const ScreenWrapper = styled.div`
  display: flex;
  max-width: ${(props) =>
    props.isFullSize ? '100%' : `${elements.draggableContainerSize}px`};
  position: relative;
  width: 100%;
  flex-grow: 1;
`;

const getStyles = (previewMode) => css`
  height: ${sizes[previewMode].height};
  width: ${sizes[previewMode].width};
  ${previewMode !== DESKTOP_MODE &&
  `overflow: auto;
     border: 1px solid ${colors.casper};`}
`;

export const AnswerOuterContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: ${(props) =>
    props.interventionStarted ? 'flex-start' : 'center'};
  width: 100%;
  max-width: ${(props) =>
    props.isFullSize ? '100%' : `${elements.draggableContainerSize}px`};
  ${(props) => props.previewMode && getStyles(props.previewMode)}
  background-color: ${themeColors.sessionBackground}
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 16px;
  width: 100%;
  height: ${elements.answerSessionPageFooterHeight}px;
  padding-top: 16px;
  padding-right: 8px;
  padding-bottom: 8px;
  ${({ isMobilePreview }) =>
    isMobilePreview
      ? css`
          padding-left: 14px;
        `
      : css`
          padding-left: 90px;
        `};
}
`;
