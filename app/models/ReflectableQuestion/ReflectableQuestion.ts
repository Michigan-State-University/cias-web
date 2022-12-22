import {
  GridQuestion,
  MultipleQuestion,
  SingleQuestion,
} from 'models/Question';

import { CamelToSnake } from 'global/types/camelToSnake';

type AttributesToPick = 'id' | 'questionGroupId' | 'type' | 'subtitle' | 'body';

export type ReflectableSingleQuestion = Pick<SingleQuestion, AttributesToPick>;

export type ReflectableMultipleQuestion = Pick<
  MultipleQuestion,
  AttributesToPick
>;

export type ReflectableGridQuestion = Pick<GridQuestion, AttributesToPick>;

export type ReflectableQuestion = (
  | ReflectableSingleQuestion
  | ReflectableMultipleQuestion
  | ReflectableGridQuestion
) & { sessionId: string };

export type ReflectableQuestionDTO = CamelToSnake<ReflectableQuestion>;
