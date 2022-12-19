import {
  IPauseBlock,
  NarratorBlock,
  NarratorBlockTypes,
} from 'models/Narrator';

import { ILoadedAnimationData } from './types';

type TUsePauseHelper = {
  pauseCharacter: (time: number) => Promise<number>;
  handlePauseBlock: () => void;
  getInitialPauseAnimation: () => NarratorBlock | ILoadedAnimationData;
  changePauseBlock: (nextBlock: NarratorBlock, nextIndex: number) => void;
};

type TAnimationState = {
  currentData: Nullable<NarratorBlock> | ILoadedAnimationData;
  currentBlockIndex: number;
};

const usePauseHelper = (
  blocks: NarratorBlock[],
  currentData: NarratorBlock,
  dispatchUpdate: (newState: TAnimationState) => void,
  changeBlock: (prevIndex: Nullable<number>) => Promise<void>,
  getIdleAnimation: () => ILoadedAnimationData,
): TUsePauseHelper => {
  /**
   * @param {number} time in `seconds`
   */
  const pauseCharacter = async (time: number) =>
    new Promise<number>((r) => setTimeout(r, time * 1000));

  const handlePauseBlock = async () => {
    const { pauseDuration } = currentData as IPauseBlock;

    await pauseCharacter(pauseDuration ?? 0);
    await changeBlock(null);
  };

  const changePauseBlock = (nextBlock: NarratorBlock, nextIndex: number) => {
    if (nextBlock.type !== NarratorBlockTypes.PAUSE) {
      return;
    }

    const { pauseDuration } = nextBlock;
    const idleAnimation = getIdleAnimation();

    dispatchUpdate({
      currentData: {
        ...idleAnimation,
        pauseDuration,
        type: NarratorBlockTypes.PAUSE,
      },
      currentBlockIndex: nextIndex,
    });
  };

  const getInitialPauseAnimation = () => ({
    ...getIdleAnimation(),
    pauseDuration:
      blocks[0].type === NarratorBlockTypes.PAUSE ? blocks[0].pauseDuration : 0,
    type: NarratorBlockTypes.PAUSE,
  });

  return {
    pauseCharacter,
    handlePauseBlock,
    getInitialPauseAnimation,
    changePauseBlock,
  };
};

export default usePauseHelper;
