import { MutableRefObject } from 'react';
import { LottieRef } from 'react-lottie';

import {
  EFeedbackAction,
  IFeedbackBlock,
  NarratorBlock,
  NarratorBlockTypes,
  Position,
} from 'models/Narrator';

import { calculatePercentageValue } from 'utils/percentageCalculator';

import { AnswerSessionPageFeedbackScreenSettings } from 'containers/AnswerSessionPage/components/sharedProps';

import { ILoadedAnimationData } from './types';

const MARK_MARGIN = 20;

type State = {
  currentData: Nullable<ILoadedAnimationData>;
  currentBlockIndex: number;
  action?: EFeedbackAction;
};

export type TUseFeedbackHelper = (
  blocks: NarratorBlock[],
  dispatchUpdate: (state: State) => void,
  changeBlock: (currentIndex?: number) => Promise<void>,
  currentData: State,
  setFeedbackSettings: (
    setting: keyof AnswerSessionPageFeedbackScreenSettings,
    value: ValueOf<AnswerSessionPageFeedbackScreenSettings>,
  ) => void,
  sliderRef: AnswerSessionPageFeedbackScreenSettings['sliderRef'],
  animationRef: LottieRef,
  loadedAnimations: MutableRefObject<ILoadedAnimationData[]>,
) => {
  getInitialFeedbackData: () => IFeedbackBlock | undefined;
  changeFeedback: (nextBlock: NarratorBlock, nextIndex: number) => void;
  handleFeedbackBlock: () => void;
  calculatePosition: (
    action: EFeedbackAction,
    currentPosition: Position,
  ) => Position;
};

const useFeedbackHelper: TUseFeedbackHelper = (
  blocks,
  dispatchUpdate,
  changeBlock,
  currentData,
  setFeedbackSettings,
  sliderRef,
  animationRef,
  loadedAnimations,
) => {
  const getInitialFeedbackData: ReturnType<TUseFeedbackHelper>['getInitialFeedbackData'] =
    () => {
      const loadedAnimation = loadedAnimations.current[0];
      const block = blocks[0];

      if (
        loadedAnimation.type !== NarratorBlockTypes.FEEDBACK ||
        block.type !== NarratorBlockTypes.FEEDBACK
      ) {
        return;
      }

      return {
        ...loadedAnimation,
        ...block,
      };
    };

  const changeFeedback: ReturnType<TUseFeedbackHelper>['changeFeedback'] = (
    nextBlock,
    nextIndex,
  ) => {
    const nextAnim = loadedAnimations.current.find(
      (anim) => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );

    if (!nextAnim) return;

    dispatchUpdate({
      currentData: { ...nextAnim, ...nextBlock },
      currentBlockIndex: nextIndex,
    });

    if (!nextBlock.animation) {
      changeBlock(nextIndex);
    }
  };

  const handleFeedbackBlock: ReturnType<TUseFeedbackHelper>['handleFeedbackBlock'] =
    () => {
      switch (currentData.action) {
        case EFeedbackAction.SHOW_SPECTRUM:
          setFeedbackSettings('showSpectrum', true);
          break;
        default:
          break;
      }
      changeBlock(currentData.currentBlockIndex);
    };

  const calculatePosition: ReturnType<TUseFeedbackHelper>['calculatePosition'] =
    (action: EFeedbackAction, currentPosition: Position) => {
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
