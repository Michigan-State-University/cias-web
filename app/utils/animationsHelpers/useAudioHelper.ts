/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MutableRefObject, useRef } from 'react';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import * as Sentry from '@sentry/browser';
import type { LottieRef } from 'react-lottie';
import { Severity } from '@sentry/react';

import {
  IReadQuestionBlock,
  IReflection,
  IReflectionBlock,
  IReflectionFormula,
  IReflectionFormulaBlock,
  ISpeechBlock,
  NarratorBlock,
  NarratorBlockTypes,
  NarratorSettings,
} from 'models/Narrator';
import { speechAnimationsMapper, ESpeechPhase } from 'utils/animations';
import AudioWrapper from 'utils/audioWrapper';

import {
  ILoadedAudioData,
  IReflectionData,
  ISpeechAnimationData,
  ISpeechData,
} from './types';
import { importAnimation } from './utils';

const animationTimeout = 200;

type TUseAudioHelper = (
  blocks: NarratorBlock[],
  dispatchUpdate: (state: {
    currentData: Nullable<ISpeechData | IReflectionData>;
    currentBlockIndex: number;
  }) => void,
  currentData: ISpeechData | IReflectionData,
  currentIndex: number,
  animationCurrent: LottieRef,
  changeBlock: (currentIndex?: number) => Promise<void>,
  settings: NarratorSettings,
  audioInstance: AudioWrapper,
) => {
  changeSpeech: (nextBlock: NarratorBlock, nextIndex: number) => void;
  getInitialSpeechAnimation: (
    index: number,
  ) => ISpeechData | IReflectionData | undefined;
  cleanAudio: () => void;
  handleAudioBlock: () => void;
  decideIfPlaySpeechAnimation: () => boolean;
  stopSpeech: () => void;
  fetchAudioAnimations: () => Promise<void>;
  loadedSpeechAnimations: MutableRefObject<ILoadedAudioData[]>;
};

const useAudioHelper: TUseAudioHelper = (
  blocks,
  dispatchUpdate,
  currentData,
  currentIndex,
  animationCurrent,
  changeBlock,
  settings,
  audioInstance,
) => {
  const { animation: isAnimationEnabled, character } = settings;
  const loadedSpeechAnimations = useRef<ILoadedAudioData[]>([]);

  const fetchAudioAnimations: ReturnType<TUseAudioHelper>['fetchAudioAnimations'] =
    async () => {
      loadedSpeechAnimations.current = await loadSpeechAnimations();
    };

  const loadSpeechAnimations = async (): Promise<ILoadedAudioData[]> => {
    const speechBlocks = filter(
      blocks,
      ({ type }) =>
        type === NarratorBlockTypes.SPEECH ||
        type === NarratorBlockTypes.REFLECTION ||
        type === NarratorBlockTypes.READ_QUESTION ||
        type === NarratorBlockTypes.REFLECTION_FORMULA,
    ) as Array<
      | ISpeechBlock
      | IReflectionBlock
      | IReflectionFormulaBlock
      | IReadQuestionBlock
    >;

    const uniqAnimations = uniqBy(
      speechBlocks.filter((block) => block.animation),
      'animation',
    );

    const animations: ILoadedAudioData[] = [];
    if (isAnimationEnabled && blocks.length) {
      await Promise.all(
        uniqAnimations.map(async ({ animation }) => {
          const speechAnimation = speechAnimationsMapper[animation].animations;

          const animationsData: ISpeechAnimationData = {
            [ESpeechPhase.START]:
              ESpeechPhase.START in speechAnimation
                ? await importAnimation(
                    character,
                    speechAnimation[ESpeechPhase.START]!,
                  )
                : undefined,
            [ESpeechPhase.SPEECH]:
              ESpeechPhase.SPEECH in speechAnimation
                ? await importAnimation(
                    character,
                    speechAnimation[ESpeechPhase.SPEECH]!,
                  )
                : undefined,
            [ESpeechPhase.END]:
              ESpeechPhase.END in speechAnimation
                ? await importAnimation(
                    character,
                    speechAnimation[ESpeechPhase.END]!,
                  )
                : undefined,
          };

          animations.push({
            name: animation,
            animationData: animationsData,
            isEndReversed: !!speechAnimationsMapper[animation].isEndReversed,
          });
        }),
      );
    }

    return animations;
  };

  const changeSpeech: ReturnType<TUseAudioHelper>['changeSpeech'] = (
    nextBlock,
    nextIndex,
  ) => {
    const speechData = getSpeechData(nextIndex);
    if (speechData)
      dispatchUpdate({
        currentData: getSpeechData(nextIndex),
        currentBlockIndex: nextIndex,
      });
  };

  const getReflectionData = (
    block: IReflectionBlock | IReflectionFormulaBlock,
  ): {
    audio_urls: string[];
    reflections: IReflection[] | IReflectionFormula[];
    sha256: string[];
  } => {
    const { target_value: targetValue } = block;

    let reflections = [];

    if (Array.isArray(targetValue)) reflections = targetValue;
    else if (targetValue instanceof Object) reflections.push(targetValue);

    return {
      audio_urls: [],
      reflections,
      sha256: [],
    };
  };

  const getSpeechData: ReturnType<TUseAudioHelper>['getInitialSpeechAnimation'] =
    (index) => {
      const block = blocks[index ?? 0];

      const speechData = loadedSpeechAnimations.current.find(
        (anim) => anim.name === (block ? block.animation : undefined),
      )!;
      const initialAnimation =
        speechData && speechData.animationData.start
          ? ESpeechPhase.START
          : ESpeechPhase.SPEECH;

      switch (block.type) {
        case NarratorBlockTypes.SPEECH:
        case NarratorBlockTypes.READ_QUESTION:
          return {
            ...block,
            ...speechData,
            currentAnimation: initialAnimation,
            isLoop: initialAnimation !== ESpeechPhase.START,
            currentAudioIndex: 0,
          } as ISpeechData;

        case NarratorBlockTypes.REFLECTION:
        case NarratorBlockTypes.REFLECTION_FORMULA:
          return {
            ...block,
            ...speechData,
            ...getReflectionData(block),
            initialAnimation,
            currentAnimation: initialAnimation,
            isLoop: initialAnimation !== ESpeechPhase.START,
            currentAudioIndex: 0,
            currentReflectionIndex: 0,
          } as IReflectionData;

        default:
          return undefined;
      }
    };

  const cleanAudio: ReturnType<TUseAudioHelper>['cleanAudio'] = () =>
    audioInstance.clean();

  const handleAudioBlock: ReturnType<TUseAudioHelper>['handleAudioBlock'] =
    () => {
      if (currentData.currentAnimation === ESpeechPhase.START) {
        const { anim } = animationCurrent;

        anim.addEventListener('complete', updateAnimation);
        playAnimation();
      } else if (currentData.currentAnimation === ESpeechPhase.SPEECH) {
        switch (currentData.type) {
          case NarratorBlockTypes.SPEECH:
          case NarratorBlockTypes.READ_QUESTION:
            handleSpeech(currentData.audio_urls);
            break;

          case NarratorBlockTypes.REFLECTION_FORMULA:
          case NarratorBlockTypes.REFLECTION:
            handleSpeech(
              currentData.reflections.length
                ? currentData.reflections[currentData.currentReflectionIndex]
                    .audio_urls
                : [],
            );
            break;

          default:
            break;
        }
      } else if (currentData.currentAnimation === ESpeechPhase.END) {
        const { anim } = animationCurrent;

        anim.addEventListener('complete', nextBlock);
        playAnimation();
      }
    };

  const getInvalidText = (
    data: ISpeechData | IReflectionData,
  ): string | undefined => {
    const { type } = data;

    switch (type) {
      case NarratorBlockTypes.SPEECH:
      case NarratorBlockTypes.READ_QUESTION: {
        const { text, currentAudioIndex } = data;
        return text[currentAudioIndex];
      }

      case NarratorBlockTypes.REFLECTION_FORMULA:
      case NarratorBlockTypes.REFLECTION: {
        const { reflections, currentAudioIndex, currentReflectionIndex } = data;
        return reflections[currentReflectionIndex].text?.[currentAudioIndex];
      }
      default:
        return type;
    }
  };

  const handleAudioError = (): void => {
    const text = getInvalidText(currentData);
    Sentry.captureMessage(
      `Issue with audio with text: ${text}`,
      Severity.Error,
    );
  };

  const handleSpeech = (audioUrls: string[]): void => {
    audioInstance.onPlay(playAnimation);
    audioInstance.onLoaded(onSpeechReady);
    audioInstance.onEnded(() => onSpeechEnded(audioUrls));
    audioInstance.onError(() => {
      handleAudioError();
      onSpeechEnded(audioUrls);
    });

    if (!audioUrls.length || !audioUrls[currentData.currentAudioIndex])
      onSpeechEnded(audioUrls);
    else
      audioInstance.setSrc(
        `${process.env.API_URL}${audioUrls[currentData.currentAudioIndex]}`,
      );
  };

  const nextBlock = (): void => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', nextBlock);

    setTimeout(speechEndUpdate, animationTimeout);
  };

  const updateAnimation = (): void => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', updateAnimation);

    const { currentAnimation } = currentData;
    let nextAnimation = ESpeechPhase.START;

    if (currentAnimation === ESpeechPhase.START)
      nextAnimation = ESpeechPhase.SPEECH;
    else if (currentAnimation === ESpeechPhase.SPEECH)
      nextAnimation = ESpeechPhase.END;

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAnimation: nextAnimation,
        isLoop: nextAnimation === ESpeechPhase.SPEECH,
      },
      currentBlockIndex: currentIndex,
    });
  };

  const playAnimation = (): void => {
    if (isAnimationEnabled) {
      const { anim } = animationCurrent;

      if (
        currentData.currentAnimation === ESpeechPhase.END &&
        currentData.isEndReversed
      ) {
        anim.goToAndStop(anim.totalFrames - 1, true);
        anim.setDirection(-1);
      }

      anim.play();
    }
  };

  const onSpeechReady = (): Promise<void> => audioInstance.start();

  const onSpeechEnded = (audioUrls: string[]): void => {
    cleanAudio();

    if (hasMoreAudio(audioUrls)) moveToNextAudio();
    else finishSpeech();
  };

  const hasMoreAudio = (audioUrls: string[]): boolean => {
    const audioLength = audioUrls.length;

    return audioLength > currentData.currentAudioIndex + 1;
  };

  const hasMoreReflections = (): boolean => {
    if (!('reflections' in currentData)) return false;

    const reflectionsLength = currentData.reflections.length;

    return reflectionsLength > currentData.currentReflectionIndex + 1;
  };

  const moveToNextAudio = (): void => {
    stopAnimation();
    audioInstance.pause();

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAudioIndex: currentData.currentAudioIndex + 1,
      },
      currentBlockIndex: currentIndex,
    });
  };

  const finishSpeech = (): void => {
    stopAnimation();

    setTimeout(() => {
      if (isAnimationEnabled && currentData.animationData.end)
        updateAnimation();
      else speechEndUpdate();
    }, animationTimeout);
  };

  const speechEndUpdate = (): void => {
    switch (currentData.type) {
      case NarratorBlockTypes.SPEECH:
      case NarratorBlockTypes.READ_QUESTION:
        changeBlock();
        break;

      case NarratorBlockTypes.REFLECTION:
      case NarratorBlockTypes.REFLECTION_FORMULA:
        if (hasMoreReflections())
          dispatchUpdate({
            currentData: {
              ...currentData,
              currentAnimation: currentData.initialAnimation,
              currentAudioIndex: 0,
              currentReflectionIndex: currentData.currentReflectionIndex + 1,
            },
            currentBlockIndex: currentIndex,
          });
        else changeBlock();
        break;

      default:
        break;
    }
  };

  const stopSpeech: ReturnType<TUseAudioHelper>['stopSpeech'] = () => {
    audioInstance.clean();
    audioInstance.stop();
  };

  const stopAnimation = () => {
    if (isAnimationEnabled) {
      const { anim } = animationCurrent;
      anim.stop();
    }
  };

  const decideIfPlaySpeechAnimation: ReturnType<TUseAudioHelper>['decideIfPlaySpeechAnimation'] =
    () =>
      !(
        currentData &&
        (currentData.type === NarratorBlockTypes.SPEECH ||
          currentData.type === NarratorBlockTypes.READ_QUESTION ||
          currentData.type === NarratorBlockTypes.REFLECTION ||
          currentData.type === NarratorBlockTypes.REFLECTION_FORMULA) &&
        (audioInstance.paused || audioInstance.stopped) &&
        currentData.currentAnimation !== 'start' &&
        currentData.currentAnimation !== 'end'
      );

  return {
    changeSpeech,
    getInitialSpeechAnimation: getSpeechData,
    cleanAudio,
    handleAudioBlock,
    decideIfPlaySpeechAnimation,
    stopSpeech,
    fetchAudioAnimations,
    loadedSpeechAnimations,
  };
};

export default useAudioHelper;
