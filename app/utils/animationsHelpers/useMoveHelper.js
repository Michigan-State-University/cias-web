import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import clamp from 'lodash/clamp';

import { elements } from 'theme';
import { characterToMoveAnimationsMap } from 'utils/animations/animationsNames';

import { animationDuration } from './constants';
import { importAnimation } from './utils';

const defaultCurrent = {
  clientWidth: elements.draggableContainerSize,
  clientHeight: elements.draggableContainerSize,
};

const useMoveHelper = (
  animationContainer,
  blocks,
  dispatchUpdate,
  character,
) => {
  const [scaleFactor, setScaleFactor] = useState({ x: 1, y: 1 });

  const loadedMoveAnimations = useRef([]);

  const clampPosition = (value) => clamp(value, 0, Number.MAX_SAFE_INTEGER);

  const getScaledPosition = (scale, position) => {
    const { clientWidth, clientHeight } = animationContainer || defaultCurrent;
    return {
      x: clampPosition(Math.min(position.x * scale.x, clientWidth - 100)),
      y: clampPosition(Math.min(position.y, clientHeight - 100)),
    };
  };

  const getScaleFactor = () => {
    const { clientWidth, clientHeight } = animationContainer || defaultCurrent;
    const containerWidthWithBorders = clientWidth + 2;
    const containerHeightWithBorders = clientHeight + 2;
    const scaleX = Math.min(
      1,
      containerWidthWithBorders / elements.draggableContainerSize,
    );
    const scaleY = Math.min(
      1,
      containerHeightWithBorders / elements.draggableContainerSize,
    );
    return { x: scaleX, y: scaleY };
  };

  const getInitialAnimationPosition = (firstBlock) => {
    if (!firstBlock) return elements.characterInitialPosition;
    return getScaledPosition(getScaleFactor(), firstBlock.endPosition);
  };

  const [animationPos, setAnimationPos] = useState(
    getInitialAnimationPosition(blocks[0]),
  );

  useEffect(() => {
    const newScaleFactor = getScaleFactor();
    setScaleFactor(newScaleFactor);
  }, []);

  const loadMoveAnimations = async () => {
    const moveAnimations = [];
    if (blocks.length) {
      await Promise.all(
        characterToMoveAnimationsMap[character].map(async (animation) => {
          const data = importAnimation(character, 'standStill');
          moveAnimations.push({
            name: animation,
            animationData: data,
          });
        }),
      );
    }
    return moveAnimations;
  };

  const fetchMoveAnimations = async () => {
    loadedMoveAnimations.current = await loadMoveAnimations();
  };

  const setPosition = (position) =>
    setAnimationPos(getScaledPosition(scaleFactor, position));

  const findMoveAnimation = (position) => (anim) => {
    const direction =
      getScaledPosition(scaleFactor, position).x > animationPos.x
        ? 'Left'
        : 'Right';
    return anim.name === `move${direction}`;
  };

  const moveAnimation = async (nextBlock) => {
    if (!nextBlock) return;
    const { endPosition } = nextBlock;
    if (isEqual(getScaledPosition(scaleFactor, endPosition), animationPos))
      return;
    const moveAnim = loadedMoveAnimations.current.find(
      findMoveAnimation(endPosition),
    );
    dispatchUpdate({
      currentData: moveAnim,
    });
    setPosition(endPosition);
    await new Promise((r) => setTimeout(r, animationDuration + 100));
  };

  return { animationPos, moveAnimation, fetchMoveAnimations };
};

export default useMoveHelper;
