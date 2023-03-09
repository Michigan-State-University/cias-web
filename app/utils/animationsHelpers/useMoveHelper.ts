import { useState, useRef, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

import { elements } from 'theme';

import { CHARACTER_CONFIGS, CharacterType } from 'models/Character';

import { characterToMoveAnimationsMap } from 'utils/animations/animationsNames';
import { NarratorBlock, MoveAnimation } from 'models/Narrator';
import { Point2D, ScaleFactor2D } from 'global/types/math';

import { animationDuration } from './constants';
import { clampPosition, getScaleFactor, importAnimation } from './utils';
import { ILoadedMoveData } from './types';

const defaultContainer = {
  clientWidth: elements.draggableContainerSize,
  clientHeight: elements.draggableContainerSize,
};

type TUseMoveHelper = (
  animationContainer: Nullable<
    Pick<HTMLElement, 'clientWidth' | 'clientHeight'>
  >,
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
  const { clientWidth, clientHeight } = animationContainer || defaultContainer;

  const scaleFactor = useMemo<ScaleFactor2D>(
    () => getScaleFactor(clientWidth, clientHeight),
    [clientWidth, clientHeight],
  );

  const loadedMoveAnimations = useRef<ILoadedMoveData[]>([]);

  const getScaledPosition = (
    scale: ScaleFactor2D,
    position: Point2D,
  ): Point2D => {
    const { height, width } = CHARACTER_CONFIGS[character].size;
    return {
      x: clampPosition(Math.min(position.x * scale.x, clientWidth - width)),
      y: clampPosition(Math.min(position.y, clientHeight - height)),
    };
  };

  const [animationPos, setAnimationPos] = useState<Point2D>(() => {
    const firstBlock = blocks[0];
    if (!firstBlock) return elements.characterInitialPosition;
    return getScaledPosition(scaleFactor, firstBlock.endPosition);
  });

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

  const moveAnimation = async (nextBlock: Nullable<NarratorBlock>) => {
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
