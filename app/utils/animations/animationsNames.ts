import keys from 'lodash/keys';
import { CharacterType } from 'models/Character';
import {
  BodyAnimation,
  BodyAutoRestAnimation,
  BodyReverseAnimation,
  HeadAnimation,
  HeadAutoRestAnimation,
  HeadReverseAnimation,
  MoveAnimation,
  NarratorAnimation,
  NarratorBlockTypes,
  RestAnimation,
  SpeechAnimation,
  SpeechAnimationFile,
} from 'models/Narrator';

import { TSpeechAnimation } from './types';

const peedyAutoRestBodyAnimations = [
  BodyAutoRestAnimation.STAND_STILL,
  BodyAutoRestAnimation.GREET,
  BodyAutoRestAnimation.CONFUSED,
  BodyAutoRestAnimation.READING,
  BodyAutoRestAnimation.DO_MAGIC,
  BodyAutoRestAnimation.GET_ATTENTION,
  BodyAutoRestAnimation.SEARCH,
  BodyAutoRestAnimation.SURPRISED,
  BodyAutoRestAnimation.FLY_IN,
  BodyAutoRestAnimation.FLY_OUT,
  BodyAutoRestAnimation.PROCESS,
  BodyAutoRestAnimation.IDLE,
  BodyAutoRestAnimation.TURN_PAGE,
  BodyAutoRestAnimation.OPEN_BOOK,
  BodyAutoRestAnimation.CLOSE_BOOK,
  BodyAutoRestAnimation.ANNOUNCE,
];

const fridaAutoResetBodyAnimations = [
  BodyAutoRestAnimation.STAND_STILL,
  BodyAutoRestAnimation.CONFUSED,
  BodyAutoRestAnimation.DO_MAGIC,
  BodyAutoRestAnimation.ANNOUNCE,
];

const characterToAutoRestBodyAnimationsMap: Record<
  CharacterType,
  BodyAutoRestAnimation[]
> = {
  [CharacterType.PEEDY]: peedyAutoRestBodyAnimations,
  [CharacterType.FRIDA]: fridaAutoResetBodyAnimations,
};

const peedyReverseBodyAnimations = [
  BodyReverseAnimation.UNCERTAIN,
  BodyReverseAnimation.WAVE,
  BodyReverseAnimation.POINT_LEFT,
  BodyReverseAnimation.POINT_RIGHT,
  BodyReverseAnimation.POINT_DOWN,
  BodyReverseAnimation.POINT_UP,
  BodyReverseAnimation.EXPLAIN,
  BodyReverseAnimation.CONGRATULATE,
  BodyReverseAnimation.LISTEN,
  BodyReverseAnimation.SUGGEST,
  BodyReverseAnimation.THINK,
];

const fridaReverseBodyAnimations = [
  BodyReverseAnimation.UNCERTAIN,
  BodyReverseAnimation.WAVE,
  BodyReverseAnimation.CONGRATULATE,
];

const characterToReverseBodyAnimationsMap: Record<
  CharacterType,
  BodyReverseAnimation[]
> = {
  [CharacterType.PEEDY]: peedyReverseBodyAnimations,
  [CharacterType.FRIDA]: fridaReverseBodyAnimations,
};

const peedyAutoRestHeadAnimations = [
  HeadAutoRestAnimation.BLINK,
  HeadAutoRestAnimation.ACKNOWLEDGE,
  HeadAutoRestAnimation.DECLINE,
  HeadAutoRestAnimation.PLEASED,
  HeadAutoRestAnimation.HEAR_BOTH_EARS,
  HeadAutoRestAnimation.YAWN,
  HeadAutoRestAnimation.EAT_CRACKER,
];

const fridaAutoRestHeadAnimations = [
  HeadAutoRestAnimation.BLINK,
  HeadAutoRestAnimation.ACKNOWLEDGE,
];
const characterToAutoRestHeadAnimationsMap: Record<
  CharacterType,
  HeadAutoRestAnimation[]
> = {
  [CharacterType.PEEDY]: peedyAutoRestHeadAnimations,
  [CharacterType.FRIDA]: fridaAutoRestHeadAnimations,
};

const peedyReverseHeadAnimations = [
  HeadReverseAnimation.BROWS_UP,
  HeadReverseAnimation.SAD,
  HeadReverseAnimation.HEAR_LEFT_EAR,
  HeadReverseAnimation.HEAR_RIGHT_EAR,
  HeadReverseAnimation.WEAR_SUNGLASSES,
  HeadReverseAnimation.LOOK_DOWN,
  HeadReverseAnimation.LOOK_DOWN_AND_BLINK,
  HeadReverseAnimation.GLANCE_UP,
  HeadReverseAnimation.GLANCE_DOWN,
  HeadReverseAnimation.GLANCE_LEFT,
  HeadReverseAnimation.GLANCE_RIGHT,
];

const fridaReverseHeadAnimations: HeadReverseAnimation[] = [];

const characterToReverseHeadAnimationsMap: Record<
  CharacterType,
  HeadReverseAnimation[]
> = {
  [CharacterType.PEEDY]: peedyReverseHeadAnimations,
  [CharacterType.FRIDA]: fridaReverseHeadAnimations,
};

const speechAnimationsMapper: Record<SpeechAnimation, TSpeechAnimation> = {
  [SpeechAnimation.REST]: {
    animations: { speech: SpeechAnimationFile.REST_SPEECH },
  },
  [SpeechAnimation.EXPLAIN]: {
    animations: {
      start: SpeechAnimationFile.EXPLAIN,
      speech: SpeechAnimationFile.EXPLAIN_SPEECH,
      end: SpeechAnimationFile.EXPLAIN,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.POINT_UP]: {
    animations: {
      start: SpeechAnimationFile.POINT_UP,
      speech: SpeechAnimationFile.POINT_UP_SPEECH,
      end: SpeechAnimationFile.POINT_UP,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.POINT_DOWN]: {
    animations: {
      start: SpeechAnimationFile.POINT_DOWN,
      speech: SpeechAnimationFile.POINT_DOWN_SPEECH,
      end: SpeechAnimationFile.POINT_DOWN,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.POINT_LEFT]: {
    animations: {
      start: SpeechAnimationFile.POINT_LEFT,
      speech: SpeechAnimationFile.POINT_LEFT_SPEECH,
      end: SpeechAnimationFile.POINT_LEFT,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.POINT_RIGHT]: {
    animations: {
      start: SpeechAnimationFile.POINT_RIGHT,
      speech: SpeechAnimationFile.POINT_RIGHT_SPEECH,
      end: SpeechAnimationFile.POINT_RIGHT,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.READ]: {
    animations: {
      start: SpeechAnimationFile.READ_START,
      speech: SpeechAnimationFile.READ_SPEECH,
      end: SpeechAnimationFile.READ_END,
    },
  },
  [SpeechAnimation.WRITE]: {
    animations: {
      start: SpeechAnimationFile.WRITE,
      speech: SpeechAnimationFile.WRITE_SPEECH,
      end: SpeechAnimationFile.WRITE,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.LISTEN]: {
    animations: {
      start: SpeechAnimationFile.LISTEN,
      speech: SpeechAnimationFile.LISTEN_SPEECH,
      end: SpeechAnimationFile.LISTEN,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.ANNOUNCE]: {
    animations: {
      start: SpeechAnimationFile.ANNOUNCE_START,
      speech: SpeechAnimationFile.ANNOUNCE_SPEECH,
      end: SpeechAnimationFile.ANNOUNCE_END,
    },
  },
  [SpeechAnimation.SEARCH]: {
    animations: {
      start: SpeechAnimationFile.SEARCH_REVERSABLE,
      speech: SpeechAnimationFile.SEARCH_SPEECH,
      end: SpeechAnimationFile.SEARCH_REVERSABLE,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.SUGGEST]: {
    animations: {
      start: SpeechAnimationFile.SUGGEST,
      speech: SpeechAnimationFile.SUGGEST_SPEECH,
      end: SpeechAnimationFile.SUGGEST,
    },
    isEndReversed: true,
  },
  [SpeechAnimation.THINK]: {
    animations: {
      start: SpeechAnimationFile.THINK,
      speech: SpeechAnimationFile.THINK_SPEECH,
      end: SpeechAnimationFile.THINK,
    },
    isEndReversed: true,
  },
};

const fridaSpeechAnimations = [SpeechAnimation.REST];

const characterToSpeechAnimationsMap: Record<CharacterType, SpeechAnimation[]> =
  {
    [CharacterType.PEEDY]: keys(speechAnimationsMapper) as SpeechAnimation[],
    [CharacterType.FRIDA]: fridaSpeechAnimations,
  };

const moveAnimations = [MoveAnimation.MOVE_LEFT, MoveAnimation.MOVE_RIGHT];
const characterToMoveAnimationsMap: Record<CharacterType, MoveAnimation[]> = {
  [CharacterType.PEEDY]: moveAnimations,
  [CharacterType.FRIDA]: moveAnimations,
};

const getBodyAnimations = (character: CharacterType): BodyAnimation[] => [
  ...characterToAutoRestBodyAnimationsMap[character],
  ...characterToReverseBodyAnimationsMap[character],
];

const getHeadAnimations = (character: CharacterType): HeadAnimation[] => [
  ...characterToAutoRestHeadAnimationsMap[character],
  ...characterToReverseHeadAnimationsMap[character],
];

const getAutoRestAnimations = (character: CharacterType): RestAnimation[] => [
  ...characterToAutoRestBodyAnimationsMap[character],
  ...characterToAutoRestHeadAnimationsMap[character],
];

const getAvailableBlockAnimations = (
  character: CharacterType,
  block: NarratorBlockTypes,
): NarratorAnimation[] => {
  if ([NarratorBlockTypes.FEEDBACK, NarratorBlockTypes.PAUSE].includes(block))
    return [];
  if (
    [
      NarratorBlockTypes.SPEECH,
      NarratorBlockTypes.REFLECTION,
      NarratorBlockTypes.REFLECTION_FORMULA,
      NarratorBlockTypes.READ_QUESTION,
    ].includes(block)
  )
    return characterToSpeechAnimationsMap[character];
  if (NarratorBlockTypes.BODY_ANIMATION === block)
    return getBodyAnimations(character);
  if (NarratorBlockTypes.HEAD_ANIMATION === block)
    return getHeadAnimations(character);
  return [];
};

const getDefaultBlockAnimation = (
  character: CharacterType,
  block: NarratorBlockTypes,
): NarratorAnimation => {
  if (
    [
      NarratorBlockTypes.SPEECH,
      NarratorBlockTypes.REFLECTION,
      NarratorBlockTypes.REFLECTION_FORMULA,
      NarratorBlockTypes.READ_QUESTION,
    ].includes(block)
  )
    return SpeechAnimation.REST;
  if (NarratorBlockTypes.BODY_ANIMATION === block)
    return BodyAutoRestAnimation.STAND_STILL;
  if (NarratorBlockTypes.HEAD_ANIMATION === block)
    return getHeadAnimations(character)[0];
  return getAvailableBlockAnimations(character, block)[0];
};

export {
  getAutoRestAnimations,
  getBodyAnimations,
  getHeadAnimations,
  characterToMoveAnimationsMap,
  speechAnimationsMapper,
  characterToSpeechAnimationsMap,
  getAvailableBlockAnimations,
  getDefaultBlockAnimation,
};
