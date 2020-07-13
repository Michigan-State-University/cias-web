const getPause = type => {
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
    default:
      return 0;
  }
};

export default getPause;
