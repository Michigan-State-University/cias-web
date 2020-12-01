/**
 * Test useMoveHelper
 */

import { renderHook, act } from '@testing-library/react-hooks';

import useMoveHelper from 'utils/animationsHelpers/useMoveHelper';
import { CHARACTER_POSITIONS } from 'utils/characterConstants';
import { instantiateBlockForType } from 'models/Session/utils';
import { speechType } from 'models/Narrator/BlockTypes';
import { elements } from 'theme';

describe('useMoveHelper test', () => {
  let blocks;
  let dispatchUpdate;
  let animationContainer;
  const endPosition = { x: 200, y: 200 };

  beforeEach(() => {
    animationContainer = null;
    blocks = [instantiateBlockForType(speechType, endPosition)];
    dispatchUpdate = jest.fn();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should scale X position and not Y when container is smaller than default draggable size', () => {
    animationContainer = {
      clientWidth: elements.draggableContainerSize / 2,
      clientHeight: elements.draggableContainerSize / 2,
    };
    const { result } = renderHook(() =>
      useMoveHelper(animationContainer, blocks, dispatchUpdate),
    );

    const {
      animationPos: { x, y },
    } = result.current;

    expect(y).toEqual(endPosition.y);

    const clientWidthToDefaultContainerSizeRatio =
      animationContainer.clientWidth / elements.draggableContainerSize;

    expect(x / endPosition.x).toBeWithin(
      clientWidthToDefaultContainerSizeRatio,
      clientWidthToDefaultContainerSizeRatio + 1,
    );
  });

  it('should not scale X and Y when container is bigger than default draggable size', () => {
    animationContainer = {
      clientWidth: elements.draggableContainerSize * 2,
      clientHeight: elements.draggableContainerSize * 2,
    };
    const { result } = renderHook(() =>
      useMoveHelper(animationContainer, blocks, dispatchUpdate),
    );

    const { animationPos } = result.current;

    expect(animationPos).toStrictEqual(endPosition);
  });

  it('should change position to the last block position', async () => {
    jest.useFakeTimers('modern');
    blocks = [
      instantiateBlockForType(
        speechType,
        CHARACTER_POSITIONS.bottomRightCorner,
      ),
      instantiateBlockForType(speechType, endPosition),
    ];
    const { result } = renderHook(() =>
      useMoveHelper(animationContainer, blocks, dispatchUpdate),
    );

    let { animationPos } = result.current;
    const { moveAnimation } = result.current;

    expect(animationPos).toStrictEqual(CHARACTER_POSITIONS.bottomRightCorner);

    await act(async () => {
      const promise = moveAnimation(blocks[1]);
      jest.runAllTimers();
      await promise;
    });

    ({ animationPos } = result.current);

    expect(animationPos).toStrictEqual(endPosition);
  });
});
