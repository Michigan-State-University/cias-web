import { elements } from 'theme';
import { useState, useEffect, useRef } from 'react';
import { moveAnimations as moveAnimationsNames } from 'utils/animations/animationsNames';
import isEqual from 'lodash/isEqual';
import { animationDuration } from '../components/styled';

const defaultCurrent = {
  clientWidth: elements.draggableContainerSize,
  clientHeight: elements.draggableContainerSize,
};

const useMoveHelper = (animationContainer, blocks, dispatchUpdate) => {
  const [scaleFactor, setScaleFactor] = useState({ x: 1, y: 1 });

  const loadedMoveAnimations = useRef([]);

  const getScaledPosition = (scale, position) => {
    const { clientWidth, clientHeight } = animationContainer || defaultCurrent;
    return {
      x: Math.min(position.x * scale.x, clientWidth - 100),
      y: Math.min(position.y, clientHeight - 100),
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

  const getInitialAnimationPosition = firstBlock => {
    if (!firstBlock) return { x: 0, y: elements.peedyInitialYPosition };
    return getScaledPosition(getScaleFactor(), firstBlock.position.posTo);
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
        moveAnimationsNames.map(async animation => {
          const data = await import(`assets/animations/${animation}.json`);
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

  const setPosition = posTo =>
    setAnimationPos(getScaledPosition(scaleFactor, posTo));

  const findMoveAnimation = posTo => anim => {
    const direction =
      getScaledPosition(scaleFactor, posTo).x > animationPos.x
        ? 'Left'
        : 'Right';
    return anim.name === `move${direction}`;
  };

  const moveAnimation = async nextBlock => {
    if (!nextBlock) return;
    const {
      position: { posTo },
    } = nextBlock;
    if (isEqual(getScaledPosition(scaleFactor, posTo), animationPos)) return;
    const moveAnim = loadedMoveAnimations.current.find(
      findMoveAnimation(posTo),
    );
    dispatchUpdate({
      currentData: moveAnim,
    });
    setPosition(posTo);
    await new Promise(r => setTimeout(r, animationDuration + 100));
  };

  return { animationPos, moveAnimation, fetchMoveAnimations };
};

export default useMoveHelper;
