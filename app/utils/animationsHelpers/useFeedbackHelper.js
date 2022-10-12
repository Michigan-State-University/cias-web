import { calculatePercentageValue } from 'utils/percentageCalculator';
import { EFeedbackAction } from 'models/Narrator/FeedbackActions';

const MARK_MARGIN = 20;

const useFeedbackHelper = (
  blocks,
  dispatchUpdate,
  changeBlock,
  currentData,
  setFeedbackSettings,
  sliderRef,
  animationRef,
  loadedAnimations,
) => {
  const getInitialFeedbackData = () => ({
    ...loadedAnimations.current[0],
    ...blocks[0],
  });

  const changeFeedback = (nextBlock, nextIndex) => {
    const nextAnim = loadedAnimations.current.find(
      (anim) => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );

    dispatchUpdate({
      currentData: { ...nextAnim, ...nextBlock },
      currentBlockIndex: nextIndex,
    });

    if (!nextBlock.animation) {
      changeBlock(nextIndex);
    }
  };

  const handleFeedbackBlock = () => {
    switch (currentData.action) {
      case EFeedbackAction.SHOW_SPECTRUM:
        setFeedbackSettings('showSpectrum', true);
        break;
      default:
        break;
    }
    changeBlock(currentData.currentBlockIndex);
  };

  const calculatePosition = (action, currentPosition) => {
    switch (action) {
      case EFeedbackAction.SHOW_USER_VALUE: {
        const targetValue = sliderRef.props.value;
        const characterOffset = getCharacterHandOffset();

        return {
          x:
            sliderRef.sliderRef.offsetLeft +
            calculatePercentageValue(
              sliderRef.sliderRef.clientWidth,
              targetValue,
            ) -
            characterOffset.x,
          y: sliderRef.sliderRef.offsetTop + characterOffset.y,
        };
      }

      case EFeedbackAction.SHOW_HIGHER_VALUE: {
        const targetValue = sliderRef.props.value;
        const characterOffset = getCharacterHandOffset();
        const spectrumPosition = targetValue + (100 - targetValue) / 2;

        return {
          x:
            sliderRef.sliderRef.offsetLeft +
            calculatePercentageValue(
              sliderRef.sliderRef.clientWidth,
              spectrumPosition,
            ) -
            characterOffset.x,
          y: sliderRef.sliderRef.offsetTop + characterOffset.y + MARK_MARGIN,
        };
      }

      case EFeedbackAction.SHOW_LOWER_VALUE: {
        const targetValue = sliderRef.props.value;
        const characterOffset = getCharacterHandOffset();
        const spectrumPosition = targetValue / 2;

        return {
          x:
            sliderRef.sliderRef.offsetLeft +
            calculatePercentageValue(
              sliderRef.sliderRef.clientWidth,
              spectrumPosition,
            ) -
            characterOffset.x,
          y: sliderRef.sliderRef.offsetTop + characterOffset.y + MARK_MARGIN,
        };
      }

      default:
        return currentPosition;
    }
  };

  const getCharacterHandOffset = () => ({
    x: calculatePercentageValue(animationRef.props.width, 25),
    y: calculatePercentageValue(animationRef.props.height, 15),
  });

  return {
    getInitialFeedbackData,
    changeFeedback,
    handleFeedbackBlock,
    calculatePosition,
  };
};

export default useFeedbackHelper;
