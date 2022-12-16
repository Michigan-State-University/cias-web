import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import clamp from 'lodash/clamp';

import { elements } from 'theme';

import { CHARACTER_CONFIGS, CharacterType } from 'models/Character';

import { characterToMoveAnimationsMap } from 'utils/animations/animationsNames';
import { NarratorBlock, MoveAnimation } from 'models/Narrator';
import { Point2D } from 'global/types/math';

import { animationDuration } from './constants';
import { importAnimation } from './utils';
import { ILoadedMoveData } from './types';

const defaultCurrent = {
  clientWidth: elements.draggableContainerSize,
  clientHeight: elements.draggableContainerSize,
};

type TUseMoveHelper = (
  animationContainer: HTMLElement,
  blocks: NarratorBlock[],
  dispatchUpdate: (state: { currentData: Nullable<ILoadedMoveData> }) => void,
  character: CharacterType,
) => {
  animationPos: Point2D;
  moveAnimation: (nextBlock: NarratorBlock) => Promise<void>;
  fetchMoveAnimations: () => Promise<void>;
};

const useMoveHelper: TUseMoveHelper = (
  animationContainer,
  blocks,
  dispatchUpdate,
  character,
) => {
  const [scaleFactor, setScaleFactor] = useState({ x: 1, y: 1 });

  const loadedMoveAnimations = useRef<ILoadedMoveData[]>([]);

  const clampPosition = (value: number) =>
    clamp(value, 0, Number.MAX_SAFE_INTEGER);

  const getScaledPosition = (scale: Point2D, position: Point2D): Point2D => {
    const { clientWidth, clientHeight } = animationContainer || defaultCurrent;
    const { height, width } = CHARACTER_CONFIGS[character].size;
    return {
      x: clampPosition(Math.min(position.x * scale.x, clientWidth - width)),
      y: clampPosition(Math.min(position.y, clientHeight - height)),
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

  const getInitialAnimationPosition = (firstBlock: NarratorBlock) => {
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
    const moveAnimations: ILoadedMoveData[] = [];
    if (blocks.length) {
      await Promise.all(
        characterToMoveAnimationsMap[character].map(
          async (animation: MoveAnimation) => {
            const data = await importAnimation(character, animation);
            moveAnimations.push({
              name: animation,
              animationData: data,
            });
          },
        ),
      );
    }
    return moveAnimations;
  };

  const fetchMoveAnimations = async () => {
    loadedMoveAnimations.current = await loadMoveAnimations();
  };

  const setPosition = (position: Point2D) =>
    setAnimationPos(getScaledPosition(scaleFactor, position));

  const findMoveAnimation = (position: Point2D) => (anim: ILoadedMoveData) => {
    const direction =
      getScaledPosition(scaleFactor, position).x > animationPos.x
        ? 'Left'
        : 'Right';
    return anim.name === `move${direction}`;
  };

  const moveAnimation = async (nextBlock: NarratorBlock) => {
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