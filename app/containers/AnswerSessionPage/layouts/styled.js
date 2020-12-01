import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

import { themeColors } from 'theme';

import AppSlider from 'components/AppSlider';
import { TH } from 'components/Table';

const aspectRatio = 9 / 16;

export const PlayerWrapper = styled.div`
  margin-top: 22px;
  position: relative;
  padding-top: ${aspectRatio * 100}%;
  height: 100%;
  width: 100%;
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

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
`;

export const FirstTH = styled(TH)`
  position: sticky;
  left: 0;
  background-color: inherit;
`;
