import styled from 'styled-components';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import arrow from 'assets/svg/arrow-down-select.svg';

import { themeColors } from 'theme';

export const StyledSortableTree = styled(SortableTree)`
  .rst__rowContents {
    border: initial;
    box-shadow: initial;
    background-color: initial;
    padding: 10px;
    min-width: auto;
  }

  .rst__rowContentsDragDisabled {
    border: initial;
  }

  .rst__node {
    .rst__collapseButton,
    .rst__expandButton,
    .rst__collapseButton:hover:not(:active),
    .rst__expandButton:hover:not(:active) {
      cursor: pointer;
      transform: rotate(180deg);
      left: initial !important;
      right: -15px;
      z-index: 1;
      background: initial;
      background-image: url("${arrow}");
      background-repeat: inherit;
      box-shadow: none;
      border-radius: unset;
      width: 13px;
      height: 8px;
      transition: transform 0.2s;
    }

    .rst__expandButton,
    .rst__expandButton:hover:not(:active) {
      transform: initial;
    }

    &:first-child {
      .rst__lineBlock {
        display: none;
      }

      .rst__nodeContent {
        button.rst__collapseButton {
          display: none;
        }
      }
    }
  }

  .rst__lineFullVertical::before,
  .rst__lineFullVertical::after,
  .rst__lineChildren::after,
  .rst__lineHalfVerticalBottom::before,
  .rst__lineHalfVerticalBottom::after,
  .rst__lineHalfHorizontalRight::before,
  .rst__lineHalfHorizontalRight::after,
  .rst__lineHalfVerticalTop::before,
  .rst__lineHalfVerticalTop::after {
    background-color: ${themeColors.secondary};
  }

  // horizontal lines
  .rst__lineHalfHorizontalRight::before {
    height: 2px;
  }

  // vertical lines
  .rst__lineFullVertical::after,
  .rst__lineChildren::after,
  .rst__lineHalfVerticalTop::after {
    width: 2px;
  }
`;
