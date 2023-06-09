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
import { speechAnimationsMapper } from 'utils/animations/animationsNames';
import AudioWrapper from 'utils/audioWrapper';

describe('useAudioHelper test', () => {
  const speechBlock = instantiateBlockForType(speechType);
  let blocks;
  let dispatchUpdate;
  let currentData;
  let currentIndex;
  let changeBlock;
  let settings;
  let audioInstance;
  let animationCurrent;

  beforeEach(() => {
    blocks = [speechBlock, speechBlock];
    dispatchUpdate = jest.fn();
    currentData = {};
    currentIndex = 0;
    changeBlock = jest.fn();
    settings = { voice: true, animation: true, character: 'peedy' };
    audioInstance = new AudioWrapper();
    animationCurrent = {
      anim: {
        stop: jest.fn(),
      },
    };
  });

  it.skip('should return proper initial data', () => {
    const { result } = renderHook(() =>
      useAudioHelper(
        blocks,
        dispatchUpdate,
        currentData,
        currentIndex,
        null,
        changeBlock,
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

  it.skip('should load uniq animations only', async () => {
    const { result } = renderHook(() =>
      useAudioHelper(
        blocks,
        dispatchUpdate,
        currentData,
        currentIndex,
        null,
        changeBlock,
        settings,
      ),
    );

    const { loadedSpeechAnimations, fetchAudioAnimations } = result.current;

    await act(async () => fetchAudioAnimations());

    const expected = [
      {
        name: 'rest',
        animationData: {
          start: undefined,
          speech: await import(
            `assets/animations/peedy/${speechAnimationsMapper.peedy.rest.animations.speech}.json`
          ),
          end: undefined,
        },
        isEndReversed: false,
      },
    ];

    expect(loadedSpeechAnimations.current).toEqual(expected);
  });

  it.skip('should handle audio block even with empty audio for each audio block type', async () => {
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
          settings,
          audioInstance,
        ),
      );

      const { getInitialSpeechAnimation, fetchAudioAnimations } =
        result.current;

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
