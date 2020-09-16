/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import {
  speechType,
  reflectionType,
  readQuestionBlockType,
  reflectionFormulaType,
} from 'models/Narrator/BlockTypes';
import AudioWrapper from 'utils/audioWrapper';
import { useRef } from 'react';
import { speechAnimations } from 'utils/animations/animationsNames';
import toPairs from 'lodash/toPairs';

const animationTimeout = 200;

const useAudioHelper = (
  blocks,
  dispatchUpdate,
  currentData,
  currentIndex,
  animationCurrent,
  changeBlock,
  answers,
  settings,
) => {
  const audio = useRef(new AudioWrapper());
  const loadedSpeechAnimations = useRef([]);

  const fetchAudioAnimations = async () => {
    loadedSpeechAnimations.current = await loadSpeechAnimations();
  };

  const loadSpeechAnimations = async () => {
    const speechBlocks = filter(
      blocks,
      ({ type }) =>
        type === speechType ||
        type === reflectionType ||
        type === readQuestionBlockType ||
        type === reflectionFormulaType,
    );

    const uniqAnimations = uniqBy(
      speechBlocks.filter(block => block.animation),
      'animation',
    );

    const animations = [];
    if (settings.animation && blocks.length) {
      await Promise.all(
        uniqAnimations.map(async ({ animation }) => {
          const animationNames = toPairs(
            speechAnimations[animation].animations,
          );
          const animationsData = {};

          for (const [key, value] of animationNames) {
            if (key === 'end' && speechAnimations[animation].isEndReversed)
              animationsData.end = animationsData.start;
            else {
              const data = await import(`assets/animations/${value}.json`);

              animationsData[key] = data;
            }
          }

          animations.push({
            name: animation,
            animationData: animationsData,
            isEndReversed: speechAnimations[animation].isEndReversed,
          });
        }),
      );
    }

    return animations;
  };

  const getReflectionData = block => {
    const answer = answers[block.question_id];
    const reflections = [];

    if (answer && answer.answerBody) {
      for (let i = 0; i < answer.answerBody.length; i += 1) {
        const answerBody = answer.answerBody[i];
        const matchReflection = block.reflections.find(
          reflection =>
            reflection.variable === answerBody.var &&
            reflection.value === answerBody.value,
        );

        if (matchReflection) reflections.push(matchReflection);
      }
    }

    return { audio_urls: [], reflections };
  };

  const getReflectionFormulaData = block =>
    !Array.isArray(block.target_value) && block.target_value
      ? block.target_value
      : {
          audio_urls: [],
          sha256: [],
          text: block.text,
        };

  const changeSpeech = (nextBlock, nextIndex) => {
    const speechData = loadedSpeechAnimations.current.find(
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );
    const initialAnimation =
      speechData && speechData.animationData.start ? 'start' : 'speech';

    switch (nextBlock.type) {
      case speechType:
      case readQuestionBlockType:
        dispatchUpdate({
          currentData: {
            ...speechData,
            ...nextBlock,
            currentAnimation: initialAnimation,
            isLoop: initialAnimation !== 'start',
            currentAudioIndex: 0,
          },
          currentBlockIndex: nextIndex,
        });
        break;

      case reflectionType:
        dispatchUpdate({
          currentData: {
            ...speechData,
            ...nextBlock,
            ...getReflectionData(nextBlock),
            initialAnimation,
            currentAnimation: initialAnimation,
            isLoop: initialAnimation !== 'start',
            currentAudioIndex: 0,
            currentReflectionIndex: 0,
          },
          currentBlockIndex: nextIndex,
        });
        break;

      case reflectionFormulaType:
        dispatchUpdate({
          currentData: {
            ...speechData,
            ...nextBlock,
            ...getReflectionFormulaData(nextBlock),
            currentAnimation: initialAnimation,
            isLoop: initialAnimation !== 'start',
            currentAudioIndex: 0,
          },
          currentBlockIndex: nextIndex,
        });
        break;

      default:
        break;
    }
  };

  const getInitialSpeechAnimation = () => {
    const speechData = loadedSpeechAnimations.current.find(
      anim => anim.name === (blocks[0] ? blocks[0].animation : undefined),
    );
    const initialAnimation =
      speechData && speechData.animationData.start ? 'start' : 'speech';

    switch (blocks[0].type) {
      case speechType:
      case readQuestionBlockType:
        return {
          ...blocks[0],
          ...speechData,
          currentAnimation: initialAnimation,
          isLoop: initialAnimation !== 'start',
          currentAudioIndex: 0,
        };

      case reflectionType:
        return {
          ...blocks[0],
          ...speechData,
          ...getReflectionData(blocks[0]),
          initialAnimation,
          currentAnimation: initialAnimation,
          isLoop: initialAnimation !== 'start',
          currentAudioIndex: 0,
          currentReflectionIndex: 0,
        };

      case reflectionFormulaType:
        return {
          ...blocks[0],
          ...speechData,
          ...getReflectionFormulaData(blocks[0]),
          currentAnimation: initialAnimation,
          isLoop: initialAnimation !== 'start',
          currentAudioIndex: 0,
        };

      default:
        return undefined;
    }
  };

  const cleanAudio = () => audio.current.clean();

  const handleAudioBlock = () => {
    if (currentData.currentAnimation === 'start') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', updateAnimation);
      playAnimation();
    } else if (currentData.currentAnimation === 'speech') {
      switch (currentData.type) {
        case speechType:
        case readQuestionBlockType:
        case reflectionFormulaType:
          handleSpeech(currentData.audio_urls);
          break;

        case reflectionType:
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
    } else if (currentData.currentAnimation === 'end') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', nextBlock);
      playAnimation();
    }
  };

  const handleSpeech = audioUrls => {
    audio.current.onPlay(playAnimation);
    audio.current.onLoaded(onSpeechReady);
    audio.current.onEnded(() => onSpeechEnded(audioUrls));
    audio.current.onError(() => onSpeechEnded(audioUrls));

    if (!audioUrls.length || !audioUrls[currentData.currentAudioIndex])
      onSpeechEnded(audioUrls);
    else
      audio.current.setSrc(
        `${process.env.API_URL}${audioUrls[currentData.currentAudioIndex]}`,
      );
  };

  const nextBlock = () => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', nextBlock);

    setTimeout(speechEndUpdate, animationTimeout);
  };

  const updateAnimation = () => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', updateAnimation);

    const { currentAnimation } = currentData;
    let nextAnimation = '';

    if (currentAnimation === 'start') {
      nextAnimation = 'speech';
    } else if (currentAnimation === 'speech') {
      nextAnimation = 'end';
    }

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAnimation: nextAnimation,
        isLoop: nextAnimation === 'speech',
      },
      currentBlockIndex: currentIndex,
    });
  };

  const playAnimation = () => {
    if (settings.animation) {
      const { anim } = animationCurrent;

      if (currentData.currentAnimation === 'end' && currentData.isEndReversed) {
        anim.goToAndStop(anim.totalFrames - 1, true);
        anim.setDirection(-1);
      }

      anim.play();
    }
  };

  const onSpeechReady = () => audio.current.play();

  const onSpeechEnded = audioUrls => {
    cleanAudio();

    if (hasMoreAudio(audioUrls)) moveToNextAudio();
    else finishSpeech();
  };

  const hasMoreAudio = audioUrls => {
    const audioLength = audioUrls.length;

    if (audioLength > currentData.currentAudioIndex + 1) return true;
    return false;
  };

  const hasMoreReflections = () => {
    const reflectionsLength = currentData.reflections.length;

    if (reflectionsLength > currentData.currentReflectionIndex + 1) return true;
    return false;
  };

  const moveToNextAudio = () => {
    stopAnimation();
    audio.current.pause();

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAudioIndex: currentData.currentAudioIndex + 1,
      },
      currentBlockIndex: currentIndex,
    });
  };

  const finishSpeech = () => {
    stopAnimation();

    setTimeout(() => {
      if (settings.animation && currentData.animationData.end)
        updateAnimation();
      else speechEndUpdate();
    }, animationTimeout);
  };

  const speechEndUpdate = () => {
    switch (currentData.type) {
      case speechType:
      case readQuestionBlockType:
      case reflectionFormulaType:
        changeBlock();
        break;
      case reflectionType:
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

  const stopSpeech = () => {
    audio.current.clean();
    audio.current.stop();
  };

  const stopAnimation = () => {
    if (settings.animation) {
      const { anim } = animationCurrent;
      anim.stop();
    }
  };

  const decideIfPlaySpeechAnimation = () => {
    if (
      currentData &&
      (currentData.type === speechType ||
        currentData.type === reflectionType ||
        currentData.type === readQuestionBlockType ||
        currentData.type === reflectionFormulaType) &&
      (audio.current.paused || audio.current.stopped) &&
      (currentData.currentAnimation !== 'start' &&
        currentData.currentAnimation !== 'end')
    )
      return false;

    return true;
  };

  return {
    changeSpeech,
    getInitialSpeechAnimation,
    cleanAudio,
    handleAudioBlock,
    decideIfPlaySpeechAnimation,
    stopSpeech,
    fetchAudioAnimations,
  };
};

export default useAudioHelper;
