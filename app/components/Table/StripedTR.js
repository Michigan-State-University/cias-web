import styled from 'styled-components';
import PropTypes from 'prop-types';

import { borders, hexToRgb } from 'theme';
import { colors } from 'theme/colors';

import { TR } from './TR';
import { margin } from '../BaseComponentStyles';

const StripedTR = styled(TR).attrs((props) => ({
  stripesPlacement: props.stripesPlacement || 'even',
  textColor: props.textColor || colors.black,
}))`
  cursor: ${({ cursor }) => cursor || 'default'};

  :nth-child(${(props) => props.stripesPlacement}) {
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
  background-color: ${(props) => props.bg};

  ${margin};
`;

StripedTR.propTypes = {
  stripesPlacement: PropTypes.string,
  textColor: PropTypes.string,
};

export { StripedTR };
