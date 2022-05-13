import styled from 'styled-components';
import { ToastContainer as ReactToastifyToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { borders, colors } from 'theme';
import Color from 'color';

export const ToastContainer = styled(ReactToastifyToastContainer)`
  .Toastify__ {
    &toast {
      border: 1px solid transparent;
      border-radius: ${borders.borderRadius};
      color: ${colors.black};

      &--info {
        background-color: ${colors.blue5};
        border-color: ${colors.blue};
      }

      &--success {
        background-color: ${colors.green10};
        border-color: ${colors.green};
      }

      &--warning {
        background-color: ${colors.orange5};
        border-color: ${colors.orange};
      }

      &--error {
        background-color: ${colors.red5};
        border-color: ${colors.red};
      }
    }

    &close-button {
      color: ${colors.black60};
      align-self: center;
    }

    &progress-bar {
      &--info {
        background-color: ${Color(colors.blue).alpha(0.7).rgb().string()};
      }

      &--success {
        background-color: ${Color(colors.green).alpha(0.7).rgb().string()};
      }

      &--warning {
        background-color: ${Color(colors.orange).alpha(0.7).rgb().string()};
      }

      &--error {
        background-color: ${Color(colors.red).alpha(0.7).rgb().string()};
      }
    }
  }
`;
