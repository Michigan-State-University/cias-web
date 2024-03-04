import { CamelToSnake } from 'global/types/camelToSnake';

import {
  BodyAnimation,
  BodyAutoRestAnimation,
  HeadAnimation,
  NarratorAnimation,
  SpeechAnimation,
} from './Animation';
import { EFeedbackAction } from './FeedbackActions';
import { NarratorBlockTypes } from './NarratorBlockTypes';
import { NarratorSettings } from './NarratorSettings';

export interface Position {
  x: number;
  y: number;
}

export interface IAudioData {
  text?: Nullable<string[]>;
  sha256: string[];
  audio_urls: string[];
  audios_base64: string[];
}

export interface IReflection extends IAudioData {
  payload: string;
  variable: string;
  value: string;
}

export interface IReflectionFormula extends IAudioData {
  match: string;
}

export interface IBaseBlock {
  type: NarratorBlockTypes;
  animation: NarratorAnimation;
  endPosition: Position;
}

export interface IBaseAudioBlock extends IBaseBlock, IAudioData {
  action: EFeedbackAction;
  animation: SpeechAnimation;
  originalText?: Nullable<string[]>;
}

export interface IReflectionBlock extends IBaseAudioBlock {
  type: NarratorBlockTypes.REFLECTION;
  question_id: string;
  session_id: Nullable<string>;
  question_group_id: Nullable<string>;
  reflections: IReflection[];
  target_value: IReflection[];
}

export interface IReflectionFormulaBlock extends IBaseAudioBlock {
  type: NarratorBlockTypes.REFLECTION_FORMULA;
  payload: string;
  reflections: IReflectionFormula[];
  target_value: IReflectionFormula;
}

export interface ISpeechBlock extends IBaseAudioBlock {
  type: NarratorBlockTypes.SPEECH;
  endPosition: Position;
}

export interface IReadQuestionBlock extends IBaseAudioBlock {
  type: NarratorBlockTypes.READ_QUESTION;
  action: EFeedbackAction.NO_ACTION;
  endPosition: Position;
}

export interface IBodyAnimationBlock extends IBaseBlock {
  type: NarratorBlockTypes.BODY_ANIMATION;
  animation: BodyAnimation;
}

export interface IHeadAnimationBlock extends IBaseBlock {
  type: NarratorBlockTypes.HEAD_ANIMATION;
  animation: HeadAnimation;
}

export interface IPauseBlock extends IBaseBlock {
  type: NarratorBlockTypes.PAUSE;
  animation: BodyAutoRestAnimation.STAND_STILL;
  pauseDuration: number;
}

export interface IFeedbackBlock extends IBaseBlock {
  type: NarratorBlockTypes.FEEDBACK;
  animation: BodyAutoRestAnimation.STAND_STILL;
  action: EFeedbackAction;
}

export type NarratorBlock =
  | IReflectionBlock
  | IReflectionFormulaBlock
  | IReadQuestionBlock
  | ISpeechBlock
  | IBodyAnimationBlock
  | IHeadAnimationBlock
  | IPauseBlock
  | IFeedbackBlock;

export interface Narrator {
  blocks: NarratorBlock[];
  settings: NarratorSettings;
}

export type NarratorDTO = CamelToSnake<Narrator>;
