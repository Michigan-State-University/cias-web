import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { ReactNode } from 'react';

export type TSelector =
  | null
  | string
  | {
      <T>(item: T): string;
    };

export type TDragHandleProps =
  | (SyntheticListenerMap & DraggableAttributes)
  | {};

export type TChildren<T> = {
  ({
    item,
    dragHandleProps,
    isDragging,
    isOverlay,
    index,
  }: {
    item: T;
    dragHandleProps: TDragHandleProps;
    isDragging: boolean;
    isOverlay: boolean;
    index: number;
  }): ReactNode;
};
