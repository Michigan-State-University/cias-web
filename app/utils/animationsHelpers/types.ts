import {
  IReflection,
  IReflectionFormula,
  MoveAnimation,
  NarratorAnimation,
  NarratorBlockTypes,
  SpeechAnimation,
} from 'models/Narrator';
import { ESpeechPhase } from 'utils/animations';

export interface ILoadedAnimationData {
  type?: NarratorBlockTypes;
  name: NarratorAnimation;
  animationData: JSON;
  pause: number;
  isAutoRest: boolean;
}

export interface ILoadedAudioData {
  name: SpeechAnimation;
  animationData: ISpeechAnimationData;
  isEndReversed: boolean;
}

export interface ILoadedMoveData {
  name: MoveAnimation;
  animationData: JSON;
}

export interface ISpeechAnimationData {
  [ESpeechPhase.START]?: JSON;
  [ESpeechPhase.SPEECH]: JSON;
  [ESpeechPhase.END]?: JSON;
}

interface IBaseSpeechData extends ILoadedAudioData {
  currentAnimation: ESpeechPhase;
  currentAudioIndex: number;
  isLoop: boolean;
  audio_urls: string[];
  audios_base64: string[];
  sha256: string[];
  text: string[];
}

export interface ISpeechData extends IBaseSpeechData {
  type: NarratorBlockTypes.SPEECH | NarratorBlockTypes.READ_QUESTION;
}

export interface IReflectionData extends IBaseSpeechData {
  type: NarratorBlockTypes.REFLECTION | NarratorBlockTypes.REFLECTION_FORMULA;
  initialAnimation: ESpeechPhase;
  currentReflectionIndex: number;
  reflections: IReflection[] | IReflectionFormula[];
}
