/**
 * Test useAudioHelper
 */

import { renderHook } from '@testing-library/react-hooks';

import useAudioHelper from 'utils/animationsHelpers/useAudioHelper';
import { instantiateBlockForType } from 'models/Intervention/utils';
import { speechType } from 'models/Narrator/BlockTypes';

describe('useAudioHelper test', () => {
  const speechBlock = instantiateBlockForType(speechType);
  let blocks;
  let dispatchUpdate;
  let currentData;
  let currentIndex;
  let changeBlock;
  let answers;
  let settings;

  beforeEach(() => {
    blocks = [speechBlock];
    dispatchUpdate = jest.fn();
    currentData = {};
    currentIndex = 0;
    changeBlock = jest.fn();
    answers = [];
    settings = { voice: true, animation: true };
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
});
