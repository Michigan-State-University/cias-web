export const getPause = type => {
  switch (type) {
    case 'wave':
      return 500;
    case 'bow':
      return 500;
    case 'shrug':
      return 500;
    default:
      return 500;
  }
};

export default { getPause };
