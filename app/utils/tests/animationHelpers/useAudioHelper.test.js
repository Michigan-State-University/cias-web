/* eslint-disable no-restricted-syntax,no-loop-func */
/**
 * Test useAudioHelper
 */

import { act, renderHook } from '@testing-library/react-hooks';

import useAudioHelper from 'utils/animationsHelpers/useAudioHelper';
import { instantiateBlockForType } from 'models/Session/utils';
import {
  readQuestionBlockType,
  reflectionFormulaType,
  reflectionType,
  speechType,
} from 'models/Narrator/BlockTypes';
import { speechAnimations } from 'utils/animations/animationsNames';
import AudioWrapper from 'utils/audioWrapper';

describe('useAudioHelper test', () => {
  const speechBlock = instantiateBlockForType(speechType);
  let blocks;
  let dispatchUpdate;
  let currentData;
  let currentIndex;
  let changeBlock;
  let answers;
  let settings;
  let audioInstance;
  let animationCurrent;

  beforeEach(() => {
    blocks = [speechBlock, speechBlock];
    dispatchUpdate = jest.fn();
    currentData = {};
    currentIndex = 0;
    changeBlock = jest.fn();
    answers = [];
    settings = { voice: true, animation: true };
    audioInstance = new AudioWrapper();
    animationCurrent = {
      anim: {
        stop: jest.fn(),
      },
    };
  });

  it('should return proper initial data', () => {
    const { result } = renderHook(() =>
      useAudioHelper(
        blocks,
        dispatchUpdate,
        currentData,
        currentIndex,
        null,
        changeBlock,
        answers,
        settings,
      ),
    );

    const { getInitialSpeechAnimation } = result.current;

    expect(getInitialSpeechAnimation()).toEqual({
      ...speechBlock,
      currentAnimation: 'speech',
      currentAudioIndex: 0,
      isLoop: true,
    });
  });

  it('should load uniq animations only', async () => {
    const { result } = renderHook(() =>
      useAudioHelper(
        blocks,
        dispatchUpdate,
        currentData,
        currentIndex,
        null,
        changeBlock,
        answers,
        settings,
      ),
    );

    const { loadedSpeechAnimations, fetchAudioAnimations } = result.current;

    await act(async () => fetchAudioAnimations());

    const expected = [
      {
        name: 'rest',
        animationData: {
          speech: await import(
            `assets/animations/${speechAnimations.rest.animations.speech}.json`
          ),
        },
        isEndReversed: undefined,
      },
    ];

    expect(loadedSpeechAnimations.current).toEqual(expected);
  });

  it('should handle audio block even with empty audio for each audio block type', async () => {
    jest.useFakeTimers('modern');

    const blockList = [
      speechBlock,
      instantiateBlockForType(reflectionType),
      instantiateBlockForType(reflectionFormulaType),
      instantiateBlockForType(readQuestionBlockType, {}, { subtitle: 'test' }),
    ];

    for await (const block of blockList) {
      const { result, rerender } = renderHook(() =>
        useAudioHelper(
          [block],
          dispatchUpdate,
          currentData,
          currentIndex,
          animationCurrent,
          changeBlock,
          answers,
          settings,
          audioInstance,
        ),
      );

      const {
        getInitialSpeechAnimation,
        fetchAudioAnimations,
      } = result.current;

      // load animation to allow block execution
      await act(async () => fetchAudioAnimations());

      // update data with loaded animations
      currentData = getInitialSpeechAnimation();

      // rerender hook so that helper uses updated data
      rerender();

      // it has to be taken after rerender => otherwise it uses old data
      const { handleAudioBlock } = result.current;

      act(() => {
        handleAudioBlock();

        // advance time so that all setTimeout methods are run
        jest.runAllTimers();
      });
    }

    expect(changeBlock).toHaveBeenCalledTimes(blockList.length);

    // clear and remove mocked timers
    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
