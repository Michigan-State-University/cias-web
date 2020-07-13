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

const bodyAnimations = [...autoRestAnimations, ...reverseAnimations];

export { autoRestAnimations, bodyAnimations };
