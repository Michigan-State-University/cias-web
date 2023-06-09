import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { themeColors, ZIndex } from 'theme';

import AppSlider from 'components/AppSlider';
import { TH } from 'components/Table';

export const ImageWrapper = styled.div`
  height: 100%;
  max-width: 100%;
`;

export const ValueSliderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  border: none;
  color: ${themeColors.secondary};
  font-weight: 600;
`;

export const ValueSliderWrapperStyled = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const CustomSlider = styled(AppSlider)`
  .rc-slider-step {
    .rc-slider-dot:not(:first-child):not(:last-child) {
      visibility: hidden;
    }
  }

  &.rc-slider-disabled {
    background-color: transparent;
  }

  ${({ withSpectrum }) =>
    !withSpectrum && {
      '.rc-slider-handle': { visibility: 'hidden' },
      '.rc-slider-track': { visibility: 'hidden' },
    }}
  .rc-slider-mark-text {
    word-break: normal;
    word-wrap: break-word;
    width: max-content;
  }

  &.wrap-text {
    .rc-slider-mark-text {
      max-width: 70px;
    }
  }
`;

export const VisualAnalogueSlider = styled(AppSlider)`
  .rc-slider-mark-text {
    word-break: normal;
    word-wrap: break-word;
    width: max-content;
    color: #666;
  }

  &.wrap-text {
    .rc-slider-mark-text {
      max-width: 70px;
    }
  }
`;

export const FirstTH = styled(TH)`
  z-index: ${ZIndex.GRID_QUESTION_LAYOUT_TH};
  background-color: inherit;
  text-align: left;
  word-break: normal;
  word-wrap: break-word;
`;

export const StyledLink = styled(Link)`
  font-weight: bold;
  width: auto;
`;

export const TlfbContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
