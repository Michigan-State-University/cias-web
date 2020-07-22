import { useRef } from 'react';

import getPause from 'utils/animations/getPause';
import {
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';

import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { autoRestAnimations } from 'utils/animations/animationsNames';

const useAnimationHelper = (
  blocks,
  dispatchUpdate,
  changeBlock,
  currentData,
) => {
  const loadedAnimations = useRef([]);
  const animationRef = useRef(null);

  const loadAnimations = async () => {
    const bodyAnimations = [];

    const filteredAnimations = filter(
      blocks,
      ({ type }) => type === bodyAnimationType || type === headAnimationType,
    );
    const uniqAnimations = uniqBy(
      filteredAnimations.filter(block => block.animation),
      'animation',
    );

    await Promise.all(
      uniqAnimations.map(async ({ animation, type }) => {
        const data = await import(
          `assets/animations/${animation || 'standStill'}.json`
        );

        bodyAnimations.push({
          type,
          name: animation,
          animationData: data,
          pause: getPause(animation),
          isAutoRest: autoRestAnimations.includes(animation),
        });
      }),
    );

    const standStillData = await import(`assets/animations/standStill.json`);
    bodyAnimations.push({
      name: 'standStill',
      animationData: standStillData,
      pause: getPause('standStill'),
      isAutoRest: autoRestAnimations.includes('standStill'),
    });
    return bodyAnimations;
  };

  const fetchBodyAndHeadAnimations = async () => {
    const bodyAnimations = await loadAnimations();
    loadedAnimations.current = bodyAnimations;
  };

  const getInitialBodyOrHeadAnimation = () => loadedAnimations.current[0];

  const changeAnimation = (nextBlock, nextIndex) => {
    console.log('eee');
    const nextAnim = loadedAnimations.current.find(
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );
    console.log({ nextAnim });
    dispatchUpdate({
      currentData: nextAnim,
      currentBlockIndex: nextIndex,
    });
    if (!nextBlock.animation) {
      changeBlock(nextIndex);
    }
  };

  const reverseAnimation = () => {
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

  const handleBodyOrHeadAnimationBlock = () => {
    const { anim } = animationRef.current;
    if (currentData) {
      anim.addEventListener('complete', reverseAnimation);
      anim.play();
    } else anim.stop();
  };

  const getIdleAnimation = () =>
    loadedAnimations.current.find(anim => anim.name === 'standStill');

  const clearAnimationBlock = () => {
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
  };
};

export default useAnimationHelper;
