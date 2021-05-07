import styled from 'styled-components';

import { colors, fontWeights, paddings } from 'theme';

import InputComponent from './InputComponent';

const TransparentFormikInput = styled(InputComponent)`
  input {
    margin-bottom: 0;
    background-color: transparent;
    border-color: transparent;
    margin-left: -${paddings.small};
  }

  p {
    color: ${colors.grey};
    font-weight: ${fontWeights.bold};
  }
`;

export default TransparentFormikInput;
