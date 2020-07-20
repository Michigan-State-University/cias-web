import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import { speechType } from 'models/Narrator/BlockTypes';
import AudioWrapper from 'utils/audioWrapper';
import { useRef } from 'react';

const useAudioHelper = (
  blocks,
  dispatchUpdate,
  currentData,
  animationCurrent,
  changeBlock,
) => {
  const audio = useRef(new AudioWrapper());
  const loadedSpeechAnimations = useRef([]);

  const fetchAudioAnimations = async () => {
    loadedSpeechAnimations.current = await loadSpeechAnimations();
  };

  const loadSpeechAnimations = async () => {
    const filteredAnimations = filter(
      blocks,
      ({ type }) => type === speechType,
    );
    const uniqAnimations = uniqBy(
      filteredAnimations.filter(block => block.animation),
      'animation',
    );
    const speechAnimations = [];
    if (blocks.length) {
      await Promise.all(
        uniqAnimations.map(async ({ animation, type }) => {
          const data = await import(`assets/animations/${animation}.json`);
          speechAnimations.push({
            type,
            name: animation,
            animationData: data,
          });
        }),
      );
    }
    return speechAnimations;
  };

  const changeSpeech = (nextBlock, nextIndex) => {
    dispatchUpdate({
      currentData: {
        ...nextBlock,
        ...loadedSpeechAnimations.current.find(
          anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
        ),
      },
      currentBlockIndex: nextIndex,
    });
  };

  const getInitialSpeechAnimation = () => ({
    ...blocks[0],
    ...loadedSpeechAnimations.current.find(
      anim => anim.name === (blocks[0] ? blocks[0].animation : undefined),
    ),
  });

  const cleanAudio = () => audio.current.clean();

  const handleSpeechBlock = () => {
    audio.current.onPlay(onSpeechPlay);
    audio.current.onLoaded(onSpeechReady);
    audio.current.onEnded(onSpeechEnded);
    audio.current.onError(onSpeechEnded);

    audio.current.setSrc(currentData.audio_url);
  };

  const onSpeechPlay = () => {
    const { anim } = animationCurrent;

    anim.play();
  };

  const onSpeechReady = () => audio.current.play();

  const onSpeechEnded = () => {
    const { anim } = animationCurrent;

    anim.stop();
    changeBlock();
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
