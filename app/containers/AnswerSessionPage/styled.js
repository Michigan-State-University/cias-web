import styled, { css } from 'styled-components';

import { Button } from 'components/Button';
import { sizes, DESKTOP_MODE } from 'utils/previewMode';
import { elements, colors, mediaQuery } from 'theme';

export const StyledButton = styled(Button)`
  width: ${({ isDesktop }) => (isDesktop ? '40%' : '80%')};
  ${mediaQuery.mobile`
    width: 80%;
  `}
`;

export const BackButton = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;

export const AnswerInterventionContent = styled.div`
  align-items: flex-start;
  display: flex;
  position: relative;
`;

export const ScreenWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  max-width: ${(props) =>
    props.isFullSize ? '100%' : `${elements.draggableContainerSize}px`};
  min-height: ${elements.draggableContainerSize}px;
  position: relative;
  width: 100%;
  height: fit-content;
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
`;
