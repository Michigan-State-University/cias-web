import { useState } from 'react';

import { elements } from 'theme';

import { useCallbackRef } from './useCallbackRef';

const defaultOptions = {
  bottomMargin: 15,
  topMargin: 15,
  minHeight: 250,
  maxHeight: 350,
};

/**
 * @param {React.MutableRefObject} referencePointRef
 * @param {{bottomMargin: number, topMargin: number, minHeight: number, maxHeight: number}} options
 * @returns {{ref: React.MutableRefObject,
 * positionData: {visible: boolean, top: string, maxHeight: string, bottom: string},
 * callbackRef: (function(React.MutableRefObject))}}
 */
export const useDropdownPositionHelper = (referencePointRef, options = {}) => {
  const { bottomMargin, topMargin, maxHeight, minHeight } = {
    ...defaultOptions,
    ...options,
  };
  const [positionData, setPositionData] = useState({
    top: 'initial',
    bottom: 'initial',
    visible: false,
    maxHeight: `${maxHeight}px`,
  });

  const { ref, callbackRef } = useCallbackRef(node => {
    if (node && referencePointRef && referencePointRef.current) {
      const nodeRect = node.getBoundingClientRect();
      const referencePointRect = referencePointRef.current.getBoundingClientRect();

      const nodeBottomPosition =
        referencePointRect.bottom + nodeRect.height + bottomMargin;
      const windowHeight = window.innerHeight;

      const spaceAtBottom =
        windowHeight - referencePointRect.bottom - topMargin - bottomMargin;

      const spaceAtTop =
        referencePointRect.top -
        topMargin -
        bottomMargin -
        elements.navbarHeight;

      if (
        nodeBottomPosition <= windowHeight ||
        spaceAtBottom >= minHeight + topMargin + bottomMargin
      ) {
        setPositionData({
          top: 'initial',
          bottom: 'initial',
          visible: true,
          maxHeight: `${Math.min(maxHeight, spaceAtBottom)}px`,
        });
      } else {
        setPositionData({
          top: 'initial',
          bottom: `${referencePointRef.current.offsetHeight + bottomMargin}px`,
          visible: true,
          maxHeight: `${Math.min(maxHeight, spaceAtTop)}px`,
        });
      }
    } else setPositionData({ ...positionData, visible: false });
  });

  return { ref, callbackRef, positionData };
};
