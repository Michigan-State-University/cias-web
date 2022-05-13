const getPause = (type) => {
  switch (type) {
    case 'standStill':
      return 0;
    case 'wave':
      return 100;
    case 'uncertain':
      return 500;
    case 'pointLeft':
      return 500;
    case 'pointRight':
      return 500;
    case 'pointDown':
      return 500;
    case 'pointUp':
      return 500;
    case 'congratulate':
      return 500;
    case 'listen':
      return 1000;
    case 'suggest':
      return 500;
    case 'think':
      return 200;
    case 'write':
      return 200;
    case 'explain':
      return 500;
    case 'browsUp':
      return 500;
    case 'sad':
      return 500;
    case 'hearLeftEar':
      return 0;
    case 'hearRightEar':
      return 0;
    case 'wearSunglasses':
      return 0;
    case 'lookDown':
      return 500;
    case 'lookDownAndBlink':
      return 500;
    case 'glanceUp':
      return 200;
    case 'glanceDown':
      return 200;
    case 'glanceLeft':
      return 200;
    case 'glanceRight':
      return 200;
    default:
      return 0;
  }
};

export default getPause;
