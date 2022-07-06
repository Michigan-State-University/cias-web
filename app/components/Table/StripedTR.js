import styled from 'styled-components';
import PropTypes from 'prop-types';
import { borders, hexToRgb } from 'theme';
import { colors } from 'theme/colors';
import { TR } from './TR';
import { TBody } from './TBody';

const StripedTR = styled(TR)`
  cursor: ${({ cursor }) => cursor || 'default'};

  ${TBody} &:nth-child(${(props) => props.stripesPlacement}) {
    background: ${(props) =>
      props.color ? props.color : `rgba(${hexToRgb(colors.jungleGreen)}, 0.1)`};

    td,
    th {
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

  &:hover {
    background: ${(props) => props.hoverBg && props.hoverBg} !important;
  }

  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bg}; ;
`;

StripedTR.propTypes = {
  stripesPlacement: PropTypes.string,
  textColor: PropTypes.string,
};

StripedTR.defaultProps = {
  stripesPlacement: 'even',
  textColor: colors.black,
};

export { StripedTR };
