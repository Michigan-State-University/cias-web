/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import { speechType } from 'models/Narrator/BlockTypes';
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
) => {
  const audio = useRef(new AudioWrapper());
  const loadedSpeechAnimations = useRef([]);

  const fetchAudioAnimations = async () => {
    loadedSpeechAnimations.current = await loadSpeechAnimations();
  };

  const loadSpeechAnimations = async () => {
    const speechBlocks = filter(blocks, ({ type }) => type === speechType);

    const uniqAnimations = uniqBy(
      speechBlocks.filter(block => block.animation),
      'animation',
    );

    const animations = [];
    if (blocks.length) {
      await Promise.all(
        uniqAnimations.map(async ({ animation, type }) => {
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
            type,
            name: animation,
            animationData: animationsData,
            isEndReversed: speechAnimations[animation].isEndReversed,
          });
        }),
      );
    }

    return animations;
  };

  const changeSpeech = (nextBlock, nextIndex) => {
    const speechData = loadedSpeechAnimations.current.find(
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );

    dispatchUpdate({
      currentData: {
        ...nextBlock,
        ...speechData,
        currentAnimation: speechData.animationData.start ? 'start' : 'speech',
        isLoop: !speechData.animationData.start,
        currentAudioIndex: 0,
      },
      currentBlockIndex: nextIndex,
    });
  };

  const getInitialSpeechAnimation = () => {
    const speechData = loadedSpeechAnimations.current.find(
      anim => anim.name === (blocks[0] ? blocks[0].animation : undefined),
    );

    return {
      ...blocks[0],
      ...speechData,
      currentAnimation: speechData.animationData.start ? 'start' : 'speech',
      isLoop: !speechData.animationData.start,
      currentAudioIndex: 0,
    };
  };

  const cleanAudio = () => audio.current.clean();

  const handleSpeechBlock = () => {
    if (currentData.currentAnimation === 'start') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', updateAnimation);
      playAnimation();
    } else if (currentData.currentAnimation === 'speech') {
      audio.current.onPlay(playAnimation);
      audio.current.onLoaded(onSpeechReady);
      audio.current.onEnded(onSpeechEnded);
      audio.current.onError(onSpeechEnded);

      if (
        !currentData.audio_urls.length ||
        !currentData.audio_urls[currentData.currentAudioIndex]
      )
        onSpeechEnded();
      else
        audio.current.setSrc(
          `${process.env.API_URL}${
            currentData.audio_urls[currentData.currentAudioIndex]
          }`,
        );
    } else if (currentData.currentAnimation === 'end') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', nextBlock);
      playAnimation();
    }
  };

  const nextBlock = () => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', nextBlock);

    setTimeout(() => changeBlock(), animationTimeout);
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
    const { anim } = animationCurrent;

    if (currentData.currentAnimation === 'end' && currentData.isEndReversed) {
      anim.goToAndStop(anim.totalFrames - 1, true);
      anim.setDirection(-1);
    }

    anim.play();
  };

  const onSpeechReady = () => audio.current.play();

  const onSpeechEnded = () => {
    cleanAudio();

    if (hasMoreAudio()) moveToNextAudio();
    else finishSpeech();
  };

  const hasMoreAudio = () => {
    const audioLength = currentData.audio_urls.length;

    if (audioLength > currentData.currentAudioIndex + 1) return true;
    return false;
  };

  const moveToNextAudio = () => {
    const { anim } = animationCurrent;
    anim.stop();
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
    const { anim } = animationCurrent;
    anim.stop();

    setTimeout(() => {
      if (currentData.animationData.end) updateAnimation();
      else changeBlock();
    }, animationTimeout);
  };

  const stopSpeech = () => {
    audio.current.clean();
    audio.current.stop();
  };

  const decideIfPlaySpeechAnimation = () => {
    if (
      currentData &&
      currentData.type === speechType &&
      (audio.current.paused || audio.current.stopped)
    )
      return false;

    return true;
  };

  return {
    changeSpeech,
    getInitialSpeechAnimation,
    cleanAudio,
    handleSpeechBlock,
    decideIfPlaySpeechAnimation,
    stopSpeech,
    fetchAudioAnimations,
  };
};

export default useAudioHelper;
