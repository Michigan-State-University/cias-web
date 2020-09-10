import { calculatePercentageValue } from 'utils/percentageCalculator';
import { feedbackActions } from 'models/Narrator/FeedbackActions';

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
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
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
      case feedbackActions.showSpectrum:
        setFeedbackSettings('showSpectrum', true);
        break;
      default:
        break;
    }
    changeBlock(currentData.currentBlockIndex);
  };

  const calculatePosition = (action, currentPosition) => {
    switch (action) {
      case feedbackActions.showUserValue: {
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

      case feedbackActions.showHigherValue: {
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

      case feedbackActions.showLowerValue: {
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
