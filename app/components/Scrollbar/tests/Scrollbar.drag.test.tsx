import React from 'react';
import { fireEvent } from '@testing-library/react';

import { colors } from 'theme';
import { testRender, setClientSize, mockOffsetSize } from 'utils/testUtils';

import Scrollbar from '../Scrollbar';

const CONTAINER_SIZE = 200;
const SIZE_RATIO = 0.25;
const THUMB_SIZE = CONTAINER_SIZE * SIZE_RATIO;
const TRACK_LENGTH = CONTAINER_SIZE - THUMB_SIZE;
const THICKNESS = 5;

mockOffsetSize(CONTAINER_SIZE);

type RenderOptions = {
  horizontal?: boolean;
  positionRatio?: number;
};

const renderScrollbar = ({
  horizontal = false,
  positionRatio = 0,
}: RenderOptions = {}) => {
  const onPositionRatioChange = jest.fn();
  const ui = () => (
    <Scrollbar
      horizontal={horizontal}
      sizeRatio={SIZE_RATIO}
      positionRatio={positionRatio}
      thickness={THICKNESS}
      onPositionRatioChange={(ratio: number) => onPositionRatioChange(ratio)}
    />
  );

  const utils = testRender(ui());

  const track = utils.container.firstChild as HTMLElement;
  const thumb = track.firstChild as HTMLElement;

  track.style.padding = '0px';
  thumb.style.margin = '0px';
  thumb.style.borderWidth = '0px';
  setClientSize(track, CONTAINER_SIZE, CONTAINER_SIZE);
  setClientSize(thumb, THUMB_SIZE, THUMB_SIZE);

  return { ...utils, track, thumb, onPositionRatioChange };
};

const startDrag = (thumb: HTMLElement, clientX = 0, clientY = 0) =>
  fireEvent.mouseDown(thumb, { clientX, clientY });
const moveTo = (clientX: number, clientY: number) =>
  fireEvent.mouseMove(document, { clientX, clientY });
const drop = (clientX: number, clientY: number) =>
  fireEvent.mouseUp(document, { clientX, clientY });

describe('<Scrollbar /> dragging (react-draggable)', () => {
  it('renders a thumb of sizeRatio * containerSize once the container is measured', () => {
    const { thumb } = renderScrollbar();
    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveStyleRule('height', `${THUMB_SIZE}px`);
  });

  it('applies the positionRatio prop as a translate transform on the thumb (vertical)', () => {
    const { thumb } = renderScrollbar({ positionRatio: 0.5 });
    expect(thumb.style.transform).toBe(
      `translate(0px,${TRACK_LENGTH * 0.5}px)`,
    );
  });

  it('applies the positionRatio prop as a translate transform on the thumb (horizontal)', () => {
    const { thumb } = renderScrollbar({ horizontal: true, positionRatio: 0.2 });
    expect(thumb.style.transform).toBe(
      `translate(${TRACK_LENGTH * 0.2}px,0px)`,
    );
  });

  it('calls onPositionRatioChange with newPosition / (containerSize - thumbSize) while dragging vertically', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar();

    startDrag(thumb, 0, 0);
    moveTo(0, 30);

    expect(onPositionRatioChange).toHaveBeenLastCalledWith(30 / TRACK_LENGTH);
    expect(thumb.style.transform).toBe('translate(0px,30px)');

    moveTo(0, 60);
    expect(onPositionRatioChange).toHaveBeenLastCalledWith(60 / TRACK_LENGTH);

    drop(0, 60);
  });

  it('calls onPositionRatioChange with newPosition / (containerSize - thumbSize) while dragging horizontally', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar({
      horizontal: true,
    });

    startDrag(thumb, 0, 0);
    moveTo(45, 0);

    expect(onPositionRatioChange).toHaveBeenLastCalledWith(45 / TRACK_LENGTH);
    expect(thumb.style.transform).toBe('translate(45px,0px)');

    drop(45, 0);
  });

  it('measures the drag relative to the starting thumb position', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar({
      positionRatio: 0.2,
    });

    startDrag(thumb, 0, 100);
    moveTo(0, 120);

    expect(onPositionRatioChange).toHaveBeenLastCalledWith(
      (30 + 20) / TRACK_LENGTH,
    );
    drop(0, 120);
  });

  it('ignores mouse movement on the cross axis of a vertical scrollbar', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar({
      positionRatio: 0.2,
    });

    startDrag(thumb, 0, 0);
    moveTo(80, 0);

    expect(onPositionRatioChange).toHaveBeenLastCalledWith(30 / TRACK_LENGTH);
    expect(thumb.style.transform).toBe('translate(0px,30px)');

    drop(80, 0);
  });

  it('ignores mouse movement on the cross axis of a horizontal scrollbar', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar({
      horizontal: true,
    });

    startDrag(thumb, 0, 0);
    moveTo(0, 80);

    expect(onPositionRatioChange).toHaveBeenLastCalledWith(0);
    expect(thumb.style.transform).toBe('translate(0px,0px)');

    drop(0, 80);
  });

  it('keeps the thumb inside the track (bounds="parent"), so the ratio never leaves 0..1', () => {
    const { thumb, onPositionRatioChange } = renderScrollbar();

    startDrag(thumb, 0, 0);
    moveTo(0, 1000);
    expect(onPositionRatioChange).toHaveBeenLastCalledWith(1);
    expect(thumb.style.transform).toBe(`translate(0px,${TRACK_LENGTH}px)`);

    moveTo(0, -1000);
    expect(onPositionRatioChange).toHaveBeenLastCalledWith(0);
    expect(thumb.style.transform).toBe('translate(0px,0px)');

    drop(0, -1000);
  });

  it('highlights the thumb while it is being dragged and restores its colour on drop', () => {
    const { thumb } = renderScrollbar();

    expect(thumb).toHaveStyleRule('background', colors.solitude);

    startDrag(thumb, 0, 0);
    expect(thumb).toHaveStyleRule('background', colors.periwinkleGray);

    moveTo(0, 20);
    expect(thumb).toHaveStyleRule('background', colors.periwinkleGray);

    drop(0, 20);
    expect(thumb).toHaveStyleRule('background', colors.solitude);
  });

  it('returns the thumb to the controlled positionRatio after drop when the parent does not update it', () => {
    const { thumb } = renderScrollbar({ positionRatio: 0 });

    startDrag(thumb, 0, 0);
    moveTo(0, 40);
    expect(thumb.style.transform).toBe('translate(0px,40px)');
    drop(0, 40);

    expect(thumb.style.transform).toBe('translate(0px,0px)');
  });
});
