import styled from 'styled-components';
import PropTypes from 'prop-types';

import Box from 'components/Box/index';

import { colors, hexToRgb } from 'theme';

const FogBox = styled(Box)`
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background-image: linear-gradient(
      to ${({ side }) => side},
      rgba(${hexToRgb(colors.zirkon)}, 0),
      rgba(${hexToRgb(colors.zirkon)}, 0.8) 50%
    );
  }
`;

FogBox.propTypes = {
  side: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
};

const horizontalStyles = { height: '100%', width: '4em' };
const verticalStyles = { height: '4em', width: '100%' };

export const RightFog = styled(FogBox).attrs({ side: 'right' })`
  &:after {
    ${horizontalStyles};
    right: ${({ rightMargin }) => rightMargin || 0}px;
  }
`;

export const LeftFog = styled(FogBox).attrs({ side: 'left' })`
  &:after {
    ${horizontalStyles};
    left: ${({ leftMargin }) => leftMargin || 0}px;
  }
`;

export const TopFog = styled(FogBox).attrs({ side: 'top' })`
  &:after {
    ${verticalStyles};

    top: ${({ topMargin }) => topMargin || 0}px;
  }
`;

export const BottomFog = styled(FogBox).attrs({ side: 'bottom' })`
  &:after {
    ${verticalStyles};
    bottom: ${({ bottomMargin }) => bottomMargin || 0}px;
  }
`;
