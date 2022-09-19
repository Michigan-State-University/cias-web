import { MutableRefObject, useMemo, useRef } from 'react';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import get from 'lodash/get';
import type { LottieRef } from 'react-lottie';

import getPause from 'utils/animations/getPause';
import { getAutoRestAnimations } from 'utils/animations/animationsNames';
import {
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';
import {
  BodyAutoRestAnimation,
  HeadAutoRestAnimation,
  NarratorBlock,
} from 'models/Narrator';
import { CharacterType } from 'models/Character';

import { importAnimation } from './utils';
import { TAnimationData } from './types';

type TUseAnimationHelper = (
  blocks: NarratorBlock[],
  dispatchUpdate: (state: {
    currentData: Nullable<TAnimationData>;
    currentBlockIndex: number;
  }) => void,
  changeBlock: (currentIndex?: number) => Promise<void>,
  currentData: TAnimationData,
  character: CharacterType,
) => {
  getInitialBodyOrHeadAnimation: () => TAnimationData;
  changeAnimation: (nextBlock: NarratorBlock, nextIndex: number) => void;
  handleBodyOrHeadAnimationBlock: () => void;
  getIdleAnimation: () => TAnimationData;
  clearAnimationBlock: () => void;
  animationRef: MutableRefObject<LottieRef | undefined>;
  fetchBodyAndHeadAnimations: () => Promise<void>;
  loadedAnimations: MutableRefObject<TAnimationData[]>;
};

const useAnimationHelper: TUseAnimationHelper = (
  blocks,
  dispatchUpdate,
  changeBlock,
  currentData,
  character,
) => {
  const loadedAnimations = useRef<TAnimationData[]>([]);
  const animationRef = useRef<LottieRef>();

  const autoRestAnimations: Array<
    BodyAutoRestAnimation | HeadAutoRestAnimation
  > = useMemo(() => getAutoRestAnimations(character), [character]);

  const loadAnimations = async (): Promise<TAnimationData[]> => {
    const filteredAnimations: NarratorBlock[] = filter(
      blocks,
      ({ type }) => type === bodyAnimationType || type === headAnimationType,
    );
    const uniqAnimations: NarratorBlock[] = uniqBy(
      filteredAnimations.filter((block) => block.animation),
      'animation',
    );

    const animations: TAnimationData[] = await Promise.all(
      uniqAnimations.map(async ({ animation, type }) => {
        const data: JSON = await importAnimation(
          character,
          animation || BodyAutoRestAnimation.STAND_STILL,
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
      character,
      BodyAutoRestAnimation.STAND_STILL,
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

  const reverseAnimation = (): void => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        if (!get(currentData, 'isAutoRest', false)) {
          anim.setDirection(-1);
          anim.play();
          anim.removeEventListener('complete', reverseAnimation);
          anim.addEventListener('complete', changeBlock);
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
        anim.removeEventListener('complete', changeBlock);
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
