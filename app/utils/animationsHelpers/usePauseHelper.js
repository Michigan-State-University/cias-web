import { pauseType } from 'models/Narrator/BlockTypes';

const usePauseHelper = (
  blocks,
  currentData,
  dispatchUpdate,
  changeBlock,
  getIdleAnimation,
) => {
  /**
   * @param {number} time in `seconds`
   */
  const pauseCharacter = async (time) =>
    new Promise((r) => setTimeout(r, time * 1000));

  const handlePauseBlock = async () => {
    const { pauseDuration } = currentData;

    await pauseCharacter(pauseDuration);
    await changeBlock();
  };

  const changePauseBlock = (nextBlock, nextIndex) => {
    const { pauseDuration } = nextBlock;
    const idleAnimation = getIdleAnimation();

    dispatchUpdate({
      currentData: { ...idleAnimation, pauseDuration, type: pauseType },
      currentBlockIndex: nextIndex,
    });
  };

  const getInitialPauseAnimation = () => ({
    ...getIdleAnimation(),
    pauseDuration: blocks[0].pauseDuration,
    type: pauseType,
  });

  return {
    pauseCharacter,
    handlePauseBlock,
    getInitialPauseAnimation,
    changePauseBlock,
  };
};

export default usePauseHelper;
