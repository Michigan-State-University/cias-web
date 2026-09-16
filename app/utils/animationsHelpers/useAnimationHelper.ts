/* eslint-disable */
import { MutableRefObject, useMemo, useRef } from 'react';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import get from 'lodash/get';
import type { LottieRef } from 'react-lottie';

import getPause from 'utils/animations/getPause';
import { getAutoRestAnimations } from 'utils/animations/animationsNames';
import {
  BodyAutoRestAnimation,
  HeadAutoRestAnimation,
  IBodyAnimationBlock,
  IHeadAnimationBlock,
  NarratorBlock,
  NarratorBlockTypes,
} from 'models/Narrator';
import { CharacterType } from 'models/Character';

import { importAnimation } from './utils';
import { ILoadedAnimationData } from './types';

type TUseAnimationHelper = (
  blocks: NarratorBlock[],
  dispatchUpdate: (state: {
    currentData: Nullable<ILoadedAnimationData>;
    currentBlockIndex: number;
  }) => void,
  changeBlock: (currentIndex?: number) => Promise<void>,
  currentData: ILoadedAnimationData,
  character: CharacterType,
) => {
  getInitialBodyOrHeadAnimation: () => ILoadedAnimationData;
  changeAnimation: (nextBlock: NarratorBlock, nextIndex: number) => void;
  handleBodyOrHeadAnimationBlock: () => void;
  getIdleAnimation: () => ILoadedAnimationData;
  clearAnimationBlock: () => void;
  animationRef: MutableRefObject<LottieRef | undefined>;
  fetchBodyAndHeadAnimations: () => Promise<void>;
  loadedAnimations: MutableRefObject<ILoadedAnimationData[]>;
};

const useAnimationHelper: TUseAnimationHelper = (
  blocks,
  dispatchUpdate,
  changeBlock,
  currentData,
  character,
) => {
  const loadedAnimations = useRef<ILoadedAnimationData[]>([]);
  const animationRef = useRef<LottieRef>();

  const autoRestAnimations: Array<
    BodyAutoRestAnimation | HeadAutoRestAnimation
  > = useMemo(() => getAutoRestAnimations(character), [character]);

  const loadAnimations = async (): Promise<ILoadedAnimationData[]> => {
    const filteredAnimations: Array<IBodyAnimationBlock | IHeadAnimationBlock> =
      filter(
        blocks,
        ({ type }) =>
          type === NarratorBlockTypes.BODY_ANIMATION ||
          type === NarratorBlockTypes.HEAD_ANIMATION,
      ) as Array<IBodyAnimationBlock | IHeadAnimationBlock>;

    const uniqAnimations: Array<IBodyAnimationBlock | IHeadAnimationBlock> =
      uniqBy(
        filteredAnimations.filter((block) => block.animation),
        'animation',
      );

    const animations: ILoadedAnimationData[] = await Promise.all(
      uniqAnimations.map(async ({ animation, type }) => {
        const data: JSON = await importAnimation(
          animation || BodyAutoRestAnimation.STAND_STILL,
          character,
        );

        return {
          type,
          name: animation,
          animationData: data,
          pause: getPause(animation),
          isAutoRest: autoRestAnimations.includes(
            animation as BodyAutoRestAnimation | HeadAutoRestAnimation,
          ),
        };
      }),
    );

    const standStillData: JSON = await importAnimation(
      BodyAutoRestAnimation.STAND_STILL,
      character,
    );
    animations.push({
      name: BodyAutoRestAnimation.STAND_STILL,
      animationData: standStillData,
      pause: getPause(BodyAutoRestAnimation.STAND_STILL),
      isAutoRest: autoRestAnimations.includes(
        BodyAutoRestAnimation.STAND_STILL,
      ),
    });
    return animations;
  };

  const fetchBodyAndHeadAnimations: ReturnType<TUseAnimationHelper>['fetchBodyAndHeadAnimations'] =
    async (): Promise<void> => {
      const animations = await loadAnimations();
      loadedAnimations.current = animations;
    };

  const getInitialBodyOrHeadAnimation: ReturnType<TUseAnimationHelper>['getInitialBodyOrHeadAnimation'] =
    () => loadedAnimations.current[0];

  const changeAnimation: ReturnType<TUseAnimationHelper>['changeAnimation'] = (
    nextBlock,
    nextIndex,
  ) => {
    const nextAnim = loadedAnimations.current.find(
      (anim) => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );

    dispatchUpdate({
      currentData: nextAnim,
      currentBlockIndex: nextIndex,
    });

    if (!nextBlock.animation) {
      changeBlock(nextIndex);
    }
  };

  const changeBlockWrapper = () => {
    changeBlock();
  };

  const reverseAnimation = () => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        if (!get(currentData, 'isAutoRest', false)) {
          anim.setDirection(-1);
          anim.play();
          anim.removeEventListener('complete', reverseAnimation);
          anim.addEventListener('complete', changeBlockWrapper);
        } else {
          anim.removeEventListener('complete', reverseAnimation);
          changeBlock();
        }
      }
    }, get(currentData, 'pause', 0));
  };

  const handleBodyOrHeadAnimationBlock: ReturnType<TUseAnimationHelper>['handleBodyOrHeadAnimationBlock'] =
    () => {
      if (!animationRef.current) return;

      const { anim } = animationRef.current;
      anim.stop();

      if (currentData) {
        anim.addEventListener('complete', reverseAnimation);
        anim.play();
      }
    };

  const getIdleAnimation: ReturnType<TUseAnimationHelper>['getIdleAnimation'] =
    () =>
      loadedAnimations.current.find(
        (anim) => anim.name === BodyAutoRestAnimation.STAND_STILL,
      )!;

  const clearAnimationBlock: ReturnType<TUseAnimationHelper>['clearAnimationBlock'] =
    () => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        anim.removeEventListener('complete', changeBlockWrapper);
      }
    };

  return {
    getInitialBodyOrHeadAnimation,
    changeAnimation,
    handleBodyOrHeadAnimationBlock,
    getIdleAnimation,
    clearAnimationBlock,
    animationRef,
    fetchBodyAndHeadAnimations,
    loadedAnimations,
  };
};

export default useAnimationHelper;
