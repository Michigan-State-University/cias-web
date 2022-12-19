import { elements } from 'theme';

import { NarratorBlock } from 'models/Narrator';
import { CharacterSize } from 'models/Character';

const { draggableContainerSize } = elements;

export const getBlocksFittingDraggableContainer = (
  oldCharacterBlocks: NarratorBlock[],
  { width }: CharacterSize,
): NarratorBlock[] =>
  oldCharacterBlocks.map(({ endPosition: { y, x }, ...props }) => ({
    ...props,
    endPosition: {
      y,
      x:
        x + width > draggableContainerSize ? draggableContainerSize - width : x,
    },
  }));
