const autoRestAnimations = [
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

const reverseAnimations = [
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

const speechAnimations = {
  rest: { speech: 'restSpeech' },
  explain: { speech: 'explainSpeech' },
};

const moveAnimations = ['moveLeft', 'moveRight'];

const bodyAnimations = [...autoRestAnimations, ...reverseAnimations];

export { autoRestAnimations, bodyAnimations, moveAnimations, speechAnimations };
