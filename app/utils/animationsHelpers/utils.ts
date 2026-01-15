import clamp from 'lodash/clamp';

import { elements } from 'theme';

import { CharacterType } from 'models/Character';

import { ScaleFactor2D } from 'global/types/math';

export const importAnimation = async (
  animationName: string,
  character: CharacterType = CharacterType.PEEDY,
) => import(`assets/animations/${character}/${animationName}.json`);

export const getScaleFactor = (
  animationContainer: Pick<HTMLElement, 'clientWidth' | 'clientHeight'>,
): ScaleFactor2D => {
  const { clientWidth, clientHeight } = animationContainer;
  const containerWidthWithBorders = clientWidth + 2;
  const containerHeightWithBorders = clientHeight + 2;
  const scaleX = Math.min(
    1,
    containerWidthWithBorders / elements.draggableContainerSize,
  );
  const scaleY = Math.min(
    1,
    containerHeightWithBorders / elements.draggableContainerSize,
  );
  return { x: scaleX, y: scaleY };
};

export const clampPosition = (value: number) =>
  clamp(value, 0, Number.MAX_SAFE_INTEGER);
