const autoRestBodyAnimations = [
  'standStill',
  'greet',
  'confused',
  'reading',
  'doMagic',
  'getAttention',
  'search',
  'suprised',
  'flyIn',
  'flyOut',
  'process',
  'idle',
  'turnPage',
  'openBook',
  'closeBook',
  'announce',
];

const reverseBodyAnimations = [
  'uncertain',
  'wave',
  'pointLeft',
  'pointRight',
  'pointDown',
  'pointUp',
  'explain',
  'congratulate',
  'listen',
  'suggest',
  'think',
  'write',
];

const autoRestHeadAnimations = [
  'blink',
  'acknowledge',
  'decline',
  'pleased',
  'hearBothEars',
  'yawn',
  'eatCracker',
];
const reverseHeadAnimations = [
  'browsUp',
  'sad',
  'hearLeftEar',
  'hearRightEar',
  'wearSunglasses',
  'lookDown',
  'lookDownAndBlink',
  'glanceUp',
  'glanceDown',
  'glanceLeft',
  'glanceRight',
];

const speechAnimations = {
  rest: { animations: { speech: 'restSpeech' } },
  explain: {
    animations: {
      start: 'explain',
      speech: 'explainSpeech',
      end: 'explain',
    },
    isEndReversed: true,
  },
  pointUp: {
    animations: {
      start: 'pointUp',
      speech: 'pointUpSpeech',
      end: 'pointUp',
    },
    isEndReversed: true,
  },
  pointDown: {
    animations: {
      start: 'pointDown',
      speech: 'pointDownSpeech',
      end: 'pointDown',
    },
    isEndReversed: true,
  },
  pointLeft: {
    animations: {
      start: 'pointLeft',
      speech: 'pointLeftSpeech',
      end: 'pointLeft',
    },
    isEndReversed: true,
  },
  pointRight: {
    animations: {
      start: 'pointRight',
      speech: 'pointRightSpeech',
      end: 'pointRight',
    },
    isEndReversed: true,
  },
  read: {
    animations: {
      start: 'readStart',
      speech: 'readSpeech',
      end: 'readEnd',
    },
  },
  write: {
    animations: {
      start: 'write',
      speech: 'writeSpeech',
      end: 'write',
    },
    isEndReversed: true,
  },
  listen: {
    animations: {
      start: 'listen',
      speech: 'listenSpeech',
      end: 'listen',
    },
    isEndReversed: true,
  },
  announce: {
    animations: {
      start: 'announceStart',
      speech: 'announceSpeech',
      end: 'announceEnd',
    },
  },
  search: {
    animations: {
      start: 'searchReversable',
      speech: 'searchSpeech',
      end: 'searchReversable',
    },
    isEndReversed: true,
  },
  suggest: {
    animations: {
      start: 'suggest',
      speech: 'suggestSpeech',
      end: 'suggest',
    },
    isEndReversed: true,
  },
  think: {
    animations: {
      start: 'think',
      speech: 'thinkSpeech',
      end: 'think',
    },
    isEndReversed: true,
  },
};

const moveAnimations = ['moveLeft', 'moveRight'];

const bodyAnimations = [...autoRestBodyAnimations, ...reverseBodyAnimations];

const headAnimations = [...autoRestHeadAnimations, ...reverseHeadAnimations];

const autoRestAnimations = [
  ...autoRestBodyAnimations,
  ...autoRestHeadAnimations,
];

export {
  autoRestAnimations,
  bodyAnimations,
  moveAnimations,
  headAnimations,
  speechAnimations,
};
