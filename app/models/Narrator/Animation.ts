export enum BodyAutoRestAnimation {
  STAND_STILL = 'standStill',
  GREET = 'greet',
  CONFUSED = 'confused',
  READING = 'reading',
  DO_MAGIC = 'doMagic',
  GET_ATTENTION = 'getAttention',
  SEARCH = 'search',
  SURPRISED = 'surprised',
  FLY_IN = 'flyIn',
  FLY_OUT = 'flyOut',
  PROCESS = 'process',
  IDLE = 'idle',
  TURN_PAGE = 'turnPage',
  OPEN_BOOK = 'openBook',
  CLOSE_BOOK = 'closeBook',
  ANNOUNCE = 'announce',
  POINT_LEFT_UP = 'pointLeftUp',
  POINT_RIGHT_UP = 'pointRightUp',
  REST_SHOULDER_RUBBING = 'restShoulderRubbing',
  REST_STRETCHING = 'restStretching',
  REST_WEIGHT_SHIFT = 'restWeightShift',
  THINK = 'think',
  UNCERTAIN = 'uncertain',
  WAVE = 'wave',
}
export enum BodyReverseAnimation {
  UNCERTAIN = 'uncertain',
  WAVE = 'wave',
  POINT_LEFT = 'pointLeft',
  POINT_RIGHT = 'pointRight',
  POINT_DOWN = 'pointDown',
  POINT_UP = 'pointUp',
  EXPLAIN = 'explain',
  CONGRATULATE = 'congratulate',
  LISTEN = 'listen',
  SUGGEST = 'suggest',
  THINK = 'think',
  WRITE = 'write',
}

export type BodyAnimation = BodyAutoRestAnimation | BodyReverseAnimation;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export const BodyAnimation = {
  ...BodyAutoRestAnimation,
  ...BodyReverseAnimation,
};

export enum HeadAutoRestAnimation {
  BLINK = 'blink',
  ACKNOWLEDGE = 'acknowledge',
  ACKNOWLEDGE_THOUGHTFUL = 'acknowledgeThoughtful',
  DECLINE = 'decline',
  DECLINE_ANNOYED = 'declineAnnoyed',
  DECLINE_THOUGHTFUL = 'declineThoughtful',
  PLEASED = 'pleased',
  HEAR_BOTH_EARS = 'hearBothEars',
  YAWN = 'yawn',
  EAT_CRACKER = 'eatCracker',
}
export enum HeadReverseAnimation {
  BROWS_UP = 'browsUp',
  SAD = 'sad',
  HEAR_LEFT_EAR = 'hearLeftEar',
  HEAR_RIGHT_EAR = 'hearRightEar',
  WEAR_SUNGLASSES = 'wearSunglasses',
  LOOK_DOWN = 'lookDown',
  LOOK_DOWN_AND_BLINK = 'lookDownAndBlink',
  GLANCE_UP = 'glanceUp',
  GLANCE_DOWN = 'glanceDown',
  GLANCE_LEFT = 'glanceLeft',
  GLANCE_RIGHT = 'glanceRight',
}

export type HeadAnimation = HeadAutoRestAnimation | HeadReverseAnimation;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export const HeadAnimation = {
  ...HeadAutoRestAnimation,
  ...HeadReverseAnimation,
};

export type RestAnimation = BodyAutoRestAnimation | HeadAutoRestAnimation;

export enum SpeechAnimation {
  REST = 'rest',
  EXPLAIN = 'explain',
  POINT_UP = 'pointUp',
  POINT_DOWN = 'pointDown',
  POINT_LEFT = 'pointLeft',
  POINT_RIGHT = 'pointRight',
  READ = 'read',
  WRITE = 'write',
  LISTEN = 'listen',
  ANNOUNCE = 'announce',
  SEARCH = 'search',
  SUGGEST = 'suggest',
  THINK = 'think',
}

export enum SpeechAnimationFile {
  REST_SPEECH = 'restSpeech',
  EXPLAIN = 'explain',
  EXPLAIN_SPEECH = 'explainSpeech',
  POINT_UP = 'pointUp',
  POINT_UP_SPEECH = 'pointUpSpeech',
  POINT_DOWN = 'pointDown',
  POINT_DOWN_SPEECH = 'pointDownSpeech',
  POINT_LEFT = 'pointLeft',
  POINT_LEFT_SPEECH = 'pointLeftSpeech',
  POINT_RIGHT = 'pointRight',
  POINT_RIGHT_SPEECH = 'pointRightSpeech',
  READ_START = 'readStart',
  READ_SPEECH = 'readSpeech',
  READ_END = 'readEnd',
  WRITE = 'write',
  WRITE_SPEECH = 'writeSpeech',
  LISTEN = 'listen',
  LISTEN_SPEECH = 'listenSpeech',
  ANNOUNCE_START = 'announceStart',
  ANNOUNCE_SPEECH = 'announceSpeech',
  ANNOUNCE_END = 'announceEnd',
  SEARCH_REVERSABLE = 'searchReversable',
  SEARCH_SPEECH = 'searchSpeech',
  SUGGEST = 'suggest',
  SUGGEST_SPEECH = 'suggestSpeech',
  THINK = 'think',
  THINK_SPEECH = 'thinkSpeech',
}

export enum MoveAnimation {
  MOVE_LEFT = 'moveLeft',
  MOVE_RIGHT = 'moveRight',
}

export type NarratorAnimation =
  | BodyAnimation
  | HeadAnimation
  | SpeechAnimation
  | MoveAnimation;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export const NarratorAnimation = {
  ...BodyAnimation,
  ...HeadAnimation,
  ...SpeechAnimation,
  ...MoveAnimation,
};
