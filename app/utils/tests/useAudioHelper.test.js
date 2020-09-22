/**
 * Test useAudioHelper
 */

import useAudioHelper from 'utils/animationsHelpers/useAudioHelper';
import { renderHook } from 'utils/renderHook';
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
    const {
      data: { getInitialSpeechAnimation },
    } = renderHook(() =>
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

    expect(getInitialSpeechAnimation()).toEqual({
      ...speechBlock,
      currentAnimation: 'speech',
      currentAudioIndex: 0,
      isLoop: true,
    });
  });
});
