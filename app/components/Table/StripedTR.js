import styled from 'styled-components';
import PropTypes from 'prop-types';
import { borders, hexToRgb } from 'theme';
import { colors } from '../../theme/colors';
import { TR } from './TR';
import { TBody } from './TBody';

const StripedTR = styled(TR)`
  ${TBody} &:nth-child(${props => props.stripesPlacement}) {
    td,
    th {
      background: rgba(${hexToRgb(colors.jungleGreen)}, 0.1);

      &:first-child {
        border-bottom-left-radius: ${borders.borderRadius};
        border-top-left-radius: ${borders.borderRadius};
      }

      &:last-child {
        border-bottom-right-radius: ${borders.borderRadius};
        border-top-right-radius: ${borders.borderRadius};
      }
    }
  }
`;

StripedTR.propTypes = {
  stripesPlacement: PropTypes.string,
};

StripedTR.defaultProps = {
  stripesPlacement: 'even',
};

export { StripedTR };
