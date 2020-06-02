import styled from 'styled-components';
import PropTypes from 'prop-types';
import { themeColors, borders, paddings, hexToRgb } from 'theme';
import { margin, layout } from '../BaseComponentStyles';
import { colors } from '../../theme/colors';
import { TBody } from './TBody';

const TR = styled.tr`
  ${TBody} &:nth-child(even) {
    background: rgba(${hexToRgb(colors.jungleGreen)}, 0.1);
  }
`;

TR.propTypes = {};

TR.defaultProps = {};

export { TR };
